import { Box, Tabs, Tab } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';




export default function InfoIndex(props) {

    const theme = useTheme();

    const tabInfo = [
        {"label": "Introduction", "link": "/ecompress/info", "fontSize": 20, "spacing": 2},
        {"label": "Upload Model", "link": "/ecompress/info/uploadModel", "fontSize": 20, "spacing": 2},
        {"label": "Energy Consumption of Compressing ", "link": "/ecompress/info/uploadModel#compressing", "fontSize": 15, "spacing": 4},
        {"label": "Download Model", "link": "/ecompress/info/downloadModel", "fontSize": 20, "spacing": 2},
        {"label": "Server Read", "link": "/ecompress/info/downloadModel#server-read", "fontSize": 15, "spacing": 4},
        {"label": "Global Network", "link": "/ecompress/info/downloadModel#global-network", "fontSize": 15, "spacing": 4},
        {"label": "User Side", "link": "/ecompress/info/downloadModel#user-side", "fontSize": 15, "spacing": 4},
        {"label": "Storage Model", "link": "/ecompress/info/storageModel", "fontSize": 20, "spacing": 2},
        {"label": "Overall Model", "link": "/ecompress/info/overallModel", "fontSize": 20, "spacing": 2},
    ]

    const pathname = useLocation().pathname;
    const [currentTab, setCurrentTab] = React.useState(tabInfo.findIndex(tab => pathname.startsWith(tab.link)));

    return (
        <Box sx={{width: "75%", padding: "1vh"}}>
            <Tabs 
                value={currentTab}
                orientation='vertical'
                sx={{
                    //color: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': {
                        color: theme.palette.primary,
                        backgroundColor: "rgba(255, 255, 255, 0)"
                    },
                    ['& .MuiTabs-indicator']: {
                        left: 0,
                        width: "4px",
                        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.contrast.main,
                    }
                }}
                //indicatorColor={theme.palette.mode === 'dark' ? 'primary' : 'secondary'}
                textColor={theme.palette.mode === 'dark' ? 'primary' : 'secondary.dark'} 
                onChange={(e, newValue) => setCurrentTab(newValue)}  
            >
                {tabInfo.map((tab, index) => {
                    return (
                        <Tab 
                            label={tab.label}
                            component={Link}
                            to={tab.link}
                            value={index}
                            sx={{
                                color: "rgba(255, 255, 255, 0.8)",
                                '&:hover': {
                                    color: '#ffffff',
                                },
                                '&.Mui-selected': {
                                    color: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.contrast.main,
                                },
                                fontWeight: theme.typography.fontWeightBold,
                                textTransform: 'capitalize',
                                fontSize: theme.typography.pxToRem(tab.fontSize),
                                paddingLeft: theme.spacing(tab.spacing),
                                alignItems: 'flex-start',
                                textAlign: 'left',
                            }}
                        />
                    )
                })}
            </Tabs>
        </Box>
    )
}