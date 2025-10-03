import './App.css';
import Dashboard from './pages/Dashboard';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ShopLogin from './pages/ShopLogin';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<ShopLogin/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;