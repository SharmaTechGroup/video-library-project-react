import { Link } from "react-router-dom";


export function UserLoginError(){
    return(
        <div className="text-danger">
            <h2> User Doesn't Exist </h2>
            <Link to="/user-login">Try Again</Link>
        </div>
    )
}