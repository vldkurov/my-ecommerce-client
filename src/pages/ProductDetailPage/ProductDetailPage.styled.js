import styled from '@emotion/styled';
import {Button, CardActions} from '@mui/material';

export const BackButton = styled(Button)({
    // Adjusted to match the "View Details" button, or directly copy the styles
    backgroundColor: '#007bff', // Primary color
    color: '#fff', // Text color
    '&:hover': {
        backgroundColor: '#0056b3', // Darker shade on hover
    },
    // Add any other styles to match the "View Details" button
});

export const StyledCardActions = styled(CardActions)({
    justifyContent: 'flex-end',
});

export const StyledButton = styled(Button)({
    // Add specific styles if needed
});

