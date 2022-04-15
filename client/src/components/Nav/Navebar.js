import {useState, useEffect } from "react";
import {useDispatch} from "react-redux";
import decode from 'jwt-decode';

import { useNavigate ,useLocation} from 'react-router-dom';
import { Navbar,Container,NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LOGOUT } from "../../redux/constants/actiontype";
import {IoWalkOutline} from 'react-icons/io5';

const Navebar=()=>{
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location=useLocation();

  useEffect(()=>{
    const token=user?.token;
    
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) 
        Logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
    //console.log("navbar");
  },[location])


  const Logout=()=>{
    dispatch({type:LOGOUT});
    navigate('/');
    setUser(null);
  }

  return(
    <>
    <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand as={Link}  to='/'>Citation</Navbar.Brand>
      <Navbar.Toggle />{user?.result?.name}
      <Navbar.Collapse className="justify-content-end">
      <NavDropdown title={<IoWalkOutline/>} id="basic-nav-dropdown">
          <NavDropdown.Item  >
          {user?(
            <Navbar.Text className="text-dark" onClick={Logout}>logout</Navbar.Text>
          ):(
            <Navbar.Text className="text-dark" as={Link}  to='auth'>signin</Navbar.Text>
          )}
          </NavDropdown.Item>
          {user?(
          <NavDropdown.Item >
              <Navbar.Text className="text-dark" as={Link}  to={`/creators/${user.result.name}`}>profile</Navbar.Text>  
          </NavDropdown.Item>):(null)}
          
      </NavDropdown>  

        
      </Navbar.Collapse>
      <Navbar.Text >      {user?.result?.name} </Navbar.Text>
    </Container>
    </Navbar>
    <br/>
  </>
  );
}
export default Navebar;