import React from "react";
import CategoryComponent from "../CategoryCompnent/CategoryComponent";
import "./Directoty.style.scss"
const Directory=({categories})=>{
    return(
        <div className='categories-container'>
        {categories.map((category)=>(
            <CategoryComponent key={category.id} category={category}/>
        ))}
      </div>
    )
}
export default Directory