import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import OptionForm from "./components/OptionForm";
import OptionsList from "./components/OptionsList";
function App() {

  

  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path="optionForm/:mode" element={<OptionForm/>} />
          <Route path="options" element={<OptionsList/>} />
          <Route path="optionForm/:mode/:id" element={<OptionForm />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
