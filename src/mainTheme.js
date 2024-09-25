import { createTheme } from '@mui/material/styles';

const mainTheme = createTheme({
    palette: {
        primary: {
            main: '#1C1C1E', // Dark Charcoal
        },
        secondary: {
            main: '#F2F2F2', // Off-White
        },
        background: {
            default: '#E5E5E5', // Soft Gray for the background
            paper: '#F2F2F2', // Lighter paper background for contrast
        },
        text: {
            primary: '#3A3A3C',  // Dark Gray for main text
            secondary: '#D1D1D1',  // Light Gray for secondary text
        },
    },
    typography: {
        fontFamily: 'Montserrat, Raleway, Arial, sans-serif',
        h1: {
            fontSize: '2.5rem',  // 40px
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
        },
        h2: {
            fontSize: '2rem',    // 32px
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 600,
        },
        h3: {
            fontSize: '1.75rem', // 28px
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 600,
        },
        h4: {
            fontSize: '1.5rem',  // 24px
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 500,
        },
        h5: {
            fontSize: '1.25rem', // 20px
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 500,
        },
        h6: {
            fontSize: '1rem',    // 16px
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 500,
        },
        body1: {
            fontSize: '1rem',    // 16px
            fontFamily: 'Raleway, sans-serif',
        },
        body2: {
            fontSize: '0.875rem', // 14px
            fontFamily: 'Raleway, sans-serif',
        },
        button: {
            fontSize: '0.875rem', // 14px
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 600,
            textTransform: 'uppercase',
        },
        caption: {
            fontSize: '0.75rem', // 12px
            fontFamily: 'Raleway, sans-serif',
        },
    },
});

export default mainTheme;
