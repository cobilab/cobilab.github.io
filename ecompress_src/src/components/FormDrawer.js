import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Form from './form.js';
import { Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import InfoIndex from './InfoIndex.js';
 

export default function FormDrawer(props) {

    const [drawerWidth, setDrawerWidth] = React.useState("66%");
    const theme = useTheme();

    const location = useLocation();

    const transition = theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    });

    
    React.useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.innerWidth < 900) {
                setDrawerWidth("100%");
            }
            else {
                if (location.pathname.startsWith('/info')) {
                    setDrawerWidth("16.6%");
                }
                else {
                    setDrawerWidth("66%");
                }
            }
        });
    }, []);
    
    React.useEffect(() => {
        if (window.innerWidth < 900) {
            return;
        }


        if (location.pathname.startsWith('/info')) {
            setDrawerWidth("16.6%");
        }
        else {
            setDrawerWidth("66%");
        }
    }, [location]);

    return (
        <Drawer
            anchor="right"
            open={props.open}
            variant='persistent'
            position='fixed'
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                transition: "width 0.375s !important",
                [`& .MuiDrawer-paper`]: { 
                    width: drawerWidth, 
                    transition: "width 0.375s !important",
                    boxSizing: 'border-box',
                    backgroundColor: theme.palette.mode === "dark" ? "default" : theme.palette.primary.main
                },
                
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                { location.pathname.startsWith('/info') ?
                    <InfoIndex setInfoPageSection={props.setInfoPageSection}/>
                    :
                    <Form onFill={props.fillForm}/>
                }
                
            </Box>
        </Drawer>
    );
}