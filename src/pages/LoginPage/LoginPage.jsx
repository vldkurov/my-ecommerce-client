import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import LoginForm from "../../components/auth/LoginForm/LoginForm";
import {login} from '../../features/auth/authOperations'
import {ButtonContainer, FacebookButton, GoogleButton} from "./LoginPage.styled";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

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
            <ButtonContainer>
                <GoogleButton onClick={() => window.location.href = 'http://localhost:3030/api/users/auth/google'}>
                    <GoogleIcon/>
                    Login with Google
                </GoogleButton>
                <FacebookButton onClick={() => window.location.href = '/auth/facebook'} disabled>
                    <FacebookIcon/>
                    Login with Facebook
                </FacebookButton>
            </ButtonContainer>
            <p>
                Don't have an account? <a href="/register">Register</a>
            </p>
        </>)

};

export default LoginPage;
