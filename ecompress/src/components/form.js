import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton, MenuItem, Tooltip, Typography } from '@mui/material';
import model from '../model.json';
import HelpIcon from '@mui/icons-material/Help';
import { InputAdornment } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { useTheme } from '@mui/material/styles';

function tooltip(title, error=false) {
    let color = error ? "red" : "";
    
    return (
        <Tooltip title={<p style={{fontSize: "1.2em"}}>{title}</p>}>
            <IconButton style={{padding: 0, color: color}}>
                <HelpIcon fontSize='small'/>
            </IconButton>
        </Tooltip>
    );

}

const compressors = [
    {"id": "gzip", "label": "gzip", "compression_rate": 2.79, "compression_time_cost": 0.0856, "decompression_time_cost": 0.00627},
    {"id": "zstandard", "label": "zstandard", "compression_rate": 2.88, "compression_time_cost": 0.00582, "decompression_time_cost": 0.00162},
    {"id": "lzma", "label": "lzma", "compression_rate": 3.74, "compression_time_cost": 0.594, "decompression_time_cost": 0.00873},
    {"id": "bzip2", "label": "bzip2", "compression_rate": 3.75, "compression_time_cost": 0.0699, "decompression_time_cost": 0.0317},
    {"id": "paq8", "label": "paq8", "compression_rate": 4.86, "compression_time_cost": 8.49, "decompression_time_cost": 8.61},
    {"id": "custom", "label": "Custom", "compression_rate": null, "compression_time_cost": null, "decompression_time_cost": null}
]



export default function Form({onFill}) {

    const [data, setData] = React.useState({"disabled": []});
    const [errorMessages, setErrorMessage] = React.useState({});
    const [disabled, setDisabled] = React.useState({});
    const [compressor, setCompressor] = React.useState(compressors[0]);
    const theme = useTheme();

    

    const handleChange = (event) => {
        let updatedData = {};
        if (event.target.value === ""){
            errorMessages[event.target.id] = "This field is required";
            setErrorMessage(errorMessages);
        }
        else {
            errorMessages[event.target.id] = null;
            setErrorMessage(errorMessages);
        }
        let value = event.target.value !== "" ? Number(event.target.value) : event.target.defaultValue;
        updatedData[event.target.id] = value;
        setData(data => ({
            ...data,
            ...updatedData
        }));
    } 

    const changeCompressor = (event) => {
        let updatedCompressor = compressors.find((c) => c.id === event.target.value);
        setCompressor(updatedCompressor);
        
        if (updatedCompressor.id !== "custom"){
            errorMessages["test"] = null;
            setErrorMessage(errorMessages);
        }
        else {
            return;
        }
        
        let updatedData = {
            "compression_rate": updatedCompressor.compression_rate,
            "compression_time_cost": updatedCompressor.compression_time_cost,
            "decompression_time_cost": updatedCompressor.decompression_time_cost
        };
        setData(data => ({
            ...data,
            ...updatedData
        }));
    }

    React.useEffect(() => {
        const localData = JSON.parse(localStorage.getItem("formData"));
        if (localData){
            console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBB", localData);
            setData(localData);
            setCompressor(
                compressors.find((c) => 
                    c.compression_rate === localData.compression_rate && 
                    c.compression_time_cost === localData.compression_time_cost &&
                    c.decompression_time_cost === localData.decompression_time_cost) 
                    || {"id": "custom", "label": "Custom", "compression_rate": null, "compression_time_cost": null, "decompression_time_cost": null}
            );
            onFill(localData);
        }
        else {
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa")
            fillData(model);
        }
    }, []);

    // Fill the form with default values
    const fillData = (d) => {
        let updatedData = {
            "disabled": [],
            "compression_rate": compressors[0].compression_rate,
            "compression_time_cost": compressors[0].compression_time_cost,
            "decompression_time_cost": compressors[0].decompression_time_cost
        };
        let errorMessages = {};
        let disabled = {};
        d.map((row, index) => {
            row.params.map((param, index) => {
                updatedData[param.id] = param.default;
                errorMessages[param.id] = null;
                disabled[param.id] = false;
            });
            return;
        });
        setData(data => ({
            ...data,
            ...updatedData
        }));
        setErrorMessage(errorMessages);
        setDisabled(disabled);
        console.log(updatedData)
        onFill(updatedData);
    }
    
    const fillForm = () => {
        if(Object.keys(errorMessages).some((k) => errorMessages[k] != null)){
            return;
        }
        onFill(data);
    }

    const disableComponent = (row) => {
        row.params.map((param, index) => {
            // Change the Textfield variant
            setDisabled(d => ({
                ...d,
                [param.id]: !disabled[param.id]
            }));   
        });    
    }

    React.useEffect(() => {
        setData(data => ({
            ...data,
            "disabled": Object.keys(disabled).filter((key) => disabled[key])
        }));
    }, [disabled]);

    React.useEffect(() => {
        if (Object.keys(data).length < 2) {
            return;
        }
        localStorage.setItem("formData", JSON.stringify(data));
    }, [data])
    
    
    return (
        <Card sx={{backgroundColor: "transparent"}}>
            <CardContent>
                <Grid container justifyContent={"flex-start"} spacing={2} component='form'>
                    {model.map((row, index1) => {
                        if (row.title === "Compression Options"){
                            return;
                        }
                        const internal_grid_layout = Math.max(12/(1+Math.floor(row.params.length/6)), 4); //row.params.length > 5 ? 6: 12;
                        const external_grid_layout = Math.min((1+Math.floor(row.params.length/6))*4, 12) //row.params.length > 5 ? 8: 4;
                        return <Grid item container xs={12} sm={12} md={6} lg={external_grid_layout} rowSpacing={1} key={index1}>
                            <Card variant='outlined' sx={{"width": "100%", height: "100%"}}>
                                <CardHeader 
                                    title={
                                        <Typography variant='h6' noWrap>
                                            {row.title}
                                            {row.title !== "Other" &&
                                                <Tooltip title={"Disable Component"}>
                                                    <Checkbox onClick={(e) => disableComponent(row)}/>
                                                </Tooltip>  
                                            }
                                            
                                        </Typography>
                                    } 
                                    titleTypographyProps={{variant:'h6', noWrap:false}}/>
                                <CardContent>
                                    <Grid container justifyContent={"flex-start"}>
                                        {row.params.map((param, index2) => {
                                            return <Grid item xs={internal_grid_layout} key={index2} justifyContent={'center'}>
                                                        <TextField 
                                                            id={param.id} 
                                                            type={param.type} 
                                                            defaultValue={param.default}
                                                            InputLabelProps={{shrink: true,}}
                                                            onChange={(e) => handleChange(e)}
                                                            variant='standard'
                                                            helperText={
                                                                <p  style={{width: '20em', margin:0, fontSize:"1.2em"}}>
                                                                    {param.label} {tooltip(param.tooltip, errorMessages[param.id])}
                                                                    {errorMessages[param.id] && <br/>} {errorMessages[param.id]}
                                                                </p>
                                                            }
                                                            required
                                                            error={errorMessages[param.id] != null}
                                                            InputProps={{
                                                                startAdornment: param.unit ? 
                                                                <InputAdornment  position="start">
                                                                    {param.unit}
                                                                </InputAdornment> : null
                                                            
                                                            }}
                                                            
                                                            disabled={disabled[param.id]}
                                                        />
                                                {/* <p>{JSON.stringify(param, null, 2)}</p> */}
                                            </Grid>
                                        })}
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    })}
                    <Grid item container xs={12} sm={12} md={6} lg={4} rowSpacing={1}>
                        <Card variant='outlined' sx={{"width": "100%", height: "100%"}}>
                            <CardHeader 
                                title={
                                    <Typography variant='h6' noWrap>
                                        {model[model.length-1].title} 
                                    </Typography>
                                } 
                                titleTypographyProps={{variant:'h6', noWrap:false}}/>
                            <CardContent>
                                <Grid container justifyContent={"flex-start"}>
                                    {model[model.length-1].params.map((param, index2) => {
                                        return (
                                            <Grid item xs={12} key={index2} justifyContent={'center'}>
                                                <TextField 
                                                    id={param.id} 
                                                    type={param.type} 
                                                    defaultValue={param.default}
                                                    InputLabelProps={{shrink: true,}}
                                                    onChange={(e) => handleChange(e)}
                                                    variant='standard'
                                                    helperText={
                                                        <p  style={{width: '20em', margin:0, fontSize:"1.2em"}}>
                                                            {param.label} {tooltip(param.tooltip, errorMessages[param.id])}
                                                            {errorMessages[param.id] && <br/>} {errorMessages[param.id]}
                                                        </p>
                                                    }
                                                    required
                                                    error={errorMessages[param.id] != null}
                                                    InputProps={{
                                                        startAdornment: param.unit ? 
                                                        <InputAdornment  position="start">
                                                            {param.unit}
                                                        </InputAdornment> : null
                                                    
                                                    }}
                                                    disabled={disabled[param.id]}
                                                />
                                            </Grid>
                                        );
                                    })}
                                    <Grid item xs={12} justifyContent={'center'}>
                                        <TextField
                                            id={"compressor-select"} 
                                            type={"number"} 
                                            select
                                            defaultValue={compressor.id}
                                            value={compressor.id}
                                            InputLabelProps={{shrink: true,}}
                                            onChange={(e) => changeCompressor(e)}
                                            variant='standard'
                                            helperText={
                                                <p  style={{width: '20em', margin:0, fontSize:"1.2em"}}>
                                                    Select Compression Algorithm {tooltip("A")}
                                                </p>
                                            }
                                            required
                                        >
                                            {compressors.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} justifyContent={'center'}>
                                        <TextField 
                                            id={"compression_rate"} 
                                            type={"number"} 
                                            defaultValue={compressor.compression_rate}
                                            value={compressor.compression_rate}
                                            InputLabelProps={{shrink: true,}}
                                            onChange={(e) => handleChange(e)}
                                            variant='standard'
                                            helperText={
                                                <p  style={{width: '20em', margin:0, fontSize:"1.2em"}}>
                                                    Compression Rate {tooltip("A", errorMessages["compression_rate"])}
                                                    {errorMessages["compression_rate"] && <br/>} {errorMessages["compression_rate"]}
                                                </p>
                                            }
                                            required
                                            error={errorMessages["compression_rate"] != null}
                                            disabled={compressor.id !== "custom"}
                                        />
                                    </Grid>
                                    <Grid item xs={12} justifyContent={'center'}>
                                        <TextField 
                                            id={"compression_time_cost"} 
                                            type={"number"} 
                                            defaultValue={compressor.compression_time_cost}
                                            value={compressor.compression_time_cost}
                                            InputLabelProps={{shrink: true,}}
                                            onChange={(e) => handleChange(e)}
                                            variant='standard'
                                            helperText={
                                                <p  style={{width: '20em', margin:0, fontSize:"1.2em"}}>
                                                    Time increase of compression {tooltip("A", errorMessages["compression_time_cost"])}
                                                    {errorMessages["compression_time_cost"] && <br/>} {errorMessages["compression_time_cost"]}
                                                </p>
                                            }
                                            required
                                            error={errorMessages["compression_time_cost"] != null}
                                            disabled={compressor.id !== "custom"}
                                        />
                                    </Grid>
                                    <Grid item xs={12} justifyContent={'center'}>
                                        <TextField 
                                            id={"decompression_time_cost"} 
                                            type={"number"} 
                                            defaultValue={compressor.decompression_time_cost}
                                            value={compressor.decompression_time_cost}
                                            InputLabelProps={{shrink: true,}}
                                            onChange={(e) => handleChange(e)}
                                            variant='standard'
                                            helperText={
                                                <p  style={{width: '20em', margin:0, fontSize:"1.2em"}}>
                                                    Time increase of compression {tooltip("A", errorMessages["decompression_time_cost"])}
                                                    {errorMessages["decompression_time_cost"] && <br/>} {errorMessages["decompression_time_cost"]}
                                                </p>
                                            }
                                            required
                                            error={errorMessages["decompression_time_cost"] != null}
                                            disabled={compressor.id !== "custom"}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button 
                    sx={{
                        marginLeft: "10px",
                    }} 
                    type="submit" 
                    variant='contained' 
                    onClick={fillForm}
                    color={theme.palette.mode === 'dark' ? 'primary' : 'button'}
                >
                    Submit Form
                </Button>
            </CardActions>
        </Card>
  );
}