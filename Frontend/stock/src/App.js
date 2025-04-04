import HomeApp from './HomeApp/HomeApp';
import MyStocks from './Componets/Stocks/MyStocks';
import Home from './Componets/Stocks/Home';
import Login from './Componets/Stocks/login/login';
import Register from './Componets/Stocks/Register/Register';
import Trades from "./Componets/Stocks/StockTrade"
import ProductCard from './Componets/Stocks/products/ProductCard';

import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import ProductDetailPage from './Componets/Stocks/Productdetails/ProductDetails';

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
            <Route path="/product" element={<ProductCard/>} />
            <Route path="/productdetail" element={<ProductDetailPage/>} />
  
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
