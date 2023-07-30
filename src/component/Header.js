import {React,useState,useEffect} from 'react';
import './Header.css'
import { Link } from 'react-router-dom';
import { BsCart3} from "react-icons/bs";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const cartStoreData  = useSelector((state)=>state.userReducer);
  const [isloggedIn, setisloggedIn] = useState(false);
  const [productRef, setproductRef] = useState();
  const [linkVisited, setlinkVisited] = useState(-1);
  const navigate = useNavigate();
  const handleVisited = (e)=>{
    if(e.target.name === '2') {
      navigate('/cart/get');
    }
    setlinkVisited(e.target.name);
  } 
  return (
    <div className='header-container' >
    <div className="navlinks">
     <ul className='link-container'>
     <li className={`${linkVisited == 0 && 'bg-active'}`}>
     <Link  onClick={handleVisited} name = "0" to="/">Home</Link>
     </li>
     <li className={`${linkVisited == 1 && 'bg-active'}`}>
     <Link onClick={handleVisited} name = "1" to="/profile"> {isloggedIn ? 'Profile' : 'LogIn/SignUp'}</Link>
     </li>
     <li className={`${linkVisited == 2 && 'bg-active'}`} >
     <Link onClick={handleVisited} name = "2" to="/admin">Admin</Link>
     </li>
     <li  className={`${linkVisited == 3 && 'bg-active'}`}>
     <Link onClick={handleVisited} name = "3" to="/cart">Cart<sup style={{color:'blue'}}>{cartStoreData && cartStoreData.productData && cartStoreData.productData.length ? cartStoreData.productData.length : 0}</sup></Link>
     </li>
     <li className={`${linkVisited == 5 && 'bg-active'}`}>
     <Link onClick={handleVisited} name = "5" to="/orders">Orders</Link>
     </li>
     </ul>
      </div>
    </div>
  )
}

export default Header
