import {configureStore} from '@reduxjs/toolkit'
import noteSlice from '../../modules/notes/redux/note-sclice';

export default configureStore({
    reducer:{
        'noteSlice':noteSlice
    }
});