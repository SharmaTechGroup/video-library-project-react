import axios from "axios"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"

export function AdminLogin(){

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            admin_id : '',
            password: ''
        },
        onSubmit : (admin:any)=>{
             axios.get(`http://127.0.0.1:5050/get-admin`)
             .then(response=> {
                 let result = response.data.find((item:any)=> item.admin_id===admin.admin_id);
                 if(result){
                     if(result.password===admin.password) {
                         navigate('/admin-dashboard');
                     } else {
                        alert('Invalid Password');
                     }
                 } else {
                    alert(`Admin Doesn't Exist`);
                 }
             })
        }
    })

    return(
        <div>
            <h2>Admin Login</h2>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Admin Id</dt>
                    <dd><input type="text" name="admin_id" onChange={formik.handleChange}/></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="password" onChange={formik.handleChange} /></dd>
                </dl>
                <button type="submit" className="btn btn-warning">Login</button>
            </form>
        </div>
    )
}