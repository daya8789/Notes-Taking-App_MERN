import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import { noteOperations } from '../services/note-operations';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, getTotalRecords, searchNote, sortNote } from '../redux/note-sclice';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { apiClient } from '../../../shared/services/api-client';

export const List = (props) => {

  const [sort, setSort] = useState();

  const dispatch = useDispatch();
    const notesObject = useSelector(state=>{
      return {'notes':state.noteSlice.notes, 'total':state.noteSlice.total, 'results':state.noteSlice['search-result'], 'isLoading':state.noteSlice.isLoading};
    })

    useEffect(()=>{
      dispatch(getTotalRecords());
      dispatch(fetchNotes());
      // const promise = apiClient.read();
      // promise.then(result=>{
      //   console.log("Result is :::::::", result);
      // }).catch(err=>{
      //   console.log("Error is....", err);
      // })
    }, []);

    const takeSearchValue = (event) =>{
      const searchValue = event.target.value;
      const searchData = {search : searchValue};
      dispatch(searchNote(searchData));
    }
    
    const sortIt = (event) =>{
      const sortBy = event.target.value;
      setSort(sortBy);
      dispatch(sortNote({sortBy}));

    }
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));


  return (
    <div>
      <h1>Total Records : {notesObject.total}</h1>
      {notesObject.isLoading?<p>Loading....</p>:<p>Data Comes...</p>}
      <TextField onChange={takeSearchValue} label="Search By Title" variant="outlined" />
      <br />
      <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          label="Sort"
          onChange={sortIt}
        >
          <MenuItem value="id">By id</MenuItem>
          <MenuItem value="title">By title</MenuItem>
          <MenuItem value="descr">By descr</MenuItem>
        </Select>
      {/* {props.note.id} {props.note.title} {props.note.descr} */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">id</StyledTableCell>
              <StyledTableCell align="left">title</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="left">cdate</StyledTableCell>
              <StyledTableCell align="right">importance</StyledTableCell>
              <StyledTableCell align="right">Operations</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notesObject.results.length>0 && notesObject.results.map(note=>{
              return (<TableRow>
                <TableCell align="right">{note.id}</TableCell>
                <TableCell align="left">{note.title}</TableCell>
                <TableCell align="left">{note.descr}</TableCell>
                <TableCell align="left">{note.cdate}</TableCell>
                <TableCell align="right">{note.importance}</TableCell>
                <TableCell align="right"><DeleteIcon/> <EditIcon/></TableCell>
             </TableRow>);
            })}
            {notesObject.results.length==0 && notesObject.notes.map(note=>{
                 return (<TableRow>
                    <TableCell align="right">{note.id}</TableCell>
                    <TableCell align="left">{note.title}</TableCell>
                    <TableCell align="left">{note.descr}</TableCell>
                    <TableCell align="left">{note.cdate}</TableCell>
                    <TableCell align="right">{note.importance}</TableCell>
                    <TableCell align="right"><DeleteIcon/> <EditIcon/></TableCell>
                 </TableRow>);
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
