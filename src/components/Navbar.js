import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Navbar = () => {
  let location = useLocation();
  useEffect(() => {
    // console.log(location.pathname);
  }, [location]); //invokes when ever location changes - not necessary this effect

  let navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    // navigate('/login') //to atribute does work
  }
  return (
    <nav className="navbar navbar-expand-lg bg-dark" style={{color:'white',backgroundColor:"aqua"}}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{color:'white'}}>
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
                style={{color:'white'}}
              >
                Home
              </Link>
            </li>
          </ul>
          {!localStorage.getItem('token')?
          <form className="d-flex">
            <Link className="btn btn-primary mx-1" to='/login' role="button">Login</Link>
            <Link className="btn btn-primary mx-1" to='/signup' role="button">Signup</Link>
          </form>:
            <Link className="btn btn-primary mx-1" to='/login' role="button" onClick={handleLogout}>Log Out</Link>
          }
            
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
