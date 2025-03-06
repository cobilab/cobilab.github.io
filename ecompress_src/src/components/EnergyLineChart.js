import { LineChart } from '@mui/x-charts';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import React from 'react';
import { useTheme } from '@mui/material';


export default function EnergyLineChart(props) {

    const [data, setData] = React.useState(null);
    const theme = useTheme();

    React.useEffect(() => {
        setData(props.data);
    }, [props]);

    const [xAxisLable, setXAxisLabel] = React.useState("");
    React.useEffect(() => {
        if (props.name === "total") {
            if (!props.lock) {
                setXAxisLabel("Input and Output Data (MB)")
                return;
            }
            if (props.lock === "Din") {
                setXAxisLabel("Output Data (MB)")
            }
            else {
                setXAxisLabel("Input Data (MB)")
            }
        }
        else if (props.name !== "download") {
            setXAxisLabel("Input Data (MB)")
        }
        else {
            setXAxisLabel("Output Data (MB)")
        }
    }, [props.name, props.lock]);

    const config = {
        ...( (props.lock === "DRatio" && props.name === "total") && {
            topAxis: "xaxis2",
        })
    }

    return (
        
            data ?
            <LineChart 
                xAxis={[
                    { 
                        dataKey: "xaxis",
                        valueFormatter: (value) => {
                            return new Intl.NumberFormat("en-US", {
                              notation: "compact",
                              compactDisplay: "short",
                            }).format(value)
                        },
                        label: xAxisLable
                    },
                    ( (props.lock === "DRatio" && props.name === "total") && {
                        dataKey: "xaxis",
                        valueFormatter: (value) => {
                            return new Intl.NumberFormat("en-US", {
                              notation: "compact",
                              compactDisplay: "short",
                            }).format(value/props.ratio)
                        },
                        label: "Output Data (MB)",
                        id: "xaxis2",
                    })
                ]}
                yAxis={[{
                    id: "yaxis",
                    valueFormatter: (value) => {
                        return new Intl.NumberFormat("en-US", {
                          notation: "compact",
                          compactDisplay: "short",
                        }).format(value)
                    },
                    label: "Energy (W)"
                }]}
                series={[
                    {
                        yAxisKey: "yaxis",
                        dataKey: "normal_value",
                        valueFormatter: (value) => `${value} W`,
                        showMark: false,
                        label: "Normal value",
                        color: theme.palette.primary.main
                    },
                    {
                        yAxisKey: "yaxis",
                        dataKey: "compressed_value",
                        valueFormatter: (value) => `${value} W`,
                        showMark: false,
                        label: "Compressed value",
                        color: theme.palette.info.main
                        
                    }    
                ]}
                dataset={data}
                grid={{ vertical: true, horizontal: true }}
                sx={{
                    [`& .${axisClasses.left} .${axisClasses.label}`]: {
                      transform: 'translate(-25px, 0)',
                    }, 
                    [`& .MuiChartsGrid-line`]: {
                        stroke: "grey!important", 
                        strokeDasharray: "2 2",
                    }
                }}
                onAxisClick={(e, d) => {
                    if (props.name) {
                        props.setPieIndex(
                            {
                                "index": d.dataIndex,
                                "name": props.name
                            }
                        )
                    }
                    else {
                        props.setPieIndex(e.activeTooltipIndex)
                    }
                }}
                skipAnimation={true}
                margin={{ left: 75 }}
                slotProps={{
                    legend: {
                        position: {
                            vertical: "top",
                            horizontal: "left"
                        },
                        direction: "column",
                        padding: {
                            left: 100,
                            top: 100
                        }
                    }
                }}
                {...config}
            />
            :
            <div></div>
        
        
    );
}