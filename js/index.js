import { nodes } from "./nodes.js";
import { sumaryPmData } from "../data/dataSummary.js";
import {
  loadWindData,
  filterWindByNode,
  loadNoiseData,
  filterNoiseByNode,
  loadPmData,
  filterPmByNode,
  loadSurthData,
  filterSurthByNode,
} from "../data/datosTratados.js";

const nodeButton = document.querySelectorAll("#nodesSelect");

nodeButton.forEach((selectElement) => {
  // Crear y agregar la opción por defecto
  const defaultOption = document.createElement("option");
  defaultOption.text = "Nodo a seleccionar";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  selectElement.appendChild(defaultOption);

  // Agregar las demás opciones
  nodes.forEach((optionData) => {
    const option = document.createElement("option");
    option.value = optionData.name;
    option.text = `${optionData.name} - ${optionData.place}`;
    selectElement.appendChild(option);
  });

  // Agregar evento change para filtrar datos por nodo
  selectElement.addEventListener("change", (event) => {
    const selectedNode = event.target.value;

    loadWindData("/data/wind_data.json").then((jsonData) => {
      if (jsonData) {
        const filteredByNode = filterWindByNode(jsonData, selectedNode);

        if (filteredByNode.length > 0) {
          const lastRecord = filteredByNode[filteredByNode.length - 1];
          console.log("Último registro del nodo seleccionado:", lastRecord);
        } else {
          console.log("No hay registros para el nodo seleccionado.");
        }
      } else {
        console.log("No se pudo cargar el archivo JSON.");
      }
    });

    loadNoiseData("/data/noise_data.json").then((jsonData) => {
      if (jsonData) {
        const filteredByNode = filterNoiseByNode(jsonData, selectedNode);

        if (filteredByNode.length > 0) {
          const lastRecord = filteredByNode[filteredByNode.length - 1];
          console.log("Último registro del nodo seleccionado:", lastRecord);
        } else {
          console.log("No hay registros para el nodo seleccionado.");
        }
      } else {
        console.log("No se pudo cargar el archivo JSON.");
      }
    });

    loadPmData("/data/pm_data.json").then((jsonData) => {
      if (jsonData) {
        const filteredByNode = filterPmByNode(jsonData, selectedNode);

        if (filteredByNode.length > 0) {
          const lastRecord = filteredByNode[filteredByNode.length - 1];
          console.log("Último registro del nodo seleccionado:", lastRecord);
        } else {
          console.log("No hay registros para el nodo seleccionado.");
        }
      } else {
        console.log("No se pudo cargar el archivo JSON.");
      }
    });

    loadSurthData("/data/surth_data.json").then((jsonData) => {
      if (jsonData) {
        const filteredByNode = filterSurthByNode(jsonData, selectedNode);

        if (filteredByNode.length > 0) {
          const lastRecord = filteredByNode[filteredByNode.length - 1];
          console.log("Último registro del nodo seleccionado:", lastRecord);
        } else {
          console.log("No hay registros para el nodo seleccionado.");
        }
      } else {
        console.log("No se pudo cargar el archivo JSON.");
      }
    });
  });

  document
    .getElementById("nodesSelect")
    .addEventListener("change", async (event) => {
      const selectedNode = event.target.value;

      // Filtrar y cargar los datos del nodo seleccionado
      const windData = await loadWindData("/data/wind_data.json");
      const noiseData = await loadNoiseData("/data/noise_data.json");
      const pmData = await loadPmData("/data/pm_data.json");
      const surthData = await loadSurthData("/data/surth_data.json");

      const filteredWindData = filterWindByNode(windData, selectedNode);
      const filteredNoiseData = filterNoiseByNode(noiseData, selectedNode);
      const filteredPmData = filterPmByNode(pmData, selectedNode);
      const filteredSurthData = filterSurthByNode(surthData, selectedNode);

      if (
        filteredWindData.length > 0 ||
        filteredNoiseData.length > 0 ||
        filteredPmData.length > 0 ||
        filteredSurthData.length > 0
      ) {
        const lastRecord = {
          wind: filteredWindData[filteredWindData.length - 1],
          noise: filteredNoiseData[filteredNoiseData.length - 1],
          pm: filteredPmData[filteredPmData.length - 1],
          surth: filteredSurthData[filteredSurthData.length - 1],
        };

        console.log("Último registro del nodo seleccionado:", lastRecord);

        const message = `
        En esta zona, la contaminación del aire en PM2 es de ${lastRecord.pm.massPM2_5Avg} μg/m3, 
        en cuestión de Pm10 es ${lastRecord.pm.massPM10_0Avg} μg/m3. 
        La temperatura es de ${lastRecord.surth.temperatureAvg} °C, 
        la sensación de humedad es de ${lastRecord.surth.humidityAvg} %, 
        la radiación solar es ${lastRecord.surth.solarRadiationAvg} W/m2, 
        el índice UV es de ${lastRecord.surth.uvIndexAvg}. 
        Está venteando a una velocidad de ${lastRecord.wind.windSpeedAvg} m/s 
        y el ruido percibido es de ${lastRecord.noise.noiseAvg} db.
      `;

        // Agregar los datos al div nodes
        const nodesDiv = document.querySelector(".nodes");
        nodesDiv.innerHTML = ""; // Limpiar el contenido del div antes de agregar nuevos nodos

        const nodeElement = document.createElement("div");
        nodeElement.classList.add("node");

        nodeElement.innerHTML = `<p>${message}</p>`;

        nodesDiv.appendChild(nodeElement);

        // Mostrar el div nodes
        nodesDiv.style.display = "flex";
      } else {
        console.log("No hay registros para el nodo seleccionado.");
      }
    });

  document.addEventListener("click", function (event) {
    const nodesDiv = document.getElementById("nodes");
    const isClickInside = nodesDiv.contains(event.target);

    if (!isClickInside) {
      nodesDiv.style.display = "none";
    }
  });

  sumaryPmData();
});

// // Función para cargar y filtrar datos por nodo
// async function loadAndFilterData(nodeName) {
//   try {
//     const [windData, noiseData, pmData, surthData] = await Promise.all([
//       loadWindData("/data/wind_data.json"),
//       loadNoiseData("/data/noise_data.json"),
//       loadPmData("/data/pm_data.json"),
//       loadSurthData("/data/surth_data.json"),
//     ]);

//     const filteredWindData = filterWindByNode(windData, nodeName);
//     const filteredNoiseData = filterNoiseByNode(noiseData, nodeName);
//     const filteredPmData = filterPmByNode(pmData, nodeName);
//     const filteredSurthData = filterSurthByNode(surthData, nodeName);

//     return {
//       wind: filteredWindData,
//       noise: filteredNoiseData,
//       pm: filteredPmData,
//       surth: filteredSurthData,
//     };
//   } catch (error) {
//     console.error("Error al cargar y filtrar los datos:", error);
//   }
// }
