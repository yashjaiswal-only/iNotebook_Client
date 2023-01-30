import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

const Signup = (props) => {
    let navigate = useNavigate();
    const [credentials,setCredentials]=useState({name:"",email:"",password:""});
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch(process.env.REACT_APP_BASE_URL+'/auth/createuser',
        {
          method:'POST',
          headers:{
            'Content-Type': 'application/json', 
            },
          body:JSON.stringify(credentials)
        });
        const json=await  response.json();
        console.log(json)
        if(json.success){
            localStorage.setItem('token',json.authtoken);
            navigate("/");
            props.showAlert("Account Created Successfully","success")
        }
        else props.showAlert("Invalid Details","danger")
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value}) //appends
    }
  return (
    <div>
     <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input  className="form-control" value={credentials.name} onChange={onChange} id="name" name='name' />
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" value={credentials.email} name='email' onChange={onChange} id="email" />
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password (min. length 5)</label>
            <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Comfirm Password</label>
            <input type="password" className="form-control" id="cpassword" />
        </div>
        <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" required />
            <label className="form-check-label" htmlFor="exampleCheck1">Agree to terms & conditions</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Signup
