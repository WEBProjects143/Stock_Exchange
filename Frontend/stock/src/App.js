import HomeApp from './HomeApp/HomeApp';
import MyStocks from './Componets/Stocks/MyStocks';
import Home from './Componets/Stocks/Home';
import Login from './Componets/Stocks/login/login';
import Register from './Componets/Stocks/Register/Register';
import Trades from "./Componets/Stocks/StockTrade"
import ProductCard from './Componets/Stocks/products/ProductCard';
import PaymentForm from './Componets/Stocks/Payment/Payment';

import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import ProductDetailPage from './Componets/Stocks/Productdetails/ProductDetails';
import ShopHome from './React/RecactCompnenent/shoppingHome';
import Shop from "./React/Shop/shop";
import Navigation from './React/Navigation/Navigation';
import SignIn from './React/SignIn/sign-in.component';
import Cards from './React/CardComponent/Card';
import CardsDetails from './React/CardComponent/CardsDetails';
import SignUpForm from './React/SignIn/sign-up-form.component';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>      
            <Route path="/" element={<HomeApp />} >
            </Route>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reg" element={<Register />} />
            <Route path="/Mystocks" element={<MyStocks/>} />
            <Route path="/trades" element={<Trades/>} />
            <Route path="/product" element={<ProductCard/>} />
            <Route path="/productdetail/:id" element={<ProductDetailPage/>} />
            <Route path="/PaymentForm" element={<PaymentForm/>} />
            <Route path="/ShopHome" element={<Navigation />}>
              <Route index element={<ShopHome />} />
              <Route path="shop" element={<Shop />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="cards" element={<Cards />} />
              <Route path="carddetails" element={<CardsDetails />} />
              <Route path="SignUpForm" element={<SignUpForm />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
