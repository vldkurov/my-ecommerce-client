import React from 'react';
// import {useDispatch} from 'react-redux';
import {useFormik} from 'formik';
import * as Yup from 'yup';
// import {useNavigate} from 'react-router-dom';
import {Button} from '@mui/material';
import {ErrorMessage, FormContainer, StyledTextField} from './LoginPage.styled';
// import {loginUser} from "../../../features/auth/loginUser";

const LoginPage = () => {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: (values) => {
            // dispatch(loginUser(values))
            //     .unwrap()
            //     .then(() => {
            //         navigate('/'); // Navigate on successful LoginPage
            //     })
            //     .catch((error) => {
            //         console.error('Login failed:', error);
            //         // Optionally set an error state here to inform the user
            //     });
        },
    });

    return (
        <FormContainer elevation={3}>
            <form onSubmit={formik.handleSubmit}>
                <StyledTextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />

                {formik.errors.submit && (
                    <ErrorMessage>{formik.errors.submit}</ErrorMessage>
                )}

                <Button color="primary" variant="contained" type="submit">Login</Button>
            </form>
        </FormContainer>
    );
};

export default LoginPage;
