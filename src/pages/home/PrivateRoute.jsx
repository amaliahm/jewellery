import { Navigate, Outlet } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase";

const PrivateRoute = () => {
    const user = getAuth(app);
    let auth = user.currentUser == null ? false : true
    return (
        auth ? <Outlet /> : <Navigate to='/'/>
    )
}

export default PrivateRoute