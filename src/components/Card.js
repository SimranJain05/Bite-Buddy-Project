import React, {useEffect, useRef, useState} from "react";
import { useDispatch , useCart } from "./ContextReducer";
export default function Card(props) {
  // const [isTruncated, setIsTruncated] = useState(true);

  // const toggleTruncate = () => {
  //   setIsTruncated(!isTruncated);
  // };

  let dispatch = useDispatch();
  let data = useCart()
  const priceRef = useRef()
  let options = props.options
  let priceOptions = Object.keys(options)
  const [qty,setQty] = useState(1)
  const [size,setSize] = useState("")

  const handleAddToCart = async () => {
    await dispatch({type: "ADD" , id:props.foodItem._id, name : props.foodItem.name , price: finalPrice ,img : props.foodItem.img, qty : qty, size : size})
    console.log(data)
  }

  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value)
  } , [])

  return (
    <div>
     
      <div>
        <div className="card mt-3" style={{ "width" : "16rem" , "maxHeight" : "420px"}}>
          <img style={{height:"180px", objectFit:"fill"}}src={props.foodItem.img} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            {/* <p className="card-text" style={{ overflow: "hidden", whiteSpace: isTruncated ? "nowrap" : "pre-wrap", textOverflow: "clip" }} onClick={toggleTruncate}>
              {props.foodItem.description}
            </p> */}
            <div className="container w-100 p-0">
              <select className="m-1 h-100 bg-success rounded " onChange={(e) => setQty(e.target.value)}>
                {Array.from(Array(10), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>

              <select className="m-1 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                {
                  priceOptions.map((data) => {
                    return <option key={data} value={data}>{data}</option>;
                  })
                }
              </select>

              <div className='d-inline h-100 fs-5'>
                {finalPrice}/-
              </div>

              <hr />
              <div className="btn btn-success justify-center ms-5" onClick={handleAddToCart} > Add to Cart </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
