import React from "react";
// import "./categories.styles.scss"
import Directory from "../Directory.Component/DirectoryComponent";
import { Outlet } from "react-router-dom";


const ShopHome = () => {
    const categories = [
        {
          id: 1,
          title: 'Hats',
          imageUrl:""
        },
        {
          id: 2,
          title: 'Jackets',
          imageUrl:""
        },
        {
          id: 3,
          title: 'Sneakers',
          imageUrl:""
        },
        {
          id: 4,
          title: 'Womens',
          imageUrl:""
        },
        {
          id: 5,
          title: 'Mens',
          imageUrl:""
        },
      ];
    
    return (
        <>
        <Directory categories={categories} />
        <Outlet/>
        </> 
    )
    
  };
  
  export default ShopHome;