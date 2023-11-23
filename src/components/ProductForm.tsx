import { useEffect, useState } from "react";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import json from "../utilities/products.json";
import Header from "./common/Header";

export default function ProductForm() {
  //Get the options from local storage
  let optionsType: any = [];
  const storedOptionDataString = localStorage.getItem("options"); // Retrieve the value from local storage

  let storedOptionValueData: any = [];
  const storedOptionValueString = localStorage.getItem("options_values"); // Retrieve the value from local storage

  let storedProductOptionData: any = [];
  const storedProductOptionDataString = localStorage.getItem("product_option"); // Retrieve the value from local storage

  let storedProductOptionValueData: any = [];
  const storedProductOptionValueDataString = localStorage.getItem(
    "product_option_value"
  ); // Retrieve the value from local storage

  optionsType = storedOptionDataString
    ? JSON.parse(storedOptionDataString)
    : [];

  storedOptionValueData = storedOptionValueString
    ? JSON.parse(storedOptionValueString)
    : [];

  storedProductOptionData = storedProductOptionDataString
    ? JSON.parse(storedProductOptionDataString)
    : [];

  //Get product id from url
  const params = useParams();
  const productID = Number(params.id);

  //Get product details by Product ID
  const productDetail = json.products.find(
    (product: any) => product.id === productID
  );

  //manage current option state : Example Like Color , Size etc
  const [currentOption, setCurrentOption] = useState({
    id: "",
    name: " ",
    type: "",
  });

  //manage current option values state : Example Like Color option values : red , blue , green Size : samll , large , xl
  const [currentOptionValues, setCurrentOptionValues] = useState();

  const [productOption, setProductOption]: any = useState([]);
  console.log(
    "🚀 ~ file: ProductForm.tsx:35 ~ ProductForm ~ productOption:",
    productOption
  );

  const [productOptionValues, setProductOptionValues]: any = useState([]);
  console.log(
    "🚀 ~ file: ProductForm.tsx:56 ~ ProductForm ~ productOptionValues:",
    productOptionValues
  );

  //When add product option value
  // const handleAddProductOptionValue = (event:any , productOptionId: any) => {
  //   setProductOptionValues([...productOptionValues ,
  //   {
  //     product_option_id: productOptionId,
  //     product_option_value_id: uuidv4()
  //   }]);
  // };

  const handleAddProductOptionValue = (event: any, productOptionId: any) => {
    const index = productOptionValues.findIndex(
      (item: any) => Object.keys(item)[0] === productOptionId
    );

    if (index !== -1) {
      const updatedValues = [...productOptionValues];
      updatedValues[index][productOptionId].push({
        product_option_id: productOptionId,
        product_option_value_id: uuidv4(),
        // option_value_id:'',
      }); // Just for demonstration
      setProductOptionValues(updatedValues);
    } else {
      const newObj: {
        [key: string]: Array<{
          product_option_id: number;
          product_option_value_id: string;
          option_value_id: string;
          quantity: string;
          price: string;
        }>;
      } = {};
      newObj[productOptionId] = [
        {
          product_option_id: productOptionId,
          product_option_value_id: uuidv4(),
          option_value_id: "",
          quantity: "",
          price: "",
        },
      ]; // Just for demonstration
      setProductOptionValues([...productOptionValues, newObj]);
    }
  };

  // const handleDeleteProductOptionValue = (
  //   event: any,
  //   product_option_id: any,
  //   product_option_value_id: any
  // ) => {
  //   const updatedProductOptionValues = productOptionValues.map((item: any) => {
  //     const key = Object.keys(item)[0];
    
  //     if (key === product_option_id) {
  //       const updatedOptions = item[key].filter(
  //         (option: any) => option.product_option_value_id !== product_option_value_id
  //       );
  //       console.log("🚀 ~ file: ProductForm.tsx:212 ~ updatedProductOptionValues ~ updatedOptions:", updatedOptions)
  
  //       // Update the item only if options are updated
  //       if (updatedOptions.length !== item[key].length) {
  //         return {
  //           [key]: updatedOptions,
  //         };
  //       }
  //     }
    
  //     return item;
  //   });
  //   console.log("🚀 ~ file: ProductForm.tsx:223 ~ updatedProductOptionValues ~ updatedProductOptionValues:", updatedProductOptionValues)
  
  //   setProductOptionValues(updatedProductOptionValues.filter((item:any) => item)); // Remove null or undefined items if any
  // };


  const handleDeleteProductOptionValue = (
    event: any,
    product_option_id: any,
    product_option_value_id: any
  ) => {
    const updatedProductOptionValues = productOptionValues.map((item: any) => {
      const key = Object.keys(item)[0];
     
  
      if (key === product_option_id) {
        const updatedOptions = item[key].filter(
          (option: any) => option.product_option_value_id !== product_option_value_id
        );
         
  
        return {
          [key]: updatedOptions,
        };
      }
      console.log("🚀 ~ file: ProductForm.tsx:163 ~ updatedProductOptionValues ~ item:", item)
      return item;
     
    });
  
    setProductOptionValues(updatedProductOptionValues);
  };
  
  
  
  

  const handleProductOptionValue = (
    e: any,
    product_option_id: any,
    product_option_value_id: any
  ) => {
    console.log("ProductOptionValue", e.target.name, e.target.value);
  
    // Create a copy of the state
    const updatedProductOptionValues = productOptionValues.map((item:any) => {
      const key = Object.keys(item)[0];
  
      if (key === product_option_id) {
        // Find the specific item to update
        const updatedItem = item[product_option_id].map((option: any) => {
          if (option.product_option_value_id === product_option_value_id) {
            // Update the value based on the event target
            return {
              ...option,
              [e.target.name]: e.target.value,
            };
          }
          return option;
        });
  
        // Return the updated item for the specific key
        return {
          [product_option_id]: updatedItem,
        };
      }
  
      return item;
    });
  
    // Update the state with the modified value
    setProductOptionValues(updatedProductOptionValues);
  };
  

  const handleOptionChange = (e: any) => {
    const option = optionsType.find(
      (option: any) => option.id === e.target.value
    );
    setCurrentOption(option);
    setProductOption([
      ...productOption,
      {
        product_option_id: uuidv4(),
        product_id: productID,
        option_id: option.id,
        name: option.name,
      },
    ]);
  };

  useEffect(() => {
    setCurrentOptionValues(
      storedOptionValueData.filter((ov: any) => ov.Id === currentOption.id)
    );
  }, [currentOption]);

  //   const handleChange = (e: any) => {
  //     setCurrentOption({ ...currentOption, [e.target.name]: e.target.value });
  //   };

  const handleInputDelete = (e: any, index: any) => {
    console.log(
      "🚀 ~ file: ProductForm.tsx:82 ~ handleInputDelete ~ e:",
      e.target.name
    );
    console.log(
      "🚀 ~ file: ProductForm.tsx:82 ~ handleInputDelete ~ index:",
      index
    );
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    for (const item of productOption) {
      storedProductOptionData.push(item);
    }
    localStorage.setItem(
      "product_option",
      JSON.stringify(storedProductOptionData)
    );
  };

  // console.log(
  //   "Product option values:",
  //   storedOptionValueData.filter(
  //     (option_value: any) => option_value.optionId === currentOption.id
  //   )
  // );
  return (
    <>
      <Header />
      <div className="w-full max-w-6xl m-auto">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-3xl dark:text-white">
          Product Form
        </h1>

        <div className="grid grid-cols-8 gap-4 items-center border rounded-lg p-4 shadow-lg mb-5">
          <div className="col-span-1">
            <img
              className="w-12 h-12 md:w-16 md:h-16 lg:w-14 lg:h-14 rounded-md"
              src={productDetail?.image}
              alt=""
            />
          </div>
          <div className="col-span-4">
            <h1 className="text-3xl md:text-4xl lg:text-2xl text-gray-900 dark:text-white">
              {productDetail?.title}
            </h1>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          {/* options list - options drop down */}
          <div className="form-group">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Option :
            </label>
            <select
              name="optionId"
              onChange={handleOptionChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" selected disabled>
                --Select--
              </option>
              {optionsType?.map((option: any) => (
                <option value={option.id}>{option.name}</option>
              ))}
            </select>
          </div>

          {currentOption && (
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-3xl dark:text-white">
              {currentOption?.name}
            </h1>
          )}

          {productOption?.map((productOptionEach: any, index: any) => (
            <>
             {console.log("rendering")}
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {productOptionEach.name}
              </label>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Option Value
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <div>
                      {productOptionValues.map((item: any, index: any) => (
                        <div key={index}>
                          {Object.keys(item).map((key) => {
                            // Your comparison condition
                            if (productOptionEach.product_option_id === key) {
                              {console.log("rendering in if")}
                              return (
                                <div key={key}>
                                  <div>
                                    <strong>Main Key: {key}</strong>
                                  </div>
                                     
                                    {item[key].map((option: any, i: any) => (
                                      <>
                                        {/* <div key={i}> */}
                                        {option.option_value_id} -<b> {option.quantity} </b> - <i>{option.price}</i>

                                       <tr key={i} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${i}`}>
                                          <td className="px-6 py-4">
                                            <select
                                              name="option_value_id"
                                              onChange={(e) => {
                                                handleProductOptionValue(
                                                  e,
                                                  productOptionEach.product_option_id,
                                                  option.product_option_value_id
                                                );
                                              }}
                                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >
                                              <option disabled>--SELECT--</option>
                                              {storedOptionValueData
                                                .filter(
                                                  (option: any) =>
                                                    option.optionId ===
                                                    productOptionEach.option_id
                                                )
                                                .map((item: any) => (
                                                  <option value={item.id}
                                                  selected={option.option_value_id === item.id ? true : false}
                                                  >
                                                    {item.optionValueName}
                                                  </option>
                                                ))}
                                            </select>
                                          </td>

                                          <td className="px-6 py-4">
                                            <input
                                              onChange={(e) => {
                                                handleProductOptionValue(
                                                  e,
                                                  productOptionEach.product_option_id,
                                                  option.product_option_value_id
                                                );
                                              }}
                                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                              name="quantity"
                                              type="text"
                                              value={option.quantity}
                                            />
                                          </td>

                                          <td className="px-6 py-4">
                                            <input
                                              onChange={(e) => {
                                                handleProductOptionValue(
                                                  e,
                                                  productOptionEach.product_option_id,
                                                  option.product_option_value_id
                                                );
                                              }}
                                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                              name="price"
                                              type="text"
                                              value={option.price}
                                            />
                                          </td>

                                          <td className="">
                                            <button
                                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                              type="button"
                                              onClick={(event) =>
                                                handleDeleteProductOptionValue(
                                                  event,
                                                  productOptionEach.product_option_id,
                                                  option.product_option_value_id
                                                )
                                              }
                                            >
                                              <FaMinusSquare />
                                            </button>
                                          </td>
                                       
                                       </tr>
                                          
                                         {/* </div>    */}
                                      </>
                                    ))}
                                   
                                </div>
                              );
                            }
                            {console.log("rendering after if")}
                            return null; // If the condition isn't met, return null or handle it accordingly
                          })}
                        </div>
                      ))}
                    </div>

                    <tr>
                      <td colSpan={3}></td>
                      <td>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          type="button"
                          onClick={(event) =>
                            handleAddProductOptionValue(
                              event,
                              productOptionEach.product_option_id
                            )
                          }
                        >
                          <FaPlusSquare />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          ))}
          <button
            className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
}
