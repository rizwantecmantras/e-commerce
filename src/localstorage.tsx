let storedOptionData: any = [];
const storedOptionDataString = localStorage.getItem("options"); // Retrieve the value from local storage

let storedOptionValueData: any = [];
const storedOptionValueString = localStorage.getItem("options_values"); // Retrieve the value from local storage

storedOptionData = storedOptionDataString
  ? JSON.parse(storedOptionDataString)
  : [];
storedOptionValueData = storedOptionValueString
  ? JSON.parse(storedOptionValueString)
  : [];

  export { storedOptionData, storedOptionValueData };

