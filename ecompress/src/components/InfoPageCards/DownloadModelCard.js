import { Card, CardHeader, CardContent, Grid, Typography, Box, Skeleton } from "@mui/material";
import React from "react";
import CustomBox from "./CustomBox";
import CustomNode from "./CustomNode";
import StyledTypography from "./CustomTypography";



export default function DownloadModelCard(props) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title="Download Model" />
                    <CardContent>
                        <StyledTypography>
                            The downloading process encompasses several areas of the system, 
                            from the Datacenter's servers and network, to the global network system,
                            until the users devices. To calculate the energy consumption of downloading data,
                            each component of the system must be considered, and summed up.
                        </StyledTypography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} id="server-read">
                <Card>
                    <CardHeader title="Server Read" />
                    <CardContent>
                        <StyledTypography>
                            The first component to be considered is the Datacenter. Like the upload process, we
                            consider a specific operation of the Datacenter, the read operation, and like the 
                            write operation, we have to take into account the power consumption of the servers, 
                            and switches, as well as the time it takes to conclude the read operation. 
                            The elapsed time is given as the size ratio between the size of the output 
                            data and the components bandwidths, <CustomNode>{'\\frac{D_{out}}{B}'}</CustomNode>.
                        </StyledTypography>
                        <br />
                        <StyledTypography>
                            The energy consumption of the write operation is given by the formula:
                        </StyledTypography>
                        <CustomBox>
                            {
                                'E_{write}(D_{out}) = ' + 
                                '\\bigg(\\frac{D_{out}}{B_{server}}\\cdot P_{server} + ' +
                                '\\frac{D_{out}}{B_{sw}}\\cdot P_{sw}\\bigg)' +
                                '\\cdot PUE_{DC}'
                            }
                        </CustomBox>
                        <StyledTypography>
                            Where:<br />
                            <ul>
                                <li><CustomNode>{`(D_{out})`}</CustomNode> is the size of the output data.</li>
                                <li><CustomNode>{`(B_{server})`}</CustomNode> is the bandwidth of the server.</li>
                                <li><CustomNode>{`(P_{server})`}</CustomNode> is the power consumption of the server.</li>
                                <li><CustomNode>{`(B_{sw})`}</CustomNode> is the bandwidth of the switch.</li>
                                <li><CustomNode>{`(P_{sw})`}</CustomNode> is the power consumption of the switch.</li>
                            </ul>
                        </StyledTypography>
                        <br />
                        <StyledTypography>
                            For the impact of the compression algorithms on the energy consumption of 
                            the server read operation, is only inpacted by the size reduction of the output data,
                            which is given as, <CustomNode>{`D_{comp}(D_{out}) = D_{out} \\cdot c_{rate}`}</CustomNode>. 
                        </StyledTypography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} id='global-network'>
                <Card>
                    <CardHeader title="Global Network" />
                    <CardContent>
                        <StyledTypography>
                            The global network can be divided into 3 sub networks:<br />
                            <ul>
                                <li>The Customer Premises Equipment (CPE).</li>
                                <li>The Access Network (AN).</li>
                                <li>The Edge Network (EN).</li>
                            </ul>
                        </StyledTypography>
                        <StyledTypography>
                            The CPE corresponds to the user's network devices, such as routers and modems.
                            The energy consumption of these devices is a function of time used 
                            to complete the task, in this case a download of data, so it is 
                            dependent on the download speed of the user, <CustomNode>{'down_{rate}'}</CustomNode>,
                            and the amount of data being downloaded (<CustomNode>{'D_{out}'}</CustomNode>).
                            The time to complete (<CustomNode>{'T(D_{out})'}</CustomNode>) is the ratio between the size of the data and the download rate,
                        </StyledTypography>
                        <StyledTypography>
                            The energy consumption of the CPE is expressed as:
                        </StyledTypography>
                        <CustomBox>
                            {
                                'E_{CPE}(D_{out}) = T(D_{out}) \\cdot \\frac{t_{on}}{t_{use}}' +
                                '\\cdot \\frac{P_{CPE}}{N_{CPE}}'
                            }
                        </CustomBox>
                        <StyledTypography>
                            Where:<br />
                            <ul>
                                <li><CustomNode>{`(\\frac{t_{on}}{t_{use}})`}</CustomNode> is the ratio of time that the device is actively working.;.</li>
                                <li><CustomNode>{`(P_{CPE})`}</CustomNode> is the power consumption of the device.</li>
                                <li><CustomNode>{`(N_{CPE})`}</CustomNode> is the number of devices used.</li>
                            </ul>
                        </StyledTypography>
                        <StyledTypography>
                            The AN corresponds to the network infrastructure that connects the user to the
                            Internet Service Provider (ISP) and is also dependent on the time to complete the download, 
                            so it can be expressed as:
                        </StyledTypography>
                        <CustomBox>
                            {
                                'E_{AN}(D_{out}) = T(D_{out}) \\cdot \\frac{P_{AN}}{N_{AN}} \\cdot PUE_{AN}'
                            }
                        </CustomBox>
                        <StyledTypography>
                            Where:<br />
                            <ul>
                                <li><CustomNode>{`(P_{AN})`}</CustomNode> is the power consumption of the Access Network.</li>
                                <li><CustomNode>{`(N_{AN})`}</CustomNode> is thenumber of users (subscribers) connected to the AN;.</li>
                                <li><CustomNode>{'(PUE_{AN})'}</CustomNode> is the PUE of the Acess Network</li>
                            </ul>
                        </StyledTypography>
                        <StyledTypography>
                            Finally, the Edge Network is the last component of the global network, and corresponds to 
                            the global network infrastructure that connect several ISP to each other. 
                            It is only dependent on the amount of data being downloaded. 
                            The default ratio of power per Gigabyte is taken from the work 
                            of <a href="">Schien et al.</a>.
                        </StyledTypography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} id="user-side">
                <Card>
                    <CardHeader title="User Side" />
                    <CardContent>
                        <StyledTypography>
                           The user side is the last component of the system, and corresponds to the user's devices,
                            that are used to download the data. The energy consumption of the user side is 
                            dependent on the download rate of the user, <CustomNode>{'down_{rate}'}</CustomNode>. 
                        </StyledTypography>
                        <StyledTypography>
                            The energy consumption of the user side is expressed as:
                        </StyledTypography>
                        <CustomBox>
                            {
                                'E_{user}(D_{out}) = \\frac{D_{out}}{down_{rate}} \\cdot P_{user} \\cdot N_{user}'
                            }
                        </CustomBox>
                        <StyledTypography>
                            Where:<br />
                            <ul>
                                <li><CustomNode>{`(P_{user})`}</CustomNode> is the power consumption of the user.</li>
                                <li><CustomNode>{`(N_{user})`}</CustomNode> is the number of users.</li>
                            </ul>
                        </StyledTypography>
                        <StyledTypography>
                            This component however is impacted by the decompression algorithm, so when
                            calculating the energy consumption, we need to take into account the decompression
                            time increase on computation time, <CustomNode>{'d_{t\\_cost}'}</CustomNode>.
                        </StyledTypography>
                        <StyledTypography>
                            So for the compression, the model changes into:
                        </StyledTypography>
                        <CustomBox>
                            {
                                'E_{user}(D_{out}) = ' + 
                                '\\bigg(\\frac{D_{comp}(D_{out})}{down_{rate}}' + 
                                '+ D_{out}\\cdot d_{t\\_cost} \\bigg)' +
                                '\\cdot P_{user}\\cdot N_{user}'
                            }
                        </CustomBox>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        
    );
}