import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "./Cart.css"
const Cart = ({ordersData,wishlistData,fromOrders,fromWishlist}) => {
  const dispatch = useDispatch();
  const cartStoreData  = useSelector((state)=>state.userReducer);
  let cartItems = cartStoreData?.productData ? cartStoreData.productData : [];
  if(fromOrders) {
    cartItems = ordersData;
  }
  if(fromWishlist) {
    cartItems = wishlistData;
  }
  const handleDispatch = (type,data)=>{
    let from = "Cart";
    if(fromOrders) {
      from = 'Orders';
    }else if(fromWishlist) {
      from = 'Wishlist';
    }
    if(type === 'add') {
    dispatch({type:'ADD_TO_CART',data : {...data,from}})
    } else {
     dispatch({type:'REMOVE_FROM_CART',id : data,from});
    }
  }

  return (
    <div className='main-div' style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',width:'40%',border:'1px solid dodgerblue',margin:'auto',padding:'20px',rowGap:'50px',marginTop:'20px'}}>
       {
        !cartItems.length ? <h1>Your {wishlistData ? 'WishList' : 'Cart'}  is Empty <span>Shop Now</span> </h1> :
        cartItems.map((each)=> {
          return (
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
            <div className='inner-div' style={{display:'flex',alignItems:'center',columnGap:'20px',padding:'10px',justifyContent:'space-between',width:'100%'}}>
            <div className='sub-inner' style={{width:'100px',height:'100px',display:'flex',columnGap:'50px',alignItems:'center'}}>
            <img style={{width:'100%',height:'100%',objectFit:'contain'}}  src={`data:image/jpeg;base64,${each.image.imageData}`} alt="" />
            <div style={{display:'flex',columnGap:'20px'}}>
            <div onClick={()=>handleDispatch("add",each)} style={{padding:'2px',minWidth:'2rem',height:'4vh'
            ,background:'green',color:'#ffffff',textAlign:'center',cursor:'pointer'}}>
            +
          </div>
          <div onClick={()=> handleDispatch('remove',each.id)} style={{padding:'2px',background:'red',height:'4vh',color:'#ffffff',minWidth:'2rem',textAlign:'center',cursor:'pointer'}}>
          -
        </div>
        </div>
            </div>

            <div className='details' style={{display:'flex',flexDirection:'column',width:'50%'}}>
     
            <div>
            {each.title}
            </div>
            <div>Price : Rs.{each.price}/-</div>
            <div>Quantity : {each.count ? each.count :  each.quantity ? each.quantity : 1}</div>
            </div>
           </div>
            </div>
          )
        }
      
        )
       }
    </div>
  )
}

export default Cart
