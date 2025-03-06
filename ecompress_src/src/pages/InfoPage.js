import React from 'react';
import { Box, Grid, Toolbar } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';


export default function InfoPage(props) {

    const location = useLocation();

    React.useEffect(() => {
        const hash = location.hash
        let position = 0;
        if (hash) {
            console.log("HASH", hash)
            const elementToScroll = document.getElementById(hash.slice(1));
            const offset = document.getElementById("navbar").offsetHeight;
            const elementPosition = elementToScroll.getBoundingClientRect().top;
            position = elementPosition + window.scrollY - offset;
        }
        window.scrollTo({
            top: position,
            behavior: "smooth"
        });

        
    }, [location]);

    return (
        <Box>
            <Toolbar />
            <Grid container
                xs={12} md={props.isDrawerOpen ? 10 : 12} 
                justifyContent={props.isDrawerOpen ? "flex-start" : "center"}
                p={5}
                spacing={2}
                sx={{
                    display: 'flex',
                }}
            >
                <Grid item xs={props.isDrawerOpen ? 12: 10}>
                    <Outlet />
                </Grid>
                {/* <Grid item xs={props.isDrawerOpen ? 12: 8}>
                    <Card>
                        <CardHeader title="Energy Consumption of Decompressing" />
                        <CardContent>
                            <Context input='tex'>
                                <Typography variant="body1" gutterBottom>
                                    Like the compression part, decompression also increases the energy consumption by 
                                    increasing the processing time to extract the information (<Node inline>{`d_{t\\_cost}`}</Node>).
                                    <br />
                                    The compressing agorithm is applied on the user side, so the energy consumption is calculated as:
                                    <br />
                                    <Box display="flex" justifyContent="center" pt={2}>
                                    <Box 
                                        sx={{
                                            borderRadius: 10,
                                            border: 5,
                                            borderColor: 'primary.main',
                                            width: '75%',
                                        }}
                                    >
                                        <Node>
                                            {'E_{decompressig}(D_{out}) = \\frac{D_{out}}{down_{rate}} \\cdot P_{user} \\cdot d_{t\\_cost}'}
                                        </Node>
                                    </Box>
                                    </Box>
                                    Where:<br />
                                    &ensp;- <Node inline>{`(D_{out})`}</Node> is the size of the data downloaded.<br />
                                    &ensp;- <Node inline>{`(down_{rate})`}</Node> is the download rate of the user.<br />
                                    &ensp;- <Node inline>{`(P_{user})`}</Node> is the power consumption of the user.<br />
                                </Typography>
                            </Context>
                        </CardContent>   
                    </Card>
                </Grid>
                <Grid item xs={props.isDrawerOpen ? 12: 8}>
                    <Card>
                        <CardHeader title="Energy Consumption of Storing" />
                        <CardContent>
                            <Context input='tex'>
                                <Typography variant="body1" gutterBottom>
                                    The storage of the data is done in the datacenter, so the energy consumption is calculated as:
                                    <br />
                                    <Box display="flex" justifyContent="center" pt={2}>
                                    <Box 
                                        sx={{
                                            borderRadius: 10,
                                            border: 5,
                                            borderColor: 'primary.main',
                                            width: '75%',
                                        }}
                                    >
                                        <Node>
                                            {'E_{storage}(D_{in}) = PUE_{DC}c\\cdot N_d(D_{in}) \\cdot P_{disk} \\cdot RT '}
                                        </Node>
                                    </Box>
                                    </Box>
                                    Where:<br />
                                    &ensp;- <Node inline>{`(D_{comp})`}</Node> is the size of the data.<br />
                                    &ensp;- <Node inline>{`(N_d(D_{in}))`}</Node> is the number of disks used to store the data.<br />
                                    &ensp;- <Node inline>{`(P_{disk})`}</Node> is the power consumption of the disk.<br />
                                    &ensp;- <Node inline>{`(RT)`}</Node> is the retention time of the data.<br />
                                </Typography>
                            </Context>
                        </CardContent>
                    </Card>
                </Grid> */}
            </Grid>
        </Box>
    );
}