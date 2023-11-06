import { useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Header from "./common/Header";

export default function OptionForm() {
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

  const [optionDetail, setOptionDetail] = useState(storedOptionData.find(
    (option: any) => option.id === params.id
  ));
  
  console.log("🚀 ~ file: OptionForm.tsx:27 ~ OptionForm ~ optionDetail:", optionDetail)
 
  const [currentOption, setCurrentOption] = useState(
    optionDetail ? optionDetail : {}
  );
  console.log("🚀 ~ file: OptionForm.tsx:32 ~ OptionForm ~ currentOption:", currentOption)
  
  const [optionId, setOptionId] = useState(
    currentOption.id ? currentOption.id : uuidv4()
  );
 
  const [formData, setFormData]: any = useState(
    currentOption ? currentOption : {}
  );

  const currentOptionValues = storedOptionValueData.filter(
    (optionValue: any) => currentOption.id === optionValue.optionId
  );
  const [optionValues, setOptionValues] = useState<any[]>(
    currentOptionValues ? currentOptionValues : []
  );


  // useEffect(()=>{
  //   if(params.mode ==='add'){
  //       setCurrentOption({})
  //       setOptionValues([])
  //       setFormData({})
  //   }   
  // },[params.id,params.mode]);

    
  const optionsType: any[] = [
    { value: "checkbox", label: "Checkbox" },
    { value: "select", label: "Select" },
    { value: "radio", label: "Radio" },
  ];

  function createObject(id: any, name: string, type: string) {
    return { id, name, type };
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (params.mode === "add") {
      const newOption = createObject(optionId, formData.name, formData.type);
      storedOptionData.push(newOption);
      localStorage.setItem("options", JSON.stringify(storedOptionData));

      for (const item of optionValues) {
        storedOptionValueData.push(item);
      }
      localStorage.setItem(
        "options_values",
        JSON.stringify(storedOptionValueData)
      );
      setOptionValues([]);
    }

    if (params.mode === "edit") {
     
        const oldOptionsValue =  storedOptionValueData.filter((object:any) => {
           return object.optionId !== currentOption.id;
        });
        
        const newOptionsValues = [...oldOptionsValue , ...optionValues];
        localStorage.setItem("options_values", JSON.stringify(newOptionsValues));
 
    }
    
    const newOptionId = uuidv4();
    setOptionId(newOptionId);
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
     [e.target.name]: e.target.value,
    });
  };

  
  /*Add mulitple option values*/
  const handleInputChange = (e: any, index: any) => {
    const newInputValues = [...optionValues];
    newInputValues[index][e.target.name] = e.target.value;

    setOptionValues(newInputValues);
  };

  const handleInputDelete = (index: any) => {
    const options = [...optionValues];
    options.splice(index, 1);
    setOptionValues([...options]);
  };

  const addOptionValue = () => {
    setOptionValues([
      ...optionValues,
      
      { id: uuidv4(), optionValueName: "", sortOrder: "", optionId: optionId },
      
    ]);
 
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
          <div className="form-group">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Option Name
            </label>
            <input
              name="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
              value={currentOption.name}
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Type
            </label>

            <select
              name="type"
              id="type"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
            >
              {optionsType &&
                optionsType.map((item) => (
                  <option
                    value={item.value}
                    selected={currentOption.type === item.value}
                    key={item.value}
                  >
                    {" "}
                    {item.label}{" "}
                  </option>
                ))}
            </select>
          </div>

          <div>
            {optionValues &&
              optionValues.map((value, index) => (
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
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mr-1 px-4 rounded"
              onClick={addOptionValue}
            >
              Add Option
            </button>
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
