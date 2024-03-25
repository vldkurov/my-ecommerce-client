import styled from '@emotion/styled';
import {AppBar, Button, Toolbar} from '@mui/material';

export const StyledAppBar = styled(AppBar)`
    margin-bottom: 20px;
`;

export const StyledToolbar = styled(Toolbar)`
    justify-content: space-between;
`;

// Updated StyledNavLink to correctly filter out the `$isactive` prop
export const StyledNavLink = styled(Button, {
    shouldForwardProp: (prop) => !['$isactive'].includes(prop),
})(({$isactive, theme}) => ({
    color: 'white !important', // Ensure text color is white
    textDecoration: 'none',
    marginRight: '20px', // Adds some spacing between the nav links
    border: $isactive ? '1px solid white' : 'none', // Apply border based on $isactive
}));
