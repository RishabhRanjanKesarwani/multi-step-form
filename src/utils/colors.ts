import { blue, green, grey, red } from "@mui/material/colors";

const COLORS = {
    primary: {
        light: red[100],
        medium: red[200],
        dark: red[500],
    },
    secondary: {
        lightest: grey[50],
        light: grey[200],
        medium: grey[300],
        dark: grey[600],
        darkest: grey[700]
    },
    success: {
        light: green[100],
        dark: green[300],
    },
    action: {
        light: 'rgba(25, 118, 210, 0.04)',
        dark: blue[700],
    },
    white: '#ffffff',
    black: '#000000',
};

export default COLORS;