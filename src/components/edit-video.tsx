import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type  {CategoryContract}  from "../contracts/CategoryContract";
import type { VideoContract } from "../contracts/VideoContract";

export function EditVideo(){

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
    
    return(
        <div>
            <h2>Edit Video</h2>
             <form onSubmit={formik.handleSubmit}>
                <dl className="row">
                    <dt className="col-2">Video Id</dt>
                    <dd className="col-10"><input type="number" value={formik.values.video_id} name="video_id" onChange={formik.handleChange} /></dd>
                    <dt className="col-2">Title</dt>
                    <dd className="col-10"><input type="text" value={formik.values.title} name="title" onChange={formik.handleChange} /></dd>
                    <dt className="col-2">Description</dt>
                    <dd className="col-10"><input type="text" value={formik.values.description} name="description" onChange={formik.handleChange} /></dd>
                    <dt className="col-2">Comments</dt>
                    <dd className="col-10"><input type="text" value={formik.values.comments}  name="comments" onChange={formik.handleChange} /></dd>
                    <dt className="col-2">Url</dt>
                    <dd className="col-10"><input type="text" value={formik.values.url}  name="url" onChange={formik.handleChange} /></dd>
                    <dt className="col-2">Likes</dt>
                    <dd className="col-10"><input type="number" value={formik.values.likes}  name="likes" onChange={formik.handleChange} /></dd>
                    <dt className="col-2">Views</dt>
                    <dd className="col-10"><input type="number" value={formik.values.views}  name="views" onChange={formik.handleChange} /></dd>
                    <dt className="col-2">Category</dt>
                    <dd className="col-10">
                        <select name="category_id" value={formik.values.category_id} onChange={formik.handleChange}>
                            {
                                categories?.map(category=>
                                    <option key={category.category_id} value={category.category_id}> {category.category_name} </option>
                                )
                            }
                        </select>
                    </dd>
                </dl>
                <button type="submit" className="btn btn-success mx-2">Save</button>
                <Link to='/admin-dashboard' className="btn btn-danger">Cancel</Link>
             </form>
        </div>
    )
}