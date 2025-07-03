import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";
import type { VideoContract } from "../contracts/VideoContract";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToSaveList } from "../slicers/video-slicer";
import store from "../store/store";


export function UserDashBoard(){

    const [cookies, setCookie, removeCookie] = useCookies(['userid']);
    const [videos, setVideos] = useState<VideoContract[]>();

    let navigate = useNavigate();

    let dispatch = useDispatch();

    function LoadVideos(){
        axios.get(`http://127.0.0.1:5050/get-videos`)
        .then(response=>{
            setVideos(response.data);
        })
    }

    useEffect(()=>{
         if(cookies['userid']===undefined) {
              navigate('/user-login');
         } else {
            LoadVideos();
         }
    },[])


    function handleSignout(){
        removeCookie('userid');
        navigate('/');
    }

    function handleSaveClick(video:VideoContract){
        dispatch(addToSaveList(video));
    }

    return(
        <div>
            <header className="d-flex justify-content-between">
                <h2>{cookies['userid']} - Dashboard</h2>
                <button onClick={handleSignout} className="btn btn-link">Signout</button>
                
            </header>
            <section className="mt-4 d-flex flex-wrap">
                {
                    videos?.map(video=> 
                        <div key={video.video_id} className="card m-2 p-1" style={{width:'250px'}}>
                            <iframe src={video.url} height="200"></iframe>
                            <div className="card-header">
                                <h3>{video.title}</h3>
                            </div>
                            <div className="card-body">
                                {video.description}
                            </div>
                            <div className="card-footer">
                                <span className="bi bi-hand-thumbs-up"> {video.likes} </span>
                                <span className="bi bi-eye mx-2"> {video.views} </span>
                                <button onClick={()=>{ handleSaveClick(video) }} className="btn btn-success bi bi-floppy"></button>
                            </div>
                        </div>
                    )
                }
            </section>
        </div>
    )
}