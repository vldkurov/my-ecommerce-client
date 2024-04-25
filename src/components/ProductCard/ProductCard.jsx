import React from 'react';
import {Box, Card, CardContent, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import {StyledButton, StyledCardActions} from './ProductCard.styled';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const ProductCard = ({product}) => {
    const {
        // imageUrl,
        name,
        description,
        price,
        category
    } = product;
    // const placeholderImage = '/path-to-default-image.jpg';

    return (
        <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            {/*<CardMedia*/}
            {/*    component="img"*/}
            {/*    image={placeholderImage}*/}
            {/*    alt={name}*/}
            {/*    sx={{height: 140, objectFit: 'cover'}}*/}
            {/*/>*/}
            <Box sx={{
                height: 140,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'primary.main',
                color: 'common.white'
            }}>
                <PhotoCameraIcon fontSize="large"/> {/* Добавление иконки */}
            </Box>
            <CardContent sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Typography gutterBottom variant="h5" component="div" sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: '100%', // Ensures it doesn't exceed the card width
                }}>
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3, // Limit text to 3 lines
                    WebkitBoxOrient: 'vertical',
                    height: '64px', // Fixed height for 3 lines of text
                    mb: 2
                }}>
                    {description}
                </Typography>
                <Typography variant="body2" color="text.primary" sx={{mb: 1}}>
                    Price: {price}
                </Typography>
                <Typography variant="subtitle1" color="text.primary" sx={{mb: 1}}>
                    Category: {category?.name || 'No Category'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2, // Adjust based on your needs
                    WebkitBoxOrient: 'vertical',
                    height: '38px', // Fixed height for 2 lines of text
                }}>
                    {category?.description || 'No Description'}
                </Typography>
            </CardContent>
            <StyledCardActions>
                <StyledButton size="small" component={Link} to={`/products/${product.productId}`}>
                    View Details
                </StyledButton>
            </StyledCardActions>
        </Card>
    );
};

export default ProductCard;








