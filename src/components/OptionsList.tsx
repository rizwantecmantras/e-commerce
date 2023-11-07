import { useState } from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from "react-router-dom";
import Header from "./common/Header";


export default function OptionsList() {
    const localOptions : any = localStorage.getItem("options");   
    const [options,setOptions] = useState(JSON.parse(localOptions));

    let storedOptionValueData: any = [];
    const storedOptionValueString = localStorage.getItem("options_values"); // Retrieve the value from local storage
 
    storedOptionValueData = storedOptionValueString
      ? JSON.parse(storedOptionValueString)
      : [];

    const handleDelete = (optionId:any) => {
          const optionList =  JSON.parse(localOptions).filter((option:any)=> (option.id!==optionId));
          setOptions(optionList); 
          localStorage.setItem("options", JSON.stringify(optionList));

          const afterDeleteOption =  storedOptionValueData.filter((object:any) => {
            return object.optionId !== optionId;
          });
          localStorage.setItem("options_values", JSON.stringify(afterDeleteOption));
    }

  return (
    <>
     <Header/>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                Option Name
                </th>
                <th scope="col" className="px-6 py-3">
                Type
                </th>
                <th scope="col" className="px-6 py-3">
                Action
                </th>
            </tr>
            </thead>
            <tbody>

            {options && options?.map((option:any)=> (
                 <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                 <th
                 scope="row"
                 className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                 >
                 {option.name}
                 </th>
                 <td className="px-6 py-4">{option.type}</td>
                 <td className="px-6 py-4">
                 <Link to={`/optionForm/edit/${option.id}`} ><FaEdit/></Link>
                 <button onClick={()=>handleDelete(option.id)} type="button"><FaTrash/></button></td>
             </tr>
            ))}
           
            </tbody>
        </table>
        </div>

    </>
  )
}