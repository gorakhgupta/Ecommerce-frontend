import React, {useRef, useState,useEffect} from 'react'
import './Admin.css'
import { useDispatch , useSelector } from 'react-redux';
const Admin = () => {
  const [imgUrl, setimgUrl] = useState();
  const [notice, setnotice] = useState(false);
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const totalData = useSelector(state=>state.userReducer);
  const [allproducts, setallproducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productDetails, setproductDetails] = useState({
    title:'',
    description:'',
    price:'',
    quantity:'',
    image:'',
  })
  const handleProductChange = (e)=>{
    setproductDetails({...productDetails,[e.target.name] : e.target.value})
  }
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imgURL = URL.createObjectURL(file);
    setimgUrl(imgURL);
    setproductDetails({
      ...productDetails,
      image: file,
    });
  };
  const handleAddProducts = (e)=>{
   e.preventDefault();
   setLoading(true);
   const formData = new FormData();
   if(!productDetails.title || !productDetails.price || !productDetails.quantity || !productDetails.image || !productDetails.description) {
    alert("Please Fill Product Details");
    return;
   }  
   formData.append('title', productDetails.title);
   formData.append('price', productDetails.price);
   formData.append('quantity', productDetails.quantity);
   formData.append('description', productDetails.description);
   if (productDetails.image) {
     formData.append('image', productDetails.image);
   }
   fetch('https://ecommerce-backend-h4rl.onrender.com/addProduct',{
    method:'POST',
    body: formData,
   }).then((response)=>{
    response.json().then((result)=>{
      console.log(result);
      setnotice(true);
      setLoading(false);
      getProducts();
      dispatch({type:"NEED_API",data:{shouldApiCall :true}})
      setTimeout(() => {
        setnotice(false);
      }, 2000);
    })
   }).catch((error)=>{
    alert("Product added failed");
    setLoading(false);
   })
   setimgUrl();
   formRef.current.reset();
 setproductDetails({
  title:'',
  description:'',
  price:'',
  quantity:'',
  image:'',
});
  }

  function getProducts() {
    setLoading(true);
    fetch('https://ecommerce-backend-h4rl.onrender.com/products').then((res)=>res.json().then((response)=>{
      console.log(response);
      setallproducts(response.data);  
      dispatch({type:"ALL_PRODUCTS",data:response.data});  
      setLoading(false);
    })).catch((err)=>{
      alert(err.message);
      setLoading(false);
    });
     }

  useEffect(() => {
    if(totalData && totalData.allProducts) {
      setallproducts(totalData.allProducts);
      setLoading(false);
     } else  
     getProducts();
  }, [])
  
  return (
    <div style={{display:'flex',width:'100%',justifyContent:'center',marginTop:'20px',height:'100%',marginBottom:'65px',flexDirection:'column'}}>
  {!loading && <div style={{margin: '0 auto 20px auto',color:'dodgerblue',fontWeight:'700',fontSize:'24px'}} className='modify-message'>Hey! Modify Your Shop Now!</div>}
    <div className='main-div'>
    <div className='main-sub' style={{width:'90%',display:'flex'}}>
      {loading && <h2 style={{margin:'30vh auto'}}>Loading...</h2>}
    { allproducts && !loading &&  <div className='all-product-div' style={{width:'50%'}}>
      <div className='main-container-items'>
    
      {allproducts.map((each,ind)=>{
      
        return (
          <div key={each._id} className='items-div'>
          <div className='image-price-div' style={{width:'100%',height:'50px',columnGap:'10px',alignItems:'center',display:'flex'}}>
          <img className='images' style={{objectFit:'contain',width:'100%',height:'100%'}} src={`data:image/jpeg;base64,${each.image.imageData}`} />
          <div style={{maxWidth:'80px',minWidth:'80px',fontSize:'10px'}}>{each.title}</div>
          <div style={{fontSize:'11px',fontWeight:'bold'}}>Rs.{each.price}/-</div>
          </div>
          <div className='edit-del' style={{display:'flex',columnGap:'50px',justifyContent:'center'}}>
          <div className='edit'>Edit</div>
          <div className='delete'>Delete</div>
          </div>
        
          </div>
        )
      })}
      </div>
      </div>}
   { !loading && 
    <form className='form-div' style={{width:'50%'}}  ref={formRef} action="">
    <div > <div className='margin-5' >Product Name</div> <input value={productDetails.title} name='title' placeholder='Please enter the Product Name' className='input-field' onChange={handleProductChange} style={{width:'100%'}} type="text" /></div>
    <div > <div className='margin-5' >Product Description</div> 
    <textarea onChange={handleProductChange} value={productDetails.description} name='description' placeholder='Please enter the Product Name' className='input-field' style={{width:'100%',height:'10vh',padding:'10px'}} type="text" /></div>
    <div> <div className='margin-5'>Price</div> <input onChange={handleProductChange} value={productDetails.price} name='price' placeholder='Please enter the Price' className='input-field'  style={{width:'100%'}} type="number" /></div>
    <div> <div className='margin-5'>Quantity</div> <input onChange={handleProductChange} value={productDetails.quantity} name='quantity' className='input-field' placeholder='Please enter the Quantity'  style={{width:'100%'}} type="number" /></div>
    <input  name='image' type="file" accept='image/*' onChange={handleImageChange}/>
    <div style={{width:'100px',height:'100px',margin:' 0 auto',display:'inline-block'}}>
    
    {
      productDetails && !loading && productDetails.image ? <img style={{width:'100%',height:'100%',objectFit:'contain'}} src={imgUrl} alt="" />:
      <img   style={{width:'100%',height:'100%',objectFit:'contain'}} src='https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png' />
    }
    </div>

    <button onClick={handleAddProducts} >Add</button>
   { notice &&  !loading && <div style={{backgroundColor:'green',position:'absolute',left:'43%',bottom:'7%',color:'#ffffff',padding:'12px',borderRadius:'10px'}}>Product Added successfully</div> }
    </form>
  }
    </div>
</div>
    </div>
  )
}

export default Admin
