import React, { useState, useRef} from 'react'
import "./Checkout.css"
import Payment from './Payment';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch } from 'react-redux';
const Checkout = ({productData,handleBack,backToPDP}) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
const [isPayment, setisPayment] = useState(false);
const [quantity, setquantity] = useState(1);
  const [shippingDetails, setshippingDetails] = useState({mobile:'',address:''});
console.log(productData);
  const getLocation = () => {
    fetch(`https://nominatim.openstreetmap.org/search?postalcode=${inputRef.current.value}&format=json`)
    .then((resp)=>resp.json().then((results)=>{
      setshippingDetails({...shippingDetails, address:  results && results.length ? results[0].display_name : "No Data Available"});
    }))

  }
  const handlePay = ()=>{
    if(shippingDetails?.address && shippingDetails?.mobile && inputRef.current.value.length > 0 && shippingDetails?.address !== "No Data Available") {
      shippingDetails["pincode"] = inputRef.current.value;
    setisPayment(true);
    }else {
      alert("Error In form submission");
    }
  }
  const doSomeMagic = function (fn,d){
    let timer;
    return function() {
      clearTimeout(timer);
       timer = setTimeout(() => {
        fn();
      }, d);
    }
  }
  const backToCheckout = ()=>{
    setisPayment(false);
  }
  const smartFun = doSomeMagic(getLocation, 250);
  return (

    <div> 
    { !isPayment  ?
    <div className="shipping-details">
    <div style={{ display: 'inline-block',fontSize: '24px',fontWeight:'700'}} onClick={()=>backToPDP()} className="back"><IoIosArrowRoundBack/></div>

    <div style={{display:'flex',justifyContent:'center',justifyContent:'space-between'}}>
    <div style={{width:'50px',height:'50px',objectFit:'contain'}}>
    <img style={{width:'100%',height:'100%',objectFit:'contain'}} src={`data:image/jpeg;base64,${productData.image.imageData}`} alt="" />
    </div>

    <div style={{display:'flex',columnGap:'20px',alignItems:'center'}}>
    <div className='plus' onClick={()=>{setquantity(quantity+1)}} style={{padding:'2px',height:'28px',minWidth:'4rem',background:'green',color:'#ffffff',textAlign:'center',cursor:'pointer'}}>
    +
  </div>
  <div className='minus' onClick={()=>{setquantity( quantity > 1 ? quantity-1 : 1)}} style={{padding:'2px',height:'28px',background:'red',color:'#ffffff',minWidth:'4rem',textAlign:'center',cursor:'pointer'}}>
  -
</div>
</div>
    <div>
    <div>{productData.title}</div>
    <div>Price : {productData.price}</div>
    <div>Quantity : {quantity}</div>
    </div>
    </div>

    <form action="">
    <input value={shippingDetails.mobile} minLength={10} maxLength={10} onChange={(e)=>{
      const regex = /^[0-9]+$/;
      if(regex.test(e.target.value)){
      setshippingDetails({...shippingDetails,mobile : e.target.value})}
      else {
        setshippingDetails({...shippingDetails,mobile : ''})
      }
    
    }} type="text" placeholder='Mobile No' />
    <input type="text" placeholder='Enter Pin code number' name='pincode' ref={inputRef}
     onChange={smartFun}
     />
     <input value = {shippingDetails.address} onChange={(e)=>setshippingDetails({...shippingDetails,address : e.target.value})}  placeholder='Address' type="text" />
     <div onClick={handlePay} className='pay-now'>Click To Pay</div>
    </form>
    </div> :
    <div style={{display:'flex',justifyContent:'center'}} >
    <Payment shippingDetails = {shippingDetails} productData = {productData} quantity = {quantity} backToCheckout  = {backToCheckout} handleBack = {handleBack} />
    </div>
    
    }
    
    </div>
  )
}

export default Checkout
