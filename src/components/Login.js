import {useNavigate} from 'react-router-dom';
import React, { useState } from "react";


const Login = (props) => {
    const [credentials,setCredentials]=useState({email:"",password:""})
    let navigate = useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(credentials);
        const response=await fetch(process.env.REACT_APP_BASE_URL+'/auth/login',
        {
          method:'POST',
          headers:{
            'Content-Type': 'application/json', 
            },
          body:JSON.stringify(credentials),
          // mode: 'no-cors'
        });
        console.log(response)
        const json=await  response.json();
        console.log(json)
        if(json.success){
            localStorage.setItem('token',json.authtoken);
            navigate("/");
            props.showAlert("LoggedIn Successfully","success")
        }
        else props.showAlert("Invalid Credentials","danger")
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value}) //appends
    }
  return (
    <div>
      <form onSubmit={handleSubmit} style={{color:'white', marginTop:'10px'}}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email" value={credentials.email}  onChange={onChange}
            className="form-control"
            id="email" name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text" style={{color:'white', marginTop:'10px'}}>
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password" value={credentials.password}    onChange={onChange}
            className="form-control"
            id="password" name="password"
          />
        </div>
        {/* <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div> */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
