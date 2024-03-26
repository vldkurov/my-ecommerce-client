import {useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import React from "react";
import RegisterForm from "../../components/auth/RegisterForm/RegisterForm";
import {register} from '../../features/auth/authOperations'

const RegisterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onRegister = (values) => {
        dispatch(register(values))
            .unwrap()
            .then(() => {
                navigate('/');
            })
            .catch((rejectedValueOrSerializedError) => {
                console.error('Registration failed:', rejectedValueOrSerializedError);
            });
    }

    return (
        <>
            <RegisterForm onSubmit={onRegister}/>
            <p>
                Already have an account? <a href="/login">Log in</a>
            </p>
        </>
    )
};

export default RegisterPage;
