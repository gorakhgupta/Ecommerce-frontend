import React ,{useEffect,useState}from 'react'
import { useSelector,useDispatch } from 'react-redux'
import Cart from './Cart';
const Order = () => {
  const cartItemsData = useSelector((state)=>state.userReducer);
  const OrdersData =   (cartItemsData && cartItemsData.ordersData) ? cartItemsData.ordersData : []; 
  const [orders, setorders] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const dispatch = useDispatch();
  const getOrdersData = ()=>{
    fetch('https://ecommerce-backend-h4rl.onrender.com/getOrders').then((response)=>
    response.json().then((result)=>{
    setorders(result.data);
     dispatch({type:"ALL_ORDERS",data: result.data});
    setloading(false);
    })
    ).catch((error)=>{
      setloading(false);
      seterror(error);
    })
  }
  useEffect(() => {
    if(cartItemsData && cartItemsData.ordersData) {
      setloading(false);
    }
  }, [])
  if(error) {
    return <h1>Error while fetching data</h1>
  }
  return (

    <div>
    {
      loading ? <h2 style={{marginTop:'30vh'}}>Loading ...</h2> : 
    <div style={{display:'flex',width:'100%',justifyContent:'center'}}>
    <Cart ordersData = {orders}  fromOrders =  {true} /> 
    </div>
    }
    </div>
  )
}

export default Order
