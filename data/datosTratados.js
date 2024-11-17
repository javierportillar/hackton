// Función para leer el archivo JSON y asignar los datos a una variable
export async function loadWindData(filePath) {
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

export async function loadNoiseData(filePath) {
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

export async function loadPmData(filePath) {
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

export async function loadSurthData(filePath) {
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

// Función para filtrar los datos por nodo
export function filterWindByNode(data, nodeName) {
  return data.filter((item) => item.Nodo.trim() === nodeName.trim());
}

export function filterNoiseByNode(data, nodeName) {
  return data.filter((item) => item.Nodo.trim() === nodeName.trim());
}

export function filterPmByNode(data, nodeName) {
  return data.filter((item) => item.Nodo.trim() === nodeName.trim());
}

export function filterSurthByNode(data, nodeName) {
  return data.filter((item) => item.Nodo.trim() === nodeName.trim());
}

// Función para filtrar los datos por rango de fechas
function filterByDateRange(data, startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return data.filter((item) => {
    const timestamp = new Date(item.timestamp);
    return timestamp >= start && timestamp <= end;
  });
}

// Llamada a la función y asignación a la variable windData
// loadWindData("/data/wind_data.json").then((jsonData) => {
//   if (jsonData) {
//     const windData = jsonData;
//     console.log("Datos originales:", windData);

//     // Filtrar por nodo
//     const filteredByNode = filterByNode(windData, "Nodo 1 ");
//     console.log("Filtrado por Nodo 1:", filteredByNode);

//     // // Filtrar por rango de fechas
//     // const filteredByDateRange = filterByDateRange(
//     //   windData,
//     //   "2024-01-01",
//     //   "2024-01-01"
//     // );
//     // console.log("Filtrado por rango de fechas:", filteredByDateRange);

//     // // Filtrar por nodo y rango de fechas
//     // const filteredByNodeAndDate = filterByDateRange(
//     //   filteredByNode,
//     //   "2024-01-01",
//     //   "2024-01-02"
//     // );

//     // console.log(
//     //   "Filtrado por Nodo 1 y rango de fechas:",
//     //   filteredByNodeAndDate
//     // );
//   } else {
//     console.log("No se pudo cargar el archivo JSON.");
//   }
// });
