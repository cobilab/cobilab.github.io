import React from "react";
import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import CustomBox from "./CustomBox";
import CustomNode from "./CustomNode";
import StyledTypography from "./CustomTypography";

export default function UploadModelCard(props) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title="Energy Consumption of Uploading" />
                    <CardContent>
                        <StyledTypography>
                            The energy consumption of uploading data, also referred as a write operation, 
                            encompasses the Datacenter's servers, network, and storage components. 
                        </StyledTypography>
                        <StyledTypography>
                            To calculate the energy consumption of these components, it is needed to consider the
                            power consumption of the servers, switches, and disks, as well as the time it takes
                            to conclude the write operation. The elapsed time is given as the size ratio between
                            the size of the input data and the components bandwidths, 
                            <CustomNode>{`\\frac{D_{\\text{in}}}{B}`}</CustomNode>.
                        </StyledTypography>
                        <br />
                        <StyledTypography>
                            The energy consumption of the write operation is given by the formula:
                        </StyledTypography>
                        <CustomBox>
                            {
                                'E_{\\text{write}}(D_{\\text{in}}) = ' + 
                                '\\bigg(\\frac{D_{\\text{in}}}{B_{\\text{server}}}\\cdot P_{server} + ' +
                                '\\frac{D_{in}}{B_{sw}}\\cdot P_{sw} + ' +
                                '\\frac{D_{in}}{B_{disk}}\\cdot P_{disk}\\cdot N_d(D_{in})\\bigg)' +
                                '\\cdot PUE_{DC}'
                            }
                        </CustomBox>
                        <StyledTypography>
                            Where:<br />
                            &ensp;- <CustomNode inline>{`(D_{in})`}</CustomNode> is the size of the input data.<br />
                            &ensp;- <CustomNode inline>{`(B_{server})`}</CustomNode> is the bandwidth of the server.<br />
                            &ensp;- <CustomNode inline>{`(P_{server})`}</CustomNode> is the power consumption of the server.<br />
                            &ensp;- <CustomNode inline>{`(B_{sw})`}</CustomNode> is the bandwidth of the switch.<br />
                            &ensp;- <CustomNode inline>{`(P_{sw})`}</CustomNode> is the power consumption of the switch.<br />
                            &ensp;- <CustomNode inline>{`(B_{disk})`}</CustomNode> is the bandwidth of the disk.<br />
                            &ensp;- <CustomNode inline>{`(P_{disk})`}</CustomNode> is the power consumption of the disk.<br />
                            &ensp;- <CustomNode inline>{`(N_d(D_{in}))`}</CustomNode> is the number of disks used to store the data.<br />
                            &ensp;- <CustomNode inline>{`(PUE_{DC})`}</CustomNode> is the Power Usage Effectiveness of the Datacenter.<br />
                        </StyledTypography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} id="compressing">
                <Card>
                    <CardHeader title="Energy Consumption of Compressing" />
                    <CardContent>
                        <StyledTypography>
                            Each compression algorithm has different rates time increase 
                            (<CustomNode>{`c_{t\\_cost}`}</CustomNode>)
                            and compression rates (<CustomNode>{`c_{rate}`}</CustomNode>) 
                            (table 1).
                        </StyledTypography>
                        <StyledTypography> 
                            These values both directly influence the elapsed time to complete the write operation.
                            The size of the compressed data is given multipling the compression rate by the 
                            input size, <CustomNode>{`D_{comp}(D_{in}) = D_{in} \\cdot c_{rate}`}</CustomNode>.
                            With this information, the energy consumption while using the compression 
                            algorithm can be calculated as:
                        </StyledTypography>
                        <CustomBox>
                            {
                            'E_{write}(D_{in}) = ' + 
                            '\\bigg(\\frac{D_{in}}{B_{server}}\\cdot c_{t\\_cost}\\cdot P_{server}' +
                            ' + \\frac{D_{comp}(D_{comp}(D_{in}))}{B_{sw}}\\cdot P_{sw}' +
                            '+ \\frac{D_{comp}(D_{in})}{B_{disk}}\\cdot P_{disk}\\cdot N_d(D_{in})\\bigg)' + 
                            '\\cdot PUE_{DC}'
                            }
                        </CustomBox>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}