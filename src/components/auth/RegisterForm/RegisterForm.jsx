import {useFormik} from "formik";
import * as Yup from "yup";
import {ErrorMessage, FormContainer, StyledTextField} from "./RegisterForm.styled";
import {Button} from "@mui/material";
import React from "react";

const RegisterForm = ({onSubmit}) => {
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

        onSubmit: values => {
            onSubmit(values);
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

        </FormContainer>
    )
        ;
}

export default RegisterForm
