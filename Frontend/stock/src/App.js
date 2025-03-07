import HomeApp from './HomeApp/HomeApp';
import MyStocks from './Componets/Stocks/MyStocks';
import Home from './Componets/Stocks/Home';
import Login from './Componets/Stocks/login/login';
import Register from './Componets/Stocks/Register/Register';
import Trades from "./Componets/Stocks/StockTrade"

import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>      
            <Route path="/" element={<HomeApp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reg" element={<Register />} />
            <Route path="/Mystocks" element={<MyStocks/>} />
            <Route path="/trades" element={<Trades/>} />
  
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
