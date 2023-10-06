import React, { useContext, useEffect, useState } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap';
import MyCard from '../components/CardLayout'
import axios from 'axios'
import { UserContext } from '../userContext'
import LoadingComponent from '../components/Loading'
import NoNotes from '../components/NoNotes'

const Home = () => {

  const {UserInfo} = useContext(UserContext)
  const [notes,setNotes] = useState()

  const username = UserInfo?.username
  const fetching = UserInfo?.fetching

  const [options, setOptions] = useState([
    'Default',
    'Date',
    'Title',
  ]);
  const [selectedOption, setSelectedOption] = useState('Select an Sort Option');
  // const [newOption, setNewOption] = useState('');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  // const handleAddOption = () => {
  //   if (newOption.trim() !== '') {
  //     setOptions([...options, newOption]);
  //     setNewOption('');
  //   }
  // };

  useEffect(() => {

    axios.get(`http://localhost:3500/notes/getNotes/${username}/${selectedOption}`, {withCredentials: true}).then(res => {
      setNotes(res.data.notes)
    }).catch(err => alert(err.message))

  }, [fetching, selectedOption])

  if(fetching && notes){

    if(notes.length === 0){
      return (
        <NoNotes/>
      )
    }

    notes.map((note) => {
      
      const subject = note.subject
      if(!options.includes(subject)){
        setOptions([...options, subject]);
      }

    } )

    return (
      <div>

        <h1 style={{margin: '2rem auto', maxWidth: '270px', textAlign: 'center'}}>Home Page</h1>

    <div className="container mt-4" style={{width: '81rem', maxWidth: '120rem'}}>
      <DropdownButton id="dropdown-basic-button" title={selectedOption}>
        {options.map((option, index) => (
          <Dropdown.Item
            key={index}
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </Dropdown.Item>
        ))}
      </DropdownButton>

      {/* <Form className="mt-3">
        <Form.Group>
          <Form.Label>Add a Custom Sort Option:</Form.Label>
          <Form.Control
            type="text"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            placeholder="Enter custom option"
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddOption} className='mt-1'>
          Add Option
        </Button>
      </Form> */}

    </div>


        <div  className="d-flex flex-wrap" style={{ margin: '0 auto', maxWidth: '80rem'}}>

          {notes.map((card) => (
          <div key={card._id}>

            <MyCard
            imageSrc = {card.notePicturePath}
            title = {card.title}
            subject= {card.subject}
            description= {card.description}
            audioSrc= {card.noteAudioPath}
            date= {card.createdAt}
            noteId = {card._id}
            />

          </div>
          ))}
    
        </div>
      </div>
    )
  }else if(!notes && username){
      return(
        <LoadingComponent/>
      )
  }else{
    return(
      <NoNotes/>
    )
  }
  
}
  

export default Home