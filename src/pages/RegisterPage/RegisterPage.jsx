import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
// import {useNavigate} from 'react-router-dom';
// import {useDispatch} from "react-redux";
import {Button} from '@mui/material';
import {ErrorMessage, FormContainer, StyledTextField} from './RegisterPage.styled';
// import {registerUser} from "../../../features/auth/registerUser";

const RegisterPage = () => {
    // const navigate = useNavigate();
    // const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
        }),
        onSubmit: (values) => {
            // dispatch(registerUser(values))
            //     .unwrap()
            //     .then((resolvedData) => {
            //         navigate('/');
            //     })
            //     .catch((rejectedValueOrSerializedError) => {
            //         console.error('Registration failed:', rejectedValueOrSerializedError);
            //     });
        },
    });

    return (
        <FormContainer>
            <form onSubmit={formik.handleSubmit}>
                <StyledTextField
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                />
                <StyledTextField
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                />
                <StyledTextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <StyledTextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />

                {formik.errors.submit && (
                    <ErrorMessage>{formik.errors.submit}</ErrorMessage>
                )}

                <Button color="primary" variant="contained" type="submit">Register</Button>
            </form>
            <p>
                Already have an account? <a href="/login">Log in</a>
            </p>
        </FormContainer>
    );
};

export default RegisterPage;
