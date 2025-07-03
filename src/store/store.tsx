import { configureStore } from "@reduxjs/toolkit";
import videoSlicer from "../slicers/video-slicer"; 

export default configureStore({
    reducer: videoSlicer
})