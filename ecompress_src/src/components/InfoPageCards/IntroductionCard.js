import React from "react";
import { Card, CardContent, CardHeader } from '@mui/material';
import StyledTypography from './CustomTypography';

export default function IntroductionCard(props) { 
    return (
        <Card>
            <CardHeader title="Introduction" />
            <CardContent>
                <StyledTypography variant="body1" gutterBottom>
                    This page contains information on how each component of the system is modeled. 
                    The main page contains 4 different graphs of energy consumption 
                    representing the impact of compression algorithms
                    on the various components of the system. The graphs are:<br />
                    <ul>
                        <li>Energy Consumption of Uploading Data</li>
                        <li>Energy Consumption of Downloading Data</li>
                        <li>Energy Consumption of Storing Data</li>
                        <li>Energy Consumption of the Overall System</li>
                    </ul>
                </StyledTypography>
                <StyledTypography>
                    This page includes the formulas used to calculate the energy consumption of each component, 
                    and a brief explanation of each formula and component used. For more information on the 
                    models, check the associated <a href="https://ria.ua.pt/handle/10773/42915">thesis</a>.
                </StyledTypography>
            </CardContent>
        </Card>
);
}