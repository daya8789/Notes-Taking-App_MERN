import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { apiClient } from "../../../shared/services/api-client";

 export const fetchNotes = createAsyncThunk('notes/fetch',async()=>{
  try{
  const response = await apiClient.read();
  console.log('Response is ', response);
  return response;
  }
  catch(err){
    console.log('err is ::: ', err);
    throw err;
  }
})

const noteSlice = createSlice({
  name: "noteslice",
  initialState: { notes: [], 'total':0, 'search-result':[], isLoading:false, err:null},
  reducers: {
    addNote(state, action) {
      const noteObject = action.payload;
      state.notes.push(noteObject);
    },
    getTotalRecords(state, action){
        state.total = state.notes.length
    },
    searchNote(state, action) {
      const searchObj = action.payload;
      console.log('Search Obj', searchObj);
      state['search-result'] = state.notes.filter(note=>note.title.includes(searchObj.search));
    },
    sortNote(state, action) {
      const sortObject = action.payload;
      const key = sortObject.sortBy;
      state.notes.sort((first, second)=>{
        if(key === 'id'){
          return first[key] - second[key];
        }
        else{
          return first[key].localeCompare(second[key]);
        }
      });
    },
  },
  extraReducers:(builder)=>{
    // async operations
    builder.addCase(fetchNotes.pending, (state, action)=>{
      state.isLoading = true;
    })
    .addCase(fetchNotes.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.notes = action.payload;
    }).addCase(fetchNotes.rejected, (state, action)=>{
      state.isLoading = false;
      state.notes = [];
      state.err = action.payload;
    })
  }
});
export const { addNote, getNote, sortNote, getTotalRecords, searchNote} = noteSlice.actions;
export default noteSlice.reducer;
