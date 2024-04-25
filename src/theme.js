import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#4285F4', // Google blue
            contrastText: '#ffffff'
        },
        secondary: {
            main: '#3B5998', // Facebook blue
            contrastText: '#ffffff'
        },
        placeholder: {
            main: '#d3d3d3', // Light gray for placeholder
            contrastText: '#ffffff'
        }
    },
});

export default theme;
