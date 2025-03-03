import { green, grey, lightGreen, purple } from '@mui/material/colors';

const Theme = (mode) => ({
    palette: {
        mode,
        primary: {
            main: green[500],
            contrastText: '#fff',
        },
        ...(mode === 'light' ?
            {
                main: green[700],
                text: {
                    primary: grey[900],
                    secondary: grey[800],
                    contrast: purple[500]
                },
                secondary: {
                    main: lightGreen[300],
                    dark: green[900],
                },
                button: {
                    main: green[600],
                    dark: green[700],
                    light: green[300],
                    contrastText: '#fff',
                },
                info: {
                    main: "#af4cac"
                },
                divider: green[200],
                contrast: {
                    main: '#af4cac', //#af4cac
                }
            }
            :
            {
                main: green[300],
                secondary: {
                    main: green[900],
                    dark: green[900],
                },
                divider: green[200],
                background: {
                    default: '#121212',
                    paper: '#121212',
                },
                text: {
                    primary: '#fff',
                    secondary: grey[500],
                },
                info: {
                    main: "#af4cac"
                },
                contrast: {
                    main: '#af4cac', //#af4cac
                }
            }
        )
    },
    
});

export { Theme };