import React, { useContext, useState } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container, Form, Button } from 'react-bootstrap'; // Import Bootstrap components
import { Link, Navigate } from 'react-router-dom'; 
import { UserContext } from '../userContext';

function Register() {

    const {UserInfo} = useContext(UserContext)
    const username = UserInfo?.username

    const [navigation, setNavigation] = useState(false)
    const [bodyData, setbodyData] = useState({
        username: '',
        password: '',
        reenteredPassword: '',
        birthDate: ''
    });

    const [picture, setPicture] = useState()

    const handleChange = async (e) => {

    const { name, value, type } = e.target;

    if (type === 'file') {
        // Handle file input differently
        await setPicture(e.target.files[0])
    } else {
        setbodyData({
        ...bodyData,
        [name]: value,
        });
    }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const allData = new FormData()
        allData.append('picture', picture)
        allData.append('username',bodyData.username)
        allData.append('password',bodyData.password)
        allData.append('reenteredPassword',bodyData.reenteredPassword)
        allData.append('birthDate',bodyData.birthDate)

        axios.post(
            "http://localhost:3500/auth/register",
            allData,
            {withCredentials: true}
        ).then(res => {

          if(res.data.status !== 'ok'){
            alert(res.data.message)
          }else{
            setNavigation(true)
          }
            

        })

    };

  if(navigation){
    window.location.assign('http://localhost:3000')
  }

  if(username){
    return <Navigate to = {'*'} />
  }

  return (
    <Container className="mt-5 text-white"> {/* Add text-white class for white text */}
      <h2 className="text-white text-center mt-3">Register</h2> {/* Add text-white class for white text */}
      <Form onSubmit={handleSubmit}>

        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={bodyData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={bodyData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="reenteredPassword">
          <Form.Label>Re-enter Password</Form.Label>
          <Form.Control
            type="password"
            name="reenteredPassword"
            value={bodyData.reenteredPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="picture">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control 
            type="file"
            name="picture"
            accept="image/*"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="birthDate">
          <Form.Label>birthDate</Form.Label>
          <Form.Control
            type="date"
            name="birthDate"
            value={bodyData.birthDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <div className="text-center mt-3"> {/* Add text-center class for center alignment and mt-3 for margin-top */}
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </div>

        <p className="mt-3 text-center">
          Have an account{' '}
          <Link to="/login">Login here</Link>
        </p>
      </Form>
    </Container>
  );
}

export default Register;
