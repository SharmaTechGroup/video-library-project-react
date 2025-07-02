import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";


export function UserLogin(){


    const [cookies, setCookie, removeCookie] = useCookies(['userid']);

    let navigate = useNavigate();
    
    const formik = useFormik({
        initialValues: {
            user_id: '',
            password: ''
        },
        onSubmit :(user)=>{
            axios.get(`http://127.0.0.1:5050/get-users`)
            .then(response => {
                 let result = response.data.find((item:any) => item.user_id===user.user_id);
                 console.log(result);
                 if(result){
                      if(result.password===user.password){
                          setCookie('userid', user.user_id);
                          navigate('/user-dashboard');
                      } else {
                          alert(`Invalid Password`);
                      }
                 } else {
                    navigate('/user-login-error');
                 }
            })
        }
    })

    return(
        <div>
            <h2>User Login</h2>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" name="user_id" onChange={formik.handleChange} /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="password" onChange={formik.handleChange} /></dd>
                </dl>
                <button type="submit" className="btn btn-warning">Login</button>
            </form>
            <div className="mt-3">
                <Link to="/user-register"> Create New Account </Link>
            </div>
        </div>
    )
}