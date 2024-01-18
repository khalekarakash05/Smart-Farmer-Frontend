import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setFiles, incrementViewCount } from './slices/fileSlice';

export const fetchFiles = createAsyncThunk('files/fetchFiles', async () => {
  try {
    const response = await axios.get('http://localhost:4000/api/v1/fetchImages');
    // console.log(response);
    return response.data.data;
  } catch (error) {
    // Handle error if needed
    console.error('Error fetching files:', error);
    throw error;
  }
});

export const incrementViewCountAsync = createAsyncThunk('files/incrementViewCountAsync', async (fileId, thunkAPI) => {
  try {
    const response = await axios.post(`http://localhost:4000/api/v1/view/${fileId}`);
    thunkAPI.dispatch(incrementViewCount(fileId)); // Dispatch the sync action to update the state
    return response.data.views;
  } catch (error) {
    // Handle error if needed
    console.error('Error incrementing view count:', error);
    throw error;
  }
});
