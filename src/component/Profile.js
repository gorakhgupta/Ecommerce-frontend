import React, { useState ,useEffect} from 'react'
import './Profile.css';
import { useDispatch , useSelector} from 'react-redux';
const Profile = () => {
  const [issigup,setissigup] = useState(true);
  const dispatch = useDispatch();
  const totalData = useSelector(state=>state.userReducer);
  const [verified,setverified] = useState(false);
  const [logindata,setlogindata] = useState({});
  const [loading, setloading] = useState(false);
  const [formData,setFormData] = useState({
    name: '',
    mobile:'',
    gender:'',
    email :'',
    password:''
  });
  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name] : e.target.value});
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    setloading(true);
    let requiredUrl = 'https://ecommerce-backend-h4rl.onrender.com/';
    if(issigup) {
      requiredUrl += 'register';
    }else {
      requiredUrl += 'login';
    }
    fetch(requiredUrl,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((res)=>{
      res.json().then((result)=>{
          if(!result.data) {
            alert('Wrong credentials');
            return;
          }
        setlogindata(result.data);
        dispatch({type:"LOGIN",data:result.data});
        console.log(result);
        setissigup(false);
        setloading(false);
      })
    }).catch((err)=>{
      console.log('Error: ' + err);
      setloading(false);
    });
    setFormData({
      name: '',
      mobile:'',
      gender:'',
      email :'',
      password:''
    });
  }
  const handleLogout = ()=>{
    setissigup(true);
    setlogindata({});
  }

  useEffect(()=>{
if(totalData && totalData.loginData) {
  setlogindata(totalData.loginData);
}
  },[]);
  return (

    
    <div className='main-profile'>
    {loading && <h2 style={{marginTop:'30vh'}}>Loading ...</h2>}
    {  !Object.keys(logindata).length && !loading &&
      <div style={{textAlign:'center'}}>
      <div onClick={()=>setissigup(!issigup)} >Already Registered? <span style={{textDecoration:'underline'}}>{!issigup ? 'Signup' : 'Login'}</span> </div>
      </div>

    }

      {!Object.keys(logindata).length && !loading &&  <div className='main-login'>
      <div className='login'>   
    <form onSubmit={handleSubmit} action="">

    {issigup && !loading && 
    <div className='name-mobile-gender'>  
   <div  > Name : <br/> <input value={formData.name} onChange={handleChange} name='name' type="text" required placeholder='Enter Your Name'/> </div>
    <div>Mobile : <br/> <input value={formData.mobile} onChange={handleChange}  name='mobile' type="mobile" required  placeholder='Enter Your Mobile No'/></div>
   <div> Gender : <br/><select value={formData.gender} onChange={handleChange}  name="gender" id=""> 
    <option value="">Select Gender</option> 
    <option value="Male">Male</option> 
    <option value="Female">Female</option> 
    </select>
    </div>
  </div>
  }
    Email : <input type="email" value={formData.email} onChange={handleChange}  name='email' required placeholder='Enter Your Email ID'/>
    Password : <input required type="password" value={formData.password} onChange={handleChange}  name='password' placeholder='Enter Your password ' /> 
    <button className={`signup-login-button ${issigup && 'bg-green'} `} type='submit' >{issigup ? 'Sign Up' : 'Login'}</button>

    </form>
    </div>
</div> 
      }
{Object.keys(logindata).length > 0 && !loading && 

<div className='success-login'> 
 Hello, {logindata ? logindata.name : 'Guest'} Congratualations, Successfully Logged In !
 <div className='logout' onClick={handleLogout} >Log Out</div>
</div>
}
    

    </div>
  )
}

export default Profile
