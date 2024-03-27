import styled from '@emotion/styled';
import {Paper, TextField} from '@mui/material';

export const FormContainer = styled(Paper)`
    max-width: 400px;
    margin: 40px auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
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
