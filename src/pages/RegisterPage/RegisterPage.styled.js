import styled from '@emotion/styled';
import {TextField} from "@mui/material";

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    gap: 20px; /* Adjust gap between form fields */
`;

export const StyledTextField = styled(TextField)`
    && {
        margin-bottom: 5px;
    }
`;

export const ErrorMessage = styled.div`
    color: red;
    font-size: 0.8rem;
    margin-top: -10px;
    margin-bottom: 10px;
`;
