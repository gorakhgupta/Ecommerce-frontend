import {React,useState,useEffect,useRef} from 'react'
import './Product.css';
import Productdetail from './Productdetail';
import { useDispatch, useSelector } from 'react-redux';
const Product = () => {
    const [productsData, setproductsData] = useState([]);
    const [pdpData, setPdpData] = useState({});
    const [showProduts,setshowProduts] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [isSelectionBoard, setisSelectionBoard] = useState(true);
    const[ispdp,setispdp] = useState(false);
    const searchRef = useRef(null);
    const dispatch = useDispatch();
    const totalData = useSelector(state=>state.userReducer);

    function getProducts() {
    fetch('http://localhost:5000/products').then((res)=>res.json().then((response)=>{
      console.log(response);
      setproductsData(response.data);    
      setFilteredData(response.data);
      if(response.data) {
        localStorage.setItem('products', JSON.stringify(response.data));
      }
      setLoading(false);
    })).catch((err)=>{
      alert(err.message);
      setError(err);
      setLoading(false);
    });
     }


     const handlePdp = (data)=>{
      setispdp(true);
      setisSelectionBoard(false);
      setPdpData(data);
      setshowProduts(false);
     }
     const handleBack = ()=>{
        setispdp(false);
        setshowProduts(true);
        setisSelectionBoard(true);
     }
    useEffect(() => {
      const productsData = localStorage.getItem('products');
      if(productsData && totalData && !totalData.shouldCallApi) {
        const resultData = JSON.parse(productsData);
        setproductsData(resultData);    
        setFilteredData(resultData);
        setLoading(false);
      } else{
     getProducts();
     dispatch({type:"NEED_API",data: {shouldCallApi: false}}); 
      }
    }, [])
    const handleSearch = (e)=>{
      const searchText = searchRef.current.value;
      const filteredProducts = productsData.filter((each)=>each.title.toLowerCase().includes(searchText.toLowerCase()));
      setFilteredData(filteredProducts);
    }
    if(error) {
      return <h1>Error in fetching the Data ..</h1>
    }
  return (
    <div className={`product-main-div ${!ispdp && 'margin-50'} `}>
    <div className='search-product'>
    { isSelectionBoard && productsData.length > 0 && 
    <div> <input ref={searchRef} onChange={handleSearch} className='search-input' type="text" placeholder='Search Products Here' /> </div>
    }
    </div>
      {
   
        loading ? <div className='loading-div' > <div className='spinner'></div></div> :( showProduts &&
          filteredData.map((each)=>{
            return (
                <div onClick={()=>handlePdp(each)} className='each-product' key={each.id} style={{width:'300px',height:'300px',border:'1px solid gray',padding:'10px'}}>
                  <div style={{width:'100%',height:'80%'}}> <img style={{width: '100%',
                    height: '100%',objectFit:'contain'}} src={`data:image/jpeg;base64,${each.image.imageData}`}/> </div>
                    <div className='product-details'>
                    <div>{each.title}</div>
                  <div >Rs. {each.price}/-</div>
                  </div>
                </div>
            )
        })
        )
      }
      {
        !filteredData.length && !loading && <h1 className='no-product'>Sorry, No Products Found</h1>
      }
      {
        ispdp && <Productdetail data = {pdpData}  handleBack = {handleBack} />
      }
    </div>
  )
}

export default Product
