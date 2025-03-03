import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import { Checkbox, Stack, Typography, useTheme } from '@mui/material';
import CustomNode from './InfoPageCards/CustomNode.js';



export default function InputSlider(props) {

    const [lockDIn, setLockDIn] = React.useState(false);
    const [lockDOut, setLockDOut] = React.useState(false);
    const [lockDRatio, setLockDRatio] = React.useState(false);
    const [Din, setDin] = React.useState(0);
    const [Dout, setDout] = React.useState(0);
    const [Dratio, setDratio] = React.useState(1);
    const theme = useTheme();

    const handleLock = (type, prevState) => {
        
        if (type === 'in') {
            setLockDIn(!prevState); 
            if (!prevState) {
                setLockDOut(false);
                setLockDRatio(false);
                props.setDout({"lock": false, "value": 0})
                props.setDin({"lock": true, "value": Din})
            }
            else {
                props.setDin({"lock": false, "value": 0})
            }
        }
        else if (type === 'out') {
            setLockDOut(!prevState);
            if (!prevState) {
                setLockDIn(false);
                setLockDRatio(false);
                props.setDin({"lock": false, "value": 0})
                props.setDout({"lock": true, "value":Dout})
            }
            else {
                props.setDout({"lock": false, "value": 0})
            }
        }
        else {
            setLockDRatio(!prevState);
            if (!prevState) {
                setLockDIn(false);
                setLockDOut(false);
                props.setDin({"lock": false, "value": 0})
                props.setDout({"lock": false, "value": 0})
                props.setDratio({"lock": true, "value": Dratio})
            }
            else {
                props.setDratio({"lock": false, "value": 0})
            }
        }
    }

    const handleChange = (e) => {
        const parent = e.currentTarget.parentElement
        const grandParent = parent.parentElement
        parent.style.minWidth = `${theme.typography.fontSize*2}px`
        parent.style.width = `${(e.currentTarget.value.length +2) * 9}px`
        grandParent.style.minWidth = `${theme.typography.fontSize*2}px`
        grandParent.style.width = `${(e.currentTarget.value.length +2) * 9}px`
    }

    const handleDin = (e) => {
        props.setDin({"lock": true, "value": Din})
        setDin(Number(e.target.value));
    }

    const handleDout = (e) => {
        props.setDout({"lock": true, "value": Number(e.target.value)})
        setDout(Number(e.target.value));
    }

    const handleDratio = (e) => {
        props.setDratio({"lock": true, "value": Number(e.target.value)})
        setDratio(Number(e.target.value));
    }

    return (
        <Box>
            <Card elevation={3}>
                <CardContent>
                    <Typography gutterBottom>Number of data points</Typography>
                    <Slider 
                        defaultValue={20}
                        step={10}
                        min={10}
                        max={100}
                        valueLabelDisplay='auto'
                        marks
                        onChange={(e) => props.setNDataPoints(e.target.value)}
                        sx={{
                            width: "90%",
                            marginLeft: "5%",
                            [`&. MuiSlider-rail`]: {
                                "margin-left": "-10px",
                                "padding-right": "20px",
                                color: "black"
                            }
                        }}
                    />
                    <TextField id="stepSize"
                        type="number" 
                        label="Step size (MB)"
                        defaultValue={100}
                        InputLabelProps={{shrink: true,}}
                        variant='standard'
                        onChange={(e) => props.setStepSize(Number(e.target.value))}          
                    />
                    {
                        (props.viewMode === "total" || props.viewMode === "all") &&

                        <Stack direction={"column"}>
                            <Stack direction={"row"} sx={{justifyContent: "start", alignItems: "center", paddingTop: "10px"}}>
                                <Typography sx={{marginRight: "0.8em"}}>Lock Data Input</Typography>
                                <Checkbox checked={lockDIn} onChange={()=> handleLock("in", lockDIn)}/>
                                <Typography>
                                    <CustomNode>{'D_{in} ='}</CustomNode>&nbsp;
                                </Typography>
                                <TextField 
                                    id='din'
                                    variant='standard'
                                    disabled={!lockDIn}
                                    defaultValue={Din}
                                    onChange={(e) => {handleChange(e)}}
                                    onBlur={(e) => {handleDin(e)}} 
                                    sx={{
                                        width: `${theme.typography.fontSize*2}px`,
                                    }} 
                                /> 

                                
                            </Stack>
                            <Stack direction={"row"} sx={{justifyContent: "start", alignItems: "center", paddingTop: "10px"}}>
                                <Typography>Lock Data Output</Typography>
                                <Checkbox checked={lockDOut} onChange={()=> handleLock("out", lockDOut)} />
                                <Typography>
                                    <CustomNode>{'D_{out} ='}</CustomNode>&nbsp;
                                </Typography>
                                <TextField 
                                    id="Dout"
                                    variant='standard'
                                    disabled={!lockDOut}
                                    defaultValue={Dout}
                                    onChange={(e) => {handleChange(e)}}
                                    onBlur={(e) => {handleDout(e)}} 
                                    sx={{
                                        width: `${theme.typography.fontSize*2}px`,
                                    }} 
                                />
                            </Stack>
                            <Stack direction={"row"} sx={{justifyContent: "start", alignItems: "center", paddingTop: "10px"}}>
                                <Typography>Lock Data Ratio</Typography>
                                <Checkbox checked={lockDRatio} onChange={()=> handleLock("ratio", lockDRatio)} />
                                <Typography>
                                    <CustomNode>{'D_{in} ='}</CustomNode>&nbsp;
                                </Typography>
                                <TextField 
                                    id="Dratio"
                                    variant='standard'
                                    disabled={!lockDRatio}
                                    defaultValue={Dratio}
                                    onChange={(e) => {handleChange(e)}}
                                    onBlur={(e) => {handleDratio(e)}} 
                                    sx={{
                                        width: `${theme.typography.fontSize*2}px`,
                                    }} 
                                />
                                <Box>
                                <Typography>
                                    <CustomNode>{'D_{out}'}</CustomNode>
                                </Typography></Box>
                            </Stack>
                        </Stack>
                    }
                </CardContent>
            </Card>
        </Box>
    );
}