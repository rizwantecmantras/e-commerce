import { FaEdit, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import products from '../utilities/products.json'
import Header from './common/Header'

export default function ProductsList() {
  
  const handleDelete = (productID:any) => {}
  return (
     <>
      <Header/>
       
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                Image
                </th>
                <th scope="col" className="px-6 py-3">
                Product Name
                </th>
                <th scope="col" className="px-6 py-3">
                Action
                </th>
            </tr>
            </thead>
            <tbody>

            {products.products?.map((product:any)=> (
                 <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                 <td className="px-6 py-4"><img height={50} width={50} src={product.image} alt={product.title}/></td>
                 <th
                 scope="row"
                 className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                 >
                 {product.title}
                 </th>
                 
                 <td className="px-6 py-4">
                 <Link to={`/productForm/edit/${product.id}`} ><FaEdit/></Link>
                 <button onClick={()=>handleDelete(product.id)} type="button"><FaTrash/></button></td>
             </tr>
            ))}
           
            </tbody>
        </table>
      </div>
     </>
  )
}
