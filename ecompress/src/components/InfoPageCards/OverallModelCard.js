import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import React from "react";
import StyledTypography from "./CustomTypography";
import CustomNode from "./CustomNode";


export default function OverallModelCard(props) {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title="Overall Model" />
                    <CardContent>
                        <StyledTypography>
                            The overall model is a combination of the energy consumption of the upload, storage
                            and download models. However a problem arrises with this, and that is that the
                            independent variable of the upload and storage models is different from the download,
                            the former two use the input data <CustomNode>{'(D_{in})'}</CustomNode> variable,
                            while the latter uses the output data <CustomNode>{'(D_{out})'}</CustomNode>.
                        </StyledTypography>
                        <StyledTypography>
                            To work arround this problem, the model graph assumes that both the input and output
                            data grow at the same rate. Nontheless, the user can lock the either variable to a
                            specific value, and the model will recalculate according to the new paramethers, as 
                            well as insert a ratio between the two variables.
                        </StyledTypography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}