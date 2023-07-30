import React, { useState } from 'react'
import './Productdetail.css'
import { IoIosArrowRoundBack } from "react-icons/io";
import Checkout from './Checkout';
import { useDispatch, useSelector } from 'react-redux';
const Productdetail = ({data,handleBack}) => {
  const {price,description,rating,image,category,title} = data;
  const id = data._id;
  let isAdded = false;
  const [isCheckout,setisCheckout] = useState(false);
  const [itemAdded, setitemAdded] = useState(false);
  const cartStoreData  = useSelector((state)=>state.userReducer);
  const dispatch = useDispatch();
 const openCheckout  = ()=> {
  setisCheckout(true);
 }
 const backToPDP = ()=>{
  setisCheckout(false);
 }
 const handleCurrBack = ()=>{
  handleBack();
 }
 const handleCheckout = (type)=>{
  setitemAdded(true);
  dispatch({type:type,data :{title,price,description,image,id,isAdded:false}})
  setTimeout(() => {
    setitemAdded(false);
  }, 2000);
 }
  return (
    <div style={{width:'100%'}} className={`${isCheckout && 'width-50'}`}>
    {!isCheckout   && (
    <div style={{width:'100%'}}>
    <div className='back-arrow' style={{display:'inline-block',margin:'0px 0 10px 40px'}} onClick={handleCurrBack} ><IoIosArrowRoundBack style={{fontSize:'34px'}}/></div>
    <div className='pdp-div'>
    <div className="left-pdp">
    <img  style={{width:'100%',height:'100%',objectFit:'contain'}}  src={`data:image/jpeg;base64,${image.imageData}`}  />
    </div>
    <div className="right-pdp">
    <div style={{fontSize:'30px',fontWeight:'700',marginBottom:'20px'}} className="title">{title}</div>
    <div className="price"> <b>Rs. {price} </b></div>
    <div style={{marginBottom:'20px'}} className="description"> <b>Description</b> : {description}</div>
    <div className={`add-to-cart bg-green ${isAdded && 'bg-red'} `}  onClick={()=>handleCheckout("ADD_TO_CART")} > Add To Cart</div>
    <div onClick={openCheckout} className='buy-now color-white bg-blue'>Buy It Now</div>
    {itemAdded &&  <div style={{color:'#ffffff',padding:'10px',background:'orange',borderRadius:'10px',margin:'0 auto',textAlign:'center'}}>Item Added To Cart Successfully</div> }
    </div>
    </div>
    </div>)
    }
    {
      isCheckout && <Checkout backToPDP = {backToPDP} handleBack = {handleBack} productData = {data} />
    }
    </div>
  )
}

export default Productdetail;
