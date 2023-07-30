import React ,{useEffect,useState}from 'react'
import { useSelector } from 'react-redux'
import Cart from './Cart';
const Order = () => {
  const cartItemsData = useSelector((state)=>state.userReducer);
  const OrdersData =   (cartItemsData && cartItemsData.ordersData) ? cartItemsData.ordersData : []; 
  const [orders, setorders] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const getOrdersData = ()=>{
    fetch('http://localhost:5000/getOrders').then((response)=>
    response.json().then((result)=>{
    setorders(result.data);
    localStorage.setItem('ordersData', JSON.stringify(result.data));
    setloading(false);
    })
    ).catch((error)=>{
      setloading(false);
      seterror(error);
    })
  }
  useEffect(() => {
  const ordersData = JSON.parse(localStorage.getItem('ordersDatasss'));
  if(ordersData) {
    setorders(ordersData);
    setloading(false);

  }else{
   getOrdersData();
  }
  }, [])
  if(error) {
    return <h1>Error while fetching data</h1>
  }
  return (

    <div>
    {
      loading ? <div className='loading-div'> <div className='spinner'></div> </div> : 
    <div style={{display:'flex',width:'100%',justifyContent:'center'}}>
    <Cart ordersData = {orders}  fromOrders =  {true} /> 
    </div>
    }
    </div>
  )
}

export default Order
