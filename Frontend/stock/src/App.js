import HomeApp from './HomeApp/HomeApp';
import MyStocks from './Componets/Stocks/MyStocks';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeApp />} />
          <Route path="/Mystocks" element={<MyStocks/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
