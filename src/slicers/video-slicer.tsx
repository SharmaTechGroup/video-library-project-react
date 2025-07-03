import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     videos: [],
     videosCount: 0
}

const videoSlice = createSlice({
    name: 'videos', 
    initialState,
    reducers: {
         addToSaveList : (state:any, action) =>{
             state.videos.push(action.payload);
             state.videosCount = state.videos.length;
         }
    }
});
export const { addToSaveList } = videoSlice.actions;
export default videoSlice.reducer;

