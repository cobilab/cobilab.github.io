import { FormControl, FormHelperText, MenuItem, Select, TextField } from "@mui/material";
import React from "react";




export default function CompressorSelect(props) {

    return (
        <TextField
            select
            helperText="Please select a compressor"
        >
            <MenuItem value={1}>Compressor 1</MenuItem>
            <MenuItem value={2}>Compressor 2</MenuItem>
        </TextField>
    );
}