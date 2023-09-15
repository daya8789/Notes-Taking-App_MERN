import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import DescriptionIcon from "@mui/icons-material/Description";
import SpatialAudioOffIcon from "@mui/icons-material/SpatialAudioOff";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import dayjs from 'dayjs';
import { noteOperations } from "../services/note-operations";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { MuiColorInput } from 'mui-color-input';
import {useDispatch} from 'react-redux'; 
import {addNote} from "../../../modules/notes/redux/note-sclice";
import { Note } from "../models/note";
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';



export const Add = (props) => {
  const id = useRef();
  const title = useRef();
  const descr = useRef();
  const [dateValue, setDateValue] = useState(null);
  const [colorValue, setColorValue] = useState('#ffffff')
  //const [message, setMessage] = useState(' ');
  const [open, setOpen] = useState(false);


  const dispatch = useDispatch();

  const handleClose = () =>setOpen(false);
  const action =<>
    <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
  </>

  const takeNote = () => {
    console.log("Add Note Here....");
    const idValue = id.current.value;
    const titleValue = title.current.value;
    const descrValue = descr.current.value;
    console.log("id", idValue);
    console.log("title", titleValue);
    console.log("descr", descrValue);
    const date = dateValue ? dayjs(dateValue).format('MM/DD/YYYY') : '';
    const noteObject = new Note(idValue, titleValue, descrValue, date, colorValue);
    dispatch(addNote(noteObject));
    setOpen(true);
   
    // setMessage("Note is Added...");
    // setTimeout(()=>{
    //   setMessage(" ");
    // }, 2000);


    //const noteObject = {'id':idValue, 'title':titleValue, 'descr':descrValue};
    // const noteObject = noteOperations.addNote(idValue, titleValue, descrValue, '', '');
    //noteOperations.addNote(idValue, titleValue, descrValue, date, colorValue);
    //props.fn();
  };
  return (
    <>
      <Box
        sx={{
          margin: 5,
          flexDirection: "column",
          display: "flex",
        }}
      >
        {/* <Typography>
          {message}
        </Typography> */}
        <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Note is Added"
        action={action}
      />
        <TextField
          id="note-id"
          inputRef={id}
          label="id"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DescriptionIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />

        <TextField
          id="note-title"
          label="title"
          inputRef={title}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SpatialAudioOffIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />

        <TextField
          id="note-desc"
          label="Description"
          inputRef={descr}
          multiline
          maxRows={4}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SpatialAudioOffIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              value={dateValue}
              onChange={(selectedDate) => setDateValue(selectedDate)}
            />
          </DemoContainer>
        </LocalizationProvider>

        <MuiColorInput value={colorValue} onChange={(selectedColor)=>setColorValue(selectedColor)} />
        {/* <input type="Date" />
        <input type="Color" /> */}
        <Button onClick={takeNote} variant="contained" color="warning">
          Add Note
        </Button>
      </Box>
    </>
  );
};
