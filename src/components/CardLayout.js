import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import AudioPlayer from 'react-audio-player';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from '../components/ConfirmDelete';

function MyCard({ imageSrc, title, subject, description, audioSrc, date, noteId }) {

    const navigate = useNavigate();

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const onDeleteClick = async () => {
        
      await axios.delete(`https://kassemnotes.onrender.com/notes/deleteNote/${noteId}`,
        {withCredentials: true}
      ).then(res => {

        if(res.data.status === 'ok'){
          setShowDeleteModal(false);
          window.location.reload();
        }

      }).catch(err => {
        setShowDeleteModal(false);
        alert(err.message)
      })
      setShowDeleteModal(false);
    }

    const onMoreInfoClick = async () => {
        
      const note = { imageSrc, title, subject, description, audioSrc, date, noteId }
      
      navigate("/cardMoreInfo", {state: {note: note}});

    }

    const audioPath = `https://kassemnotes.onrender.com/assets/${audioSrc}`
    const picturePath = `https://kassemnotes.onrender.com/assets/${imageSrc}`
    let partialDescription = description.substring(0,30)

    if(partialDescription.length !== description.length){
        partialDescription += '...'
    }

  return (
    <Card className='mt-5 m-2' style={{ width: '19rem' , height:'32rem' }}>
      <Card.Img variant="top" src={picturePath} alt={title} style={{height: '12rem'}}/>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{subject}</Card.Subtitle>
        <Card.Text>Description: {partialDescription}</Card.Text>
        {/* <AudioPlayer src={audioPath} controls style={{width: "280px"}} /> */}
        <Card.Text className="mb-1 text-muted mt-2">created: {date}</Card.Text>
      </Card.Body>
      <Button variant="primary" onClick={onMoreInfoClick}>More Info</Button>
      <Button variant="danger" onClick={() => setShowDeleteModal(true)}>Delete</Button>
      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleConfirm={onDeleteClick}
      />
    </Card>
  );
}

export default MyCard;
