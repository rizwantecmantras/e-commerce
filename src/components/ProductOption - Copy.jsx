import { useState } from 'react';

function ProductOptions() {
  const [productOptions, setProductOptions] = useState([]);

  const addProductOption = () => {
    setProductOptions([...productOptions, { name: '', values: [] }]);
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

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dynamic Options Example</h1>
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={addProductOption}
        >
          Add Option
        </button>
      </div>
      {productOptions.map((option, optionIndex) => (
        <div key={optionIndex} className="mb-6">
          <h2 className="text-xl font-bold mb-2">Option {optionIndex + 1}</h2>
          <label className="block mb-2">
            Option Name:
            <input
              className="border border-gray-300 rounded-lg px-3 py-2 mt-1 w-full focus:ring-blue-500 focus:border-blue-500"
              type="text"
              value={option.name}
              onChange={(e) => {
                const newOptions = [...productOptions];
                newOptions[optionIndex].name = e.target.value;
                setProductOptions(newOptions);
              }}
            />
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
                      <option value="red">Red</option>
                      <option value="green">Green</option>
                      <option value="blue">Blue</option>
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
