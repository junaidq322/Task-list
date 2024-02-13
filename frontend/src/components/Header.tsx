import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
  const loggedUser = localStorage.getItem("user");
  const navigate = useNavigate();
  const [user,setUser] = useState();
  useEffect(() => {
    const credentials = localStorage.getItem("user");
  }, [])
  
   const handleLogout = ()=>{
    localStorage.clear();
    navigate("/login")
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">TaskList App</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarColor02">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link className="nav-link active" to="/">Home
            <span className="visually-hidden">(current)</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#">About</Link>
        </li>
        <li className="nav-item">
          {!loggedUser &&<Link className="nav-link" to="/login">Login</Link>}
        </li>
        <li className="nav-item">
          {!loggedUser &&  <Link className="nav-link" to="/register">Register</Link>}
          
        </li>
        <li className="nav-item">
          {loggedUser &&  <a className="nav-link" onClick={handleLogout}>Logout</a>}
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}
