import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button'
import Cardsdata from '../CardsData'
import "../style.css";

const Cards = () => {

  const [data, setData] = useState(Cardsdata);
  // console.log(data);



  return (
    <>
        <div className='container mt-3'>
        <h2 className='text-center'>Add to Cart Projects</h2>

        <CardGroup   style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap", // Allows wrapping on smaller screens
                  gap: "22upx",       // Adds space between cards
                  padding: "20px",
                }}
              >
          {
            data.map((element, id) => {
              return (
                <>
                  <Card style={{ width: '22rem',border:"none" }} className="mx-2 mt-4 card_style" key={id}>
                    <Card.Img variant="top" src={element.imgdata} style={{height:"16rem",width:"20rem"}} className="mt-3" />
                    <Card.Body>
                      <Card.Title>{element.rname}</Card.Title>
                      <Card.Text>
                      Price : ₹ {element.price}
                      </Card.Text>
                      <div className="button_div d-flex justify-content-center">
                      <Button variant="primary"  
                        // onClick={""}
                      className='col-lg-12'>Add to Cart</Button>
                      </div>
                    
                    </Card.Body>
                  </Card>
                </>
              )
            })
          }
        </CardGroup>
        </div>
    </>
  )
}

export default Cards