import {useFormik} from "formik";
import * as Yup from "yup";
import {ErrorMessage, FormContainer, StyledTextField} from "../../../pages/LoginPage/LoginPage.styled";
import {Button} from "@mui/material";
import React from "react";

const LoginForm = ({onSubmit}) => {
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
            onSubmit(values);
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
}

export default LoginForm
