import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import LoginForm from "../../components/auth/LoginForm/LoginForm";
import {login} from '../../features/auth/authOperations'

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const onLogin = (values) => {
        dispatch(login(values))
            .unwrap()
            .then(() => {
                navigate('/'); // Navigate on successful LoginPage
            })
            .catch((error) => {
                console.error('Login failed:', error);
                // Optionally set an error state here to inform the user
            });
    }

    return (
        <>
            <LoginForm onSubmit={onLogin}/>
            <div>
                <button onClick={() => window.location.href = '/auth/google'}>Login with Google</button>
                <button onClick={() => window.location.href = '/auth/facebook'}>Login with Facebook</button>
            </div>
            <p>
                Don't have an account? <a href="/register">Register</a>
            </p>
        </>)

};

export default LoginPage;
