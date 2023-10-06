import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Navbar, Nav } from 'react-bootstrap'; // Import Bootstrap components
import axios from 'axios';
import { UserContext } from '../userContext';
import LoadingComponent from './Loading';

function NavigationBar() {

  const { UserInfo, setUserInfo } = useContext(UserContext)
  const [fetching, setFetching] = useState(false)
  
  useEffect(() => {

    try{
      axios.get('http://localhost:3500/auth/profile',
        {withCredentials: true}

      ).then(async res => {

        setFetching(true)
        const newData = {
          ...res.data.user,         // Copy the existing data
          fetching: true, // Add the new element
        }
        setUserInfo(newData)

      }).catch(err => console.log(err.message))

    }catch(err){
      console.log(err.message)
    }


  },[])

  const handleLogoutButton = () => {

    axios.delete('http://localhost:3500/auth/logout', {withCredentials: true})
    setUserInfo(null)

  }

  if(fetching)
  {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/" className="mx-2">KassemNotes</Navbar.Brand> {/* Use pl-4 and pr-5 for left and right padding */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="m-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/postNote">Post Note</Nav.Link>
          <Nav.Link href="/contactUs">Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      {!UserInfo?.username ? (
        <Nav className="ml-auto"> {/* Use ml-auto for right alignment */}
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link  className='mx-1' href="/register">Signup</Nav.Link>
        </Nav>
      ):(
        <Nav className="ml-auto"> {/* Use ml-auto for right alignment */}
          <Nav.Link onClick = {handleLogoutButton}>Logout</Nav.Link>
          <Nav.Link  className='mx-1' href="#">
            <Nav.Item>
            <img
              src= {`http://localhost:3500/assets/${UserInfo.picturePath}`}
              alt="Profile"
              className="rounded-circle"
              width="30"
              height="30"
            />
          </Nav.Item>
        </Nav.Link>
        </Nav>
      )
      }
    </Navbar>

  );
  }else{
    return(
      <LoadingComponent/>
    )
  }
}

export default NavigationBar;
