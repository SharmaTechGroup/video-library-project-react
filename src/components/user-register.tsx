
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function UserRegister(){

    const [userMsg, setUserMsg] = useState('');
    const [userColor, setUserColor] = useState('');
    let navigate = useNavigate();

    const formik = useFormik({
         initialValues: {
            user_id : '',
            user_name: '',
            password: '',
            email: '',
            mobile:''
         },
         onSubmit : (user) => {
             axios.post(`http://127.0.0.1:5050/register-user`, user)
             .then(()=>{
               console.log(`Registered`);
             })
             alert('Registered');
             navigate('/user-login');
         }
    })

    function VerifyUser(e:any){
        axios.get(`http://127.0.0.1:5050/get-users`)
        .then(response=> {
             for(var user of response.data){
                  if(user.user_id===e.target.value){
                      setUserMsg('User Id Taken - Try Another');
                      setUserColor('text-danger');
                      break;
                  } else {
                      setUserMsg('User Id Available');
                      setUserColor('text-success');
                  }
             }
        })
    }
    function handleOnBlur(){
        setUserMsg('');
    }

    return(
        <div>
            <h2>Register User</h2>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" onBlur={handleOnBlur} onKeyUp={VerifyUser} onChange={formik.handleChange} name="user_id" /></dd>
                    <dd className={userColor}>{userMsg}</dd>
                    <dt>User Name</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="user_name" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" onChange={formik.handleChange} name="password" /></dd>
                    <dt>Email</dt>
                    <dd><input type="email" onChange={formik.handleChange} name="email" /></dd>
                    <dt>Mobile</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="mobile" /></dd>
                </dl>
                <button type="submit" className="btn btn-primary">Register</button>
                <div className="mt-3">
                    <Link to="/user-login"> Existing User? </Link>
                </div>
            </form>
        </div>
    )
}