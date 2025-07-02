import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type  {CategoryContract}  from "../contracts/CategoryContract";
import type { VideoContract } from "../contracts/VideoContract";


export function DeleteVideo(){
    const [categories, setCategories] = useState<CategoryContract[]>();

        const [videos, setVideos] = useState<VideoContract[]>([{video_id:0, title:'', description:'', url:'', comments:'', views:0, likes:0, category_id:0}]);

        let navigate = useNavigate();

        let params = useParams();

        const formik = useFormik({
            initialValues: {
                video_id : videos[0].video_id,
                title: videos[0].title,
                description: videos[0].description,
                comments:videos[0].comments,
                likes:videos[0].likes,
                views:videos[0].views,
                url:videos[0].url,
                category_id:videos[0].category_id
            },
            onSubmit : (video) => {
                axios.put(`http://127.0.0.1:5050/edit-video/${params.id}`, video)
                .then(()=>{
                    console.log('modified');
                })
                alert('Video Modified Successfully.');
                navigate('/admin-dashboard');
            },
            enableReinitialize: true
        })

        function LoadCategories(){
            axios.get(`http://127.0.0.1:5050/get-categories`)
            .then(response=> {
                 response.data.unshift({category_id:-1, category_name:'Select Category'});
                 setCategories(response.data);
            })
        }


        function LoadVideos(){
            axios.get(`http://127.0.0.1:5050/get-video/${params.id}`)
            .then(response =>{ 
                setVideos(response.data);
            })
        }

    
        useEffect(()=>{
            LoadCategories();
            LoadVideos();
        },[])

        function handleDeleteClick(){
            axios.delete(`http://127.0.0.1:5050/delete-video/${params.id}`)
            .then(()=>{
                console.log('deleted');
            })
            alert('Video Deleted');
            navigate('/admin-dashboard');
        }
    
    return(
        <div>
            <h2>Delete Video</h2>
            <h4>Are you sure?</h4>
            <dl>
                <dt>Title</dt>
                <dd>{videos[0].title}</dd>
                <dt>Preview</dt>
                <dd>
                    <iframe src={videos[0].url} width={300} height={200}></iframe>
                </dd>
            </dl>
            <button onClick={handleDeleteClick} className="btn btn-danger">Yes</button>
            <Link to="/admin-dashboard" className="btn btn-warning mx-2">No</Link>
        </div>
    )
}