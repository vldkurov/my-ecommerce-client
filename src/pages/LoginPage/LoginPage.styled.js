import styled from '@emotion/styled';
import {Button, Paper, TextField} from '@mui/material';

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


export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 10px; // Space between buttons
`;


export const GoogleButton = styled(Button)(({theme}) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '10px',
    width: '225px',
}));

export const FacebookButton = styled(Button)(({theme}) => ({
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
    },
    '&.Mui-disabled': {
        backgroundColor: '#ddd',
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '10px',
    width: '225px',
}));
