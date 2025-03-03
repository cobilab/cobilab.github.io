import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import EnergyLineChart from '../components/EnergyLineChart.js';
import { calculate_model, load_models } from '../util/generate_data.js';
import InputSlider from '../components/InputSlider.js';
import EnergyPieChart from '../components/EnergyPieChart.js';
import Filter4Icon from '@mui/icons-material/Filter4';
import { Button, ButtonGroup, Chip, Paper, Typography } from '@mui/material';

export default function ModelPage(props) {
    
    const [layout, setLayout] = React.useState({});
    //const [chartData, setChartData] = React.useState([{}]);
    const [data, setData] = React.useState({});
    const [pieData, setPieData] = React.useState([{}]);
    const [nDataPoints, setNDataPoints] = React.useState(20);
    const [stepSize, setStepSize] = React.useState(100);
    const [pie_index, setPieIndex] = React.useState({"index": null, "name": null});
    const [viewMode, setViewMode] = React.useState("all");
    const [Din, setDin] = React.useState({"lock": false, "value": 0});
    const [Dout, setDout] = React.useState({"lock": false, "value": 0});
    const [DRatio, setDratio] = React.useState({"lock": false, "value": 0});
    const [count, setCount] = React.useState(0);

    // React.useEffect(() => {
    //     load_models();
    //     window.scrollTo({
    //         top: 0,
    //         behavior: "smooth"
    //     });
    // }, []);

    load_models();

    React.useEffect(() => {
        let layout = {};

        if (props.isDrawerOpen) {
            layout = {
                "g0": 4, 
                    "g10": 12,
                    "g11": 12,
                    "g00": 12, 
                    "g01": 12, 
                        "g000": 12, 
                        "g001": 12, 
                        "g002": 12, 
                        "g003": 12, 
                        "g010": 12, 
                        "g011": 12
            };
            if (viewMode === "all") {
                setViewMode("total");
            }
        }
        else {
            layout = {
                "g0": 12, 
                    "g10": 8,
                    "g11": 4,
                    "g00": 8, 
                    "g01": 4,
                        "g000": 6,
                        "g001": 6,
                        "g002": 6,
                        "g003": 6,
                        "g010": 12,
                        "g011": 12
        };
        }
        setLayout(layout);
    }, [props.isDrawerOpen]);

    const chartData = React.useMemo(() => {
        console.log(props.formData)
        
        if (props.formData === null) {
            return;
        }
        console.log("A", count);
        setCount(count + 1);
        

        const form = JSON.parse(localStorage.getItem("formData"));
        let flg = true
        for (let key in form) {
            if (form[key] !== props.formData[key]) {
                flg = false;
                break;
            }
        }
        if (flg && localStorage.getItem("modelData")) {
            const data = JSON.parse(localStorage.getItem("modelData"));
            return data;
        }
        const customDin = [
            Din,
            Dout,
            DRatio
        ];

        const data = calculate_model(props.formData, nDataPoints, stepSize, customDin);
        //setChartData(data);
        localStorage.setItem("modelData", JSON.stringify(data));
        return data;
    }, [props.formData, nDataPoints, stepSize, Din, Dout, DRatio]);

    React.useEffect(() => {      
        if (chartData === null || chartData === undefined || chartData.length < 10) {
            return;
        }
        let data = {
            "upload": chartData.map((s) => {
                return s.upload
            }),
            "download": chartData.map((s) => {
                return s.download
            }),
            "storage": chartData.map((s) => {
                return s.storage
            }),
            "total": chartData.map((s) => {
                return s.total
            })
        }

        if (pie_index.index !== null && pie_index.index < data[pie_index.name].length) {
            setPieData(data[pie_index.name][pie_index.index]);
        }
        else {
            setPieData(null);
        }

        setData(data);
    }, [chartData]);

    const handlePieIndex = (info) => {
        
        if (info.index === null) {
            setPieData(null);
            return;
        }
        setPieData(data[info.name][info.index]);

        setPieIndex(info);
    }


    return (
        <Box>
            <Toolbar />
            <Grid id="g0" container
                xs={12} md={layout.g0} 
                justifyContent={props.isDrawerOpen ? "flex-start" : "center"}
                p={5}
                spacing={2}
            >
                <Grid item container xs={12} md={layout.g10} justifyContent={"center"}>
                    <ButtonGroup disableElevation color={"primary"}>
                        { !props.isDrawerOpen && 
                            <Button onClick={() => setViewMode("all")} variant={viewMode === "all" ? "contained" : "outlined"} id="all">
                                <Filter4Icon id="all"  />
                            </Button>  
                        }   
                        <Button  onClick={() => setViewMode("upload")} variant={viewMode === "upload" ? "contained" : "outlined"} id="upload" >
                            Upload
                        </Button>
                        <Button  onClick={() => setViewMode("download")} variant={viewMode === "download" ? "contained" : "outlined"} id="download" >
                            Download
                        </Button>
                        <Button  onClick={() => setViewMode("storage")} variant={viewMode === "storage" ? "contained" : "outlined"} id="storage" >
                            Storage
                        </Button>
                        <Button  onClick={() => setViewMode("total")} variant={viewMode === "total" ? "contained" : "outlined"} id="total" >
                            Total
                        </Button>
                    </ButtonGroup>
                </Grid>
                <Grid xs={12} md={layout.g11}></Grid>
                <Grid id="g00" item container xs={12} md={layout.g00} spacing={2}>
                    <Grid item container xs={12} md={12}>
                        <Paper 
                            sx={{
                                height: "100%", 
                                width: "100%", 
                                minHeight: props.isDrawerOpen ? "15vw" : "25vw"
                            }}
                            elevation={3}
                        >
                            {
                                viewMode === "all" ? 
                                <Grid container paddingTop={2}>
                                    {
                                        Object.keys(data).map((key, index) => {
                                            return (
                                                <Grid item xs={12} md={6}> 
                                                    <Stack 
                                                        sx={{
                                                            height: "100%", 
                                                            width: "100%", 
                                                            minHeight: props.isDrawerOpen ? "15vw" : "25vw",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <Chip 
                                                            label={
                                                                <Typography 
                                                                    variant="h6" 
                                                                    sx={{
                                                                        textTransform: "capitalize",
                                                                        textAlign: "center",
                                                                    }}
                                                                >
                                                                    {key}
                                                                </Typography>}
                                                            color='primary'
                                                            sx={{
                                                                width: "30%",
                                                                textAlign: "center",
                                                                
                                                            }}
                                                            onClick={() => setViewMode(key)}
                                                        />
                                                        
                                                        <EnergyLineChart 
                                                            data={data[key]} 
                                                            nDataPoints={nDataPoints} 
                                                            setPieIndex={handlePieIndex} 
                                                            name={key}
                                                            lock={Din.lock ? "Din" : Dout.lock ? "Dout" : DRatio.lock ? "DRatio" : null}
                                                            ratio={DRatio.value}
                                                        />
                                                    </Stack>
                                                </Grid>
                                            )
                                        }) 
                                    }
                                </Grid>
                                :
                                <EnergyLineChart 
                                    data={data[viewMode]} 
                                    nDataPoints={nDataPoints} 
                                    setPieIndex={handlePieIndex} 
                                    name={viewMode} 
                                    lock={Din.lock ? "Din" : Dout.lock ? "Dout" : DRatio.lock ? "DRatio" : null}
                                    ratio={DRatio.value}
                                />     
                            }
                        </Paper>
                    </Grid>
                </Grid>
                <Grid id="g01" container item xs={12} md={layout.g01}>
                    <Grid id="g010" item xs={12} md={layout.g010}>
                        <InputSlider 
                            setNDataPoints={setNDataPoints} 
                            setStepSize={setStepSize}
                            setDin={setDin}
                            setDout={setDout}
                            setDratio={setDratio}
                            viewMode={viewMode}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <EnergyPieChart data={pieData} pie_index={pie_index.index}/>
                    </Grid>
                </Grid>
            </Grid>
            
        </Box>
    );
}
