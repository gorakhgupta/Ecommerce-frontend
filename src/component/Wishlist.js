import React from 'react'
import Cart from './Cart'
import { useSelector } from 'react-redux'
const Wishlist = () => {

  const cartStoreData = useSelector((state)=>state.userReducer);
  let wishlistData = [];
  if(cartStoreData && cartStoreData.wishlistData) {
   wishlistData = cartStoreData.wishlistData;
  }
  return (
    <div style={{display:'flex',width:'100%',justifyContent:'center'}}>
    <Cart wishlistData = {wishlistData} fromWishlist = {true} />
    </div>
  )
}

export default Wishlist
