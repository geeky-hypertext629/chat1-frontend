import React,{useState} from 'react';
import "./Join.css";
import logo from "./../images/logo.png";
import { Link } from 'react-router-dom';

let user;


const Join = () => {


  const [name, setname] = useState("");



  const sendUser = ()=>{
   user = document.getElementById('joinInput').value;
   document.getElementById('joinInput').value="";
  }


  return (
    <div className='JoinPage'>
      <div className="JoinContainer">
      <img src={logo} alt="logo"/>
        <h1>C Chat</h1>
        <input type="text" onChange={(e)=>{setname(e.target.value)}} placeholder='Enter Your Name' id='joinInput' className='nameInput'/>
        {/* <input type="text" onChange={(e)=>{setroom(e.target.value)}} placeholder='Enter Room Number' className='roomInput'/> */}
        <Link onClick={(e)=>!name?e.preventDefault():null} to="/chat"> <button className='joinbtn' onClick={sendUser}>Login</button></Link>
      </div>
    </div> 
  ) 
}

export default Join;
export {user};

