import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    /*
    height: 7vh;
    display: flex;
    column-gap: 30px;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    border-top: 1px solid red;
    width: 100%;




    */
    <div style={{height:'7vh',display:'flex',columnGap:'30px',justifyContent:'center',alignItems:'center',width:'100%',bottom:'0',position:'fixed',background: 'tan'}}>
     <div><Link href="">Contacts</Link></div>
     <div><Link href="">About</Link></div>
     <div><Link href="">Privacy Policy</Link></div>
     <div><Link href="">Email</Link></div>
    </div>
  )
}

export default Footer
