import styled from '@emotion/styled';
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from '@mui/material';
import {Link} from 'react-router-dom';

export const StyledCard = styled(Card)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
});

export const StyledCardActionArea = styled(Link)({
    textDecoration: 'none',
});

export const StyledCardMedia = styled(CardMedia)({
    height: '140px',
    // border: '1px solid #ddd',
    objectFit: 'contain',
});

export const StyledCardContent = styled(CardContent)({
    flexGrow: 1,
});

export const StyledTypographyTitle = styled(Typography)({
    // Add specific styles if needed
    color: '#333',
});

export const StyledTypographyDescription = styled(Typography)({
    // Add specific styles if needed
});

export const StyledCardActions = styled(CardActions)({
    justifyContent: 'flex-end',
});

export const StyledButton = styled(Button)({
    // Add specific styles if needed
});
