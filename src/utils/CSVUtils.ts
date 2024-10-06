import Papa from "papaparse";

// Utility to parse CSV file
export const parseCSVFile = (file: File, callback: (data: any) => void) => {
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      callback(results.data);
    },
  });
};

// Utility to download sample CSV
export const downloadSampleCSV = () => {
  const sampleData = [
    ["Name", "Position", "Number"],
    ["John Doe", "Forward", 7],
    ["Jane Smith", "Goalkeeper", 1],
  ];

  const csvContent =
    "data:text/csv;charset=utf-8," +
    sampleData.map((e) => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "sample_roster.csv");
  document.body.appendChild(link);
  link.click();
};
