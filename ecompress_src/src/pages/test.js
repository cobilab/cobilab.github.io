import { Box, Grid, Toolbar } from "@mui/material";
import React from "react";
import { styled, useTheme } from '@mui/material/styles';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';
import EnergyLineChart from "../components/EnergyLineChart";


const data = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400,
      "amt": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800,
      "amt": 2290
    },
    {
      "name": "Page D",
      "uv": 2780,
      "pv": 3908,
      "amt": 2000
    },
    {
      "name": "Page E",
      "uv": 1890,
      "pv": 4800,
      "amt": 2181
    },
    {
      "name": "Page F",
      "uv": 2390,
      "pv": 3800,
      "amt": 2500
    },
    {
      "name": "Page G",
      "uv": 3490,
      "pv": 4300,
      "amt": 2100
    }
  ]

export default function Test(openDrawer) {
    
    React.useEffect(() => {
        let layout = {};

        if (openDrawer.open) {
            layout = 4;
        }
        else {
            layout = 8
        }
        setLayout(layout);
        console.log("Layout", layout);

    }, [openDrawer]);

    const [layout, setLayout] = React.useState(12);


    return (
        <Box>
           <Toolbar />
           <Grid container justifyContent={openDrawer.open ? "flex-start" : "center"}>
                <Grid item xs={layout}>
                    <EnergyLineChart data={data} />
                </Grid>
                <Grid item xs={12}/>
                <Grid item xs={12} justifyContent="center">
                  <p>Open: {JSON.stringify(openDrawer, null, 2)} {openDrawer.open}, {true}</p>
                </Grid>
                <Grid item xs={layout}>
                    <ResponsiveContainer width="100%" aspect={3}>
                        <AreaChart data={data}
                        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <ReferenceLine x="Page C" stroke="green" label="Min PAGE" />
                            <ReferenceLine y={4000} label="Max" stroke="red" strokeDasharray="3 3" />
                            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" isAnimationActive={false} />
                        </AreaChart>
                    </ResponsiveContainer>
                </Grid>
            </Grid> 
        </Box>
        
    );
}