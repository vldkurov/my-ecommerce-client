import styled from '@emotion/styled';
import {AppBar, Button, Toolbar} from '@mui/material';


export const StyledAppBar = styled(AppBar)`
    position: fixed; // This line fixes the AppBar at the top
    top: 0; // Ensures it sticks to the top of the viewport
    left: 0; // Aligns it to the left of the viewport
    right: 0; // Ensures it stretches across the full width of the viewport
    margin-bottom: 20px;
    z-index: 1100; // Sets a high z-index to ensure it stays on top of other content
`;


export const StyledToolbar = styled(Toolbar)`
    justify-content: space-between;
`;

// Updated StyledNavLink to correctly filter out the `$isactive` prop
export const StyledNavLink = styled(Button, {
    shouldForwardProp: (prop) => !['$isactive'].includes(prop),
})(({$isactive}) => ({
    color: 'white !important', // Ensure text color is white
    textDecoration: 'none',
    marginRight: '20px', // Adds some spacing between the nav links
    border: $isactive ? '1px solid white' : 'none', // Apply border based on $isactive
}));

export const StyledCategoryButton = styled(Button, {
    shouldForwardProp: (prop) => !['$isactive'].includes(prop),
})(({$isactive}) => ({
    color: 'white !important', // Ensure text color is white
    textDecoration: 'none',
    marginRight: '20px', // Adds some spacing between the nav links
    border: $isactive ? '1px solid white' : 'none', // Apply border based on $isactive
    // Add any other styling to match StyledNavLink
}));
