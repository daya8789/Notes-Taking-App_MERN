import { useState } from 'react';
import { Header } from '../../../shared/components/Header.jsx';
import { Add } from '../components/Add';
import { List } from '../components/List';
import Container from '@mui/material/Container';
import { noteOperations } from '../services/note-operations.js';

export const NotePage = () =>{
    //console.log("Note Page call...");
    const [notes, setNotes] = useState([]);
    const collectNoteData = ()=>{
       // const arrayNote = noteOperations.getNotes();
       // console.log(arrayNote);
        setNotes([...noteOperations.getNotes()]);
        //console.log("Receive data from add", noteObject);
    }
    return(
        <Container fixed >
            <Header/>
            <Add fn={collectNoteData}/>
            <List note={notes}/>
        </Container>
    );
}