import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'
import NotPage from './NoPage'

const CardMoreInfo = (props) => {

  const location = useLocation();

  const note = location.state?.note
  
  if(note){

    return (
      <div>
        {/* Larger Image */}
        <img className='mt-5'
          src= {`https://kassemnotes.onrender.com/assets/${note.imageSrc}`}
          alt="Image"
          style={{ width: '100%', maxWidth: '100%' }}
        />
        <Container
        className="flex-column align-items-center justify-content-center mt-5"
        style={{ minHeight: '50vh' , textAlign: 'center'}}
      >
        <Row>
          <Col xs={12} md={6}>
            {/* Content */}
            <Card>
              <Card.Body>
                {/* Title */}
                <Card.Title>Title: {note.title}</Card.Title>
                {/* Subject */}
                <Card.Subtitle className="mb-2 text-muted">Subject: {note.subject}</Card.Subtitle>
                {/* Description */}
                <Card.Text>
                  Description: {note.description}
                </Card.Text>
                {/* Date */}
                <Card.Text className="text-muted">Created in: {note.date}</Card.Text>
                {/* Voice Player */}
                {/* <audio controls>
                  <source src= {`http://localhost:3500/assets/${note.audioSrc}`} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      </div>
    )

  }else{

    return(
      <NotPage/>
    )

  }
  
}

export default CardMoreInfo
