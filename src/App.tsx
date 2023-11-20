import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import OptionForm from "./components/OptionForm";
import OptionsList from "./components/OptionsList";
// import ProductForm from "./components/ProductForm";
import ProductForm from "./components/ProductForm";
import ProductOptions from "./components/ProductOption";
import ProductsList from "./components/ProductsList";
function App() {

  

  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path="options" element={<OptionsList/>} />
          <Route path="optionForm/:mode" element={<OptionForm/>} />
          <Route path="optionForm/:mode/:id" element={<OptionForm />} />
          <Route path="products" element={<ProductsList/>} />
          <Route path="productForm/:mode" element={<ProductForm/>} />
          <Route path="productForm/:mode/:id" element={<ProductForm />} />

          <Route path="productOptions/" element={<ProductOptions/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
