import React from 'react';
import {
    StyledButton,
    StyledCard,
    StyledCardActionArea,
    StyledCardActions,
    StyledCardContent,
    StyledCardMedia,
    StyledTypographyDescription,
    StyledTypographyTitle,
} from './ProductCard.styled';
import {Link} from "react-router-dom";

const ProductCard = ({product}) => {
    const placeholderImage = '/path-to-default-image.jpg';

    return (
        <StyledCard>
            <StyledCardActionArea to={`/products/${product.productId}`}>
                <StyledCardMedia
                    component="img"
                    image={product.imageUrl || placeholderImage}
                    alt={product.name}
                />
                <StyledCardContent>
                    <StyledTypographyTitle variant="h5" component="div" noWrap>
                        {product.name}
                    </StyledTypographyTitle>
                    <StyledTypographyDescription variant="body2" color="text.secondary">
                        {product.description}
                    </StyledTypographyDescription>
                </StyledCardContent>
            </StyledCardActionArea>
            <StyledCardActions>
                <StyledButton size="small" component={Link} to={`/products/${product.productId}`}>
                    View Details
                </StyledButton>
            </StyledCardActions>
        </StyledCard>
    );
};

export default ProductCard;
