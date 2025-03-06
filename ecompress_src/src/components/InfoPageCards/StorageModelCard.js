import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import React from "react";
import StyledTypography from "./CustomTypography";
import CustomBox from "./CustomBox";
import CustomNode from "./CustomNode";


export default function StorageModelCard(props) {



    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title="Storage Model" />
                    <CardContent>
                        <StyledTypography>
                            The Storage component of the system is only compromised of the datacenter disks 
                            used to store data.
                        </StyledTypography>
                        <StyledTypography>
                            The energy consumption of storing data dependent on two factors,
                            the number of disks (<CustomNode>{'N_d'}</CustomNode>) used to store data, 
                            and the retention time of the data (<CustomNode>{'RT'}</CustomNode>).
                        </StyledTypography>
                        <StyledTypography>
                            The number of disk needed can be calculated as:
                        </StyledTypography>
                        <CustomBox>
                            {
                                'N_d(D_{in}) = \\bigg\\lceil \\frac{D_{in}}{S_{disk}} \\bigg\\rceil'
                            }
                        </CustomBox>
                        <StyledTypography>
                            Where:<br />
                            <ul>
                                <li><CustomNode>{'D_{in}'}</CustomNode> is the amount of data stored</li>
                                <li><CustomNode>{'S_{disk}'}</CustomNode> is the size of the disk</li>
                            </ul>
                        </StyledTypography>
                        <StyledTypography>
                            The energy consumption of storing data can then be expressed as:
                        </StyledTypography>
                        <CustomBox>
                            {
                                'E_{storage}(D_{in}) = PUE_{DC}\\cdot N_d(D_{in}) ' + 
                                ' \\cdot P_{disk} \\cdot RT '
                            }
                        </CustomBox>
                        <StyledTypography>
                            Where:<br />
                            <ul>
                                <li><CustomNode>{'PUE_{DC}'}</CustomNode> is the Power Usage Effectiveness of the Datacenter</li>
                                <li><CustomNode>{'N_d(D_{in})'}</CustomNode> is the number of disks used to store the data</li>
                                <li><CustomNode>{'P_{disk}'}</CustomNode> is the power consumption of the disk</li>
                                <li><CustomNode>{'RT'}</CustomNode> is the retention time of the data</li>
                            </ul>
                        </StyledTypography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}