import { useEffect, useState } from 'react';

const optionTypes = [
  {
    "id": "53789017-2847-46d4-b52a-c4b34c475945",
    "name": "Size",
    "type": "select"
  },
  {
    "id": "c77a75e8-e492-4359-93ec-c428cef103e3",
    "name": "Color",
    "type": "checkbox"
  }
];

const optionValues = [
  {
    "id": "d6c132ed-a6cd-4724-b7b2-2fd081e9b140",
    "optionValueName": "Small",
    "sortOrder": "1",
    "optionId": "53789017-2847-46d4-b52a-c4b34c475945"
  },
  {
    "id": "e427185b-51b2-4377-8def-9f08405eda7a",
    "optionValueName": "XL",
    "sortOrder": "2",
    "optionId": "53789017-2847-46d4-b52a-c4b34c475945"
  },
  {
    "id": "f4a8286b-226f-4c43-8ae5-9e5937111f8d",
    "optionValueName": "Red",
    "sortOrder": "1",
    "optionId": "c77a75e8-e492-4359-93ec-c428cef103e3"
  },
  {
    "id": "ee4850ec-c5fe-46b6-bd99-15b4b0998ecd",
    "optionValueName": "Black",
    "sortOrder": "2",
    "optionId": "c77a75e8-e492-4359-93ec-c428cef103e3"
  },
  {
    "id": "cfa88932-c1a9-4a56-9d31-6b60aed8fd33",
    "optionValueName": "Green",
    "sortOrder": "3",
    "optionId": "c77a75e8-e492-4359-93ec-c428cef103e3"
  }
];

function ProductOptions() {
  const [productOptions, setProductOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});

  const [selectedOptionValues, setSelectedOptionValues] = useState([]);
  

  useEffect(() => {
    // Retrieve state from local storage on component mount
    const storedOptions = localStorage.getItem('product_options');
    if (storedOptions) {
      setProductOptions(JSON.parse(storedOptions));
    }
  }, []);

  const saveToLocalStorage = () => {
    // Store state in local storage when the "Save" button is clicked
    localStorage.setItem('product_options', JSON.stringify(productOptions));
  };

  const addProductOption = (optionType) => {    
    setProductOptions([...productOptions, { optionId: optionType.target.value, values: [] }]);
  };

  const removeOption = (index) => {
    const newOptions = [...productOptions];
    newOptions.splice(index, 1);
    setProductOptions(newOptions);
  };

  const addOptionValue = (index, optionValue) => {
    const newOptions = [...productOptions];
    newOptions[index].values.push({
      optionValue: optionValue,
      quantity: '',
      price: '',
    });
    setProductOptions(newOptions);
  };

  const removeOptionValue = (optionIndex, valueIndex) => {
    const newOptions = [...productOptions];
    newOptions[optionIndex].values.splice(valueIndex, 1);
    setProductOptions(newOptions);
  };

  const handleOptionChange = (e, optionIndex) => {
    const selectedOptionId = e.target.value;

    // Update the selected option for the specific optionIndex
    setSelectedOptions({ ...selectedOptions, [optionIndex]: selectedOptionId });

    const filteredOptionValues = optionValues.filter(
      (value) => value.optionId === selectedOptionId
    );
    
    setProductOptions(prevOptions => {
      const newOptions = [...prevOptions];
      newOptions[optionIndex].selectedOptionValues = filteredOptionValues;
      return newOptions;
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dynamic Options Example</h1>
      <div className="mb-4">
        <select onChange={(e) => addProductOption(e)} className="border border-gray-300 rounded-lg px-3 py-2 mt-1 w-full focus:ring-blue-500 focus:border-blue-500">
        {optionTypes.map((optionType) => (
          // <button
          //   key={optionType.id}
          //   className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mr-2"
          //   onClick={() => addProductOption(optionType.type)}
          // >
          //   Add {optionType.name} Option
          // </button>
          <option key={optionType.id}  value={optionType.id}>{optionType.name}</option>
        ))}
        </select>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
          onClick={saveToLocalStorage}
        >
          Save
        </button>
      </div>
      {productOptions.map((option, optionIndex) => (
        <div key={optionIndex} className="mb-6">
          <h2 className="text-xl font-bold mb-2">Option {optionIndex + 1}</h2>
          <label className="block mb-2">
            Option Type:
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 mt-1 w-full focus:ring-blue-500 focus:border-blue-500"
              value={selectedOption}
              onChange={(e) => handleOptionChange(e, optionIndex)}
            >
              <option value="" disabled>Select an Option Type</option>
              {optionTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </label>

          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-4">
            <thead>
              <tr>
                <th className="py-2">Option Value</th>
                <th className="py-2">Quantity</th>
                <th className="py-2">Price</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {option.values.map((value, valueIndex) => (
                <tr key={valueIndex}>
                  <td>
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={value.optionValue}
                      onChange={(e) => {
                        const newOptions = [...productOptions];
                        newOptions[optionIndex].values[valueIndex].optionValue = e.target.value;
                        setProductOptions(newOptions);
                      }}
                    >
                      <option value="" disabled>Select an Option Value</option>
                      {selectedOptionValues.map((optValue) => (
                        <option key={optValue.id} value={optValue.optionValueName}>
                          {optValue.optionValueName}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      value={value.quantity}
                      onChange={(e) => {
                        const newOptions = [...productOptions];
                        newOptions[optionIndex].values[valueIndex].quantity = e.target.value;
                        setProductOptions(newOptions);
                      }}
                    />
                  </td>

                  <td>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      value={value.price}
                      onChange={(e) => {
                        const newOptions = [...productOptions];
                        newOptions[optionIndex].values[valueIndex].price = e.target.value;
                        setProductOptions(newOptions);
                      }}
                    />
                  </td>

                  <td>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
                      onClick={() => removeOptionValue(optionIndex, valueIndex)}
                    >
                      Remove Value
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300 mr-2"
            onClick={() => addOptionValue(optionIndex, '')}
          >
            Add Value
          </button>
          <button
            className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-300"
            onClick={() => removeOption(optionIndex)}
          >
            Remove Option
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductOptions;
