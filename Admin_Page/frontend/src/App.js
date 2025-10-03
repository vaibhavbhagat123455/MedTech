import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Selection from './Admin/Selection';
import AddMed from './Admin/AddMed';
import MedicinePrintPage from './Admin/MedicinePrintPage';
import ShopForm from './Admin/ShopForm';
import HomePage from './Common/HomePage';
import ShopDetails from './Admin/ShopDetails';
import MedicinesPage from './Admin/MedicinesPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/selection' element={<Selection/>}/>
        <Route path='/addmed' element={<AddMed/>}/>
        <Route path='/medicinePrint' element={<MedicinePrintPage/>}/>
        <Route path='/shopForm' element={<ShopForm/>}/>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/shops' element={<ShopDetails/>}/>
        <Route path='/medicines' element={<MedicinesPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
