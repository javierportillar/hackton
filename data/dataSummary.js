import { ica } from "./puntos.js";

export async function loadSummaryPmData(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Error al cargar el archivo: ${response.statusText}`);
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error al leer el archivo JSON:", error);
  }
}

export function filterPmByNode(data, nodeName) {
  return data.filter((item) => item.Nodo.trim() === nodeName.trim());
}

export async function sumaryPmData() {
  try {
    const jsonData = await loadSummaryPmData("/data/pm_data.json");
    if (jsonData) {
      const nodes = [...new Set(jsonData.map((item) => item.Nodo.trim()))]; // Obtener nodos únicos
      let totalPm10 = 0;
      let totalPm25 = 0;
      let count = 0;

      nodes.forEach((node) => {
        const filteredByNode = filterPmByNode(jsonData, node);
        if (filteredByNode.length > 0) {
          const lastRecord = filteredByNode[filteredByNode.length - 1];
          totalPm10 += lastRecord["massPM10_0Avg"];
          totalPm25 += lastRecord["massPM2_5Avg"];
          count++;
        }
      });

      if (count > 0) {
        const averagePm10 = totalPm10 / count;
        const averagePm25 = totalPm25 / count;
        // Determinar la categoría de calidad del aire basada en PM2.5
        let categoriaCalidad = "Desconocida";
        let categoriaSug = "";

        for (const rango of ica) {
          if (
            averagePm25 >= rango["PM2"][0] &&
            averagePm25 <= rango["PM2"][1]
          ) {
            categoriaCalidad = rango.Categoria;
            categoriaSug = rango.sug;
            break;
          }
        }

        const calidadAireElement = document.getElementById("calidadAire");
        const pmValue = document.getElementById("pmValue");
        const pmSug = document.getElementById("pmSug");

        calidadAireElement.textContent = `${categoriaCalidad}`;
        pmValue.textContent = `${averagePm25.toFixed(2)} μg/m3`;
        pmSug.textContent = categoriaSug;
      } else {
        console.log("No hay registros disponibles para calcular el promedio.");
      }
    } else {
      console.log("No se pudo cargar el archivo JSON.");
    }
  } catch (error) {
    console.error("Error al leer el archivo JSON:", error);
  }
}
