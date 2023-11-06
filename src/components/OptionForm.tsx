import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Button from "./common/Button";
import Header from "./common/Header";
import Input from "./common/Input";
import Select from "./common/Select";

export default function OptionForm() {
  
  const optionsType: any[] = [
    { value: "checkbox", label: "Checkbox" },
    { value: "select", label: "Select" },
    { value: "radio", label: "Radio" },
  ];

  // Store data on local storage
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

  const params = useParams();

  const optionDetail = storedOptionData.find(
    (option: any) => option.id === params.id
  );
   
  const [currentOption, setCurrentOption] = useState(
    optionDetail ? optionDetail : {}
  );

  const [optionId, setOptionId] = useState(
    currentOption.id ? currentOption.id : uuidv4()
  );

  const [currentOptionValues , setCurrentOptionValues] = useState(storedOptionValueData.filter(
    (optionValue: any) => currentOption.id === optionValue.optionId
  ));
  
  useEffect(() => {
    if (params.mode === 'add') {
      setCurrentOption({'name':'', 'type':''}); // Set currentOption to null when mode is 'add'
      setOptionId(uuidv4()); // Reset the optionId
      setCurrentOptionValues([]); // Reset the optionValues
    }
  }, [params.mode]);


  function createOption(id: any, name: string, type: string) {
    return { id, name, type };
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (params.mode === "add") {
      const newOption = createOption(optionId, currentOption.name, currentOption.type);
      storedOptionData.push(newOption);
      localStorage.setItem("options", JSON.stringify(storedOptionData));

      for (const item of currentOptionValues) {
        storedOptionValueData.push(item);
      }
      localStorage.setItem(
        "options_values",
        JSON.stringify(storedOptionValueData)
      );
      setCurrentOptionValues([]);
    }

    if (params.mode === "edit") {

       const oldOption = storedOptionData.filter((object: any) => {
        return object.id !== currentOption.id;
      });

      localStorage.setItem("options", JSON.stringify([...oldOption, currentOption]));

      const oldOptionsValue = storedOptionValueData.filter((object: any) => {
        return object.optionId !== currentOption.id;

      });

      const newOptionsValues = [...oldOptionsValue, ...currentOptionValues];
      localStorage.setItem("options_values", JSON.stringify(newOptionsValues));
    }

    const newOptionId = uuidv4();
    setOptionId(newOptionId);
  };

  /*Change option name , type*/
  const handleChange = (e: any) => {
    setCurrentOption({ ...currentOption, [e.target.name]: e.target.value });
  };

  /*Add mulitple option values*/
  const addOptionValue = () => {
    setCurrentOptionValues([
      ...currentOptionValues,
      { id: uuidv4(), optionValueName: "", sortOrder: "", optionId: optionId },
    ]);
  };
  
  /*Change option values*/
  const handleInputChange = (e: any, index: any) => {
    
    const newInputValues = [...currentOptionValues];
    
    newInputValues[index][e.target.name] = e.target.value;

    setCurrentOptionValues(newInputValues);
  };

  /*Delete option values*/
  const handleInputDelete = (index: any) => {
    const options = [...currentOptionValues];
    options.splice(index, 1);
    setCurrentOptionValues([...options]);
  };

  return (
    <>
      <Header />
      <div className="w-full max-w-xl m-auto">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          OptionForm
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
         
          <Input label="Option Name" name="name" onChange={handleChange} value={currentOption.name} />

          <Select label="Type" name="type" options={optionsType} onChange={handleChange} currentObject={currentOption.type} />

          <div>
            {currentOptionValues &&
              currentOptionValues.map((value:any, index:any) => (
                <div className="grid  grid-cols-3 gap-4">
                  <div className="mt-2">
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      name="optionValueName"
                      value={value.optionValueName}
                      type="text"
                      onChange={(event) => handleInputChange(event, index)}
                    />
                  </div>
                  <div className="mt-2">
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      name="sortOrder"
                      value={value.sortOrder}
                      type="text"
                      onChange={(event) => handleInputChange(event, index)}
                    />
                  </div>
                  <div className="mt-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      type="button"
                      onClick={(event) => handleInputDelete(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <div className="mt-2">
            {/* <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mr-1 px-4 rounded"
              onClick={addOptionValue}
            >
              Add Option
            </button> */}
            <Button label={'Add Option'} onClick={addOptionValue} bg={'bg-blue-500'} bgHover={'bg-blue-700'}/>
            <button
              className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Save Option
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
