import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container, Form, Button } from 'react-bootstrap'; // Import Bootstrap components
import axios from 'axios';
import { UserContext } from '../userContext';

function Post() {

    const { UserInfo } = useContext(UserContext)
    const [bodyData, setbodyData] = useState({
        title: '',
        subject: '',
        description: ''
    });
    const [picture, setPicture] = useState()
    const [audioFile, setAudioFile] = useState(null);


    const handleChange = async (e) => {

    const { name, value, type } = e.target;

    if (type === 'file') {

        // Handle file input differently
        if(name === 'picture'){
          await setPicture(e.target.files[0])
        }else{
          await setAudioFile(e.target.files[0]);
        }

    } else {
        setbodyData({
        ...bodyData,
        [name]: value,
        });
    }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const username = UserInfo?.username

        const pictureAndTitleData = new FormData()
        const audioData = new FormData()

        pictureAndTitleData.append('picture', picture)
        pictureAndTitleData.append('title',bodyData.title)
        pictureAndTitleData.append('subject',bodyData.subject)
        pictureAndTitleData.append('description',bodyData.description)
        audioData.append('audio',audioFile)

        if(username){
          axios.post(`http://localhost:3500/notes/post1/${username}`,
            pictureAndTitleData,
            {withCredentials: true}

          ).then(res => {
            // console.log(res.data)

            const noteId = res.data.note._id
            axios.post(`http://localhost:3500/notes/post2/${noteId}`,
            audioData,
            {withCredentials: true}

            ).then(res => {

              if(res.data.status === 'ok'){
                alert(`NOTE HAS BEEN CREATED WITH TITLE : ${bodyData.title.toUpperCase()}`)
                window.location.assign('http://localhost:3000/')
              }else{
                alert(res.data.message)
              }

            }).catch(err => console.log(err.message))

          }).catch(err => console.log(err.message))
      }else{
        alert('Login before posting any note!')
        window.location.assign('http://localhost:3000/login')
      }
        
    };

  return (
    <Container className="mt-5 text-white"> {/* Add text-white class for white text */}
      <h2 className="text-white text-center mt-3">Create Note</h2> {/* Add text-white class for white text */}
      <Form onSubmit={handleSubmit}>

        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={bodyData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className='mt-1'>Subject</Form.Label>
          <Form.Control
            type="text"
            name="subject"
            value={bodyData.subject}
            onChange={handleChange}
            placeholder="Enter subject"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            value={bodyData.description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </Form.Group>

        <Form.Group controlId="picture">
          <Form.Label>Note Picture</Form.Label>
          <Form.Control 
            type="file"
            name="picture"
            accept="image/*"
            onChange={handleChange}
          />
        </Form.Group>

        <Form>
          <Form.Group controlId="formFile" className="mb-3 mt-1">
            <Form.Label>Select an audio file:</Form.Label>
            <Form.Control type="file" accept=".mp3,.wav" onChange={handleChange} />
          </Form.Group>
        </Form>

        <div className="text-center mt-3"> {/* Add text-center class for center alignment and mt-3 for margin-top */}
          <Button variant="primary" type="submit">
            Create Note
          </Button>
        </div>

      </Form>
    </Container>
  );
}

export default Post;
