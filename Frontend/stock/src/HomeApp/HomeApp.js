import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Stocks from "../Componets/Stocks/Stocks";

const HomeApp=()=>{
    return(
        <div>
            <Header/>
               <Stocks/>
            <Footer/>
        </div>
    )
}
export default  HomeApp;