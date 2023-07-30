import React, { useState } from 'react'
import "./Checkout.css"
import "./Payment.css"
import { useDispatch } from 'react-redux';
import { IoIosArrowRoundBack } from "react-icons/io";
const Payment = ({handleBack,backToCheckout,productData,quantity,shippingDetails}) => {
    const [isOrderPlaced, setisOrderPlaced] = useState(false);
    const dispatch = useDispatch();
    const handleOrderPlace = ()=>{
      const formData = new FormData();
    const {title, quantity,price,description,image} = productData; 
    const {pincode,address,mobile} =  shippingDetails; 
    const amount = price*quantity;
    formData.append('title', title);
    formData.append('price',price);
    formData.append('quantity',quantity);
    formData.append('description',description);
    formData.append('address',address);
    formData.append('pincode',pincode);
    formData.append('mobile',mobile);
    formData.append('amount',amount);

      const requiredData = {...productData,...quantity,Amount: quantity*productData.price,...shippingDetails};
      dispatch({type:"ORDER_PLACED",data : {...productData,quantity,Amount : quantity*productData.price,shippingDetails}});
     fetch('http://localhost:5000/orders',{
      method:'POST',
      body: formData
     }).then((response)=>response.json().then((responseData)=>

     console.log(responseData))
     );

      setisOrderPlaced(true)
    }
  return (
    <div style={{width:'100%'}}>
     {!isOrderPlaced ? 
     <div>
     <div style={{ display: 'inline-block',fontSize: '24px',fontWeight:'700'}} onClick={()=>backToCheckout()} className="back"><IoIosArrowRoundBack/></div>
     <div style={{display:'flex',justifyContent:'center',justifyContent:'space-between'}}>
    <div style={{width:'50px',height:'50px',objectFit:'contain'}}>
    <img style={{width:'100%',height:'100%',objectFit:'contain'}}  src={`data:image/jpeg;base64,${productData.image.imageData}`} alt="" />
    </div>
    <div>
    <div>{productData.title}</div>
    <div>Price : {productData.price}</div>
    <div>Quantity Selected : {quantity}</div>
    <div>Total Amount : {quantity*productData.price}</div>
    </div>
    </div>
    <div style={{fontSize:'24px',fontWeight:'700'}}>Available Payment Options</div>
    <div style={{display:'flex',alignItems:'center',columnGap:'30px',margin:'20px 10px'}}>
     <div style={{whiteSpace:'nowrap'}}>1.  COD </div> 
    <input style={{outline:'none'}} type="radio" /></div>
    <div onClick={handleOrderPlace} className='pay-now'>Place Order</div>
   </div> :
   <div className='order-placed' style={{fontSize:'24px',fontWeight:'700',position:'absolute',top:'45%',left:'32%'}}>  
   Your Order Has been Placed !
   <span  onClick={()=>handleBack()} style={{textDecoration:'underline'}}>Continue Shopping</span>
   </div>
     }
    </div>
  )
}

export default Payment
