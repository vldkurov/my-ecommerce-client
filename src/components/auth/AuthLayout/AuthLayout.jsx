import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {check} from "../../../features/auth/authOperations";

const AuthLayout = ({children}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(check());
    }, [dispatch]);

    return children;
}

export default AuthLayout;
