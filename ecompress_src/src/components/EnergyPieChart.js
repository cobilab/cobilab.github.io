import React from 'react';
import { PieChart } from '@mui/x-charts';
import { Stack } from '@mui/material';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

const colors = [
    "#4caf4f",
    "#1b5e1f",
    "#af4cac",
    "#4caf81",
    "#388e3b",
    "#81c784",
    "#a0309e",
    "#43a046",
    "#66bb69",
    "#26a16c",
]


export default function EnergyPieChart(props) {

    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        if (props.data && props.pie_index < props.data.length) {
            setData(props.data[props.pie_index]);
        }
        else {
            setData(props.data);
        }
    }, [props.data, props.pie_index]);

    const StyledText = styled('text')(({ theme }) => ({
        fill: theme.palette.text.primary,
        textAnchor: 'middle',
        dominantBaseline: 'central',
        fontSize: 18,
    }));

    function PieCenterLabel({ children }) {
        const { width, height, left, top } = useDrawingArea();
        return (
            <StyledText x={left + width / 2} y={top + height / 2} warp>
                {/* Iterate children */}
                {children.split(' ').map((line, index) => (
                    <tspan key={index} x={left + width / 2} dy={index === 0 ? 0 : 20}>
                        {line}
                    </tspan>
                ))}
            </StyledText>
        );
    }



    return (
        <Stack direction="row" sx={{ width: '100%', height: 400 }} spacing={1} paddingLeft={2}>
            <PieChart
                series={[
                    {
                        data: data ? data.normal_pie : [],
                        highlightScope: {
                            highlighted: "item",
                            faded: "global"
                        },
                        innerRadius: 70,
                    }
                ]}
                margin={{ bottom: 100}}
                slotProps={{
                    legend: {
                        hidden: true
                    }
                }}
                colors={colors}
            >
                {data && <PieCenterLabel>Normal Value</PieCenterLabel>}
            </PieChart>
            <PieChart
                series={[
                    {
                        data: data ? data.compressed_pie : [],
                        highlightScope: {
                            highlighted: "item",
                            faded: "global"
                        },
                        innerRadius: 70
                    }
                ]}
                margin={{ bottom: 100}}
                slotProps={{
                    legend: {
                        direction: 'row',
                        position: {
                            vertical: 'bottom',
                            horizontal: 'center'
                        }
                    }
                }}
                colors={colors}
            >
                 {data && <PieCenterLabel>Compressed Value</PieCenterLabel>}
            </PieChart>
        </Stack>
    );
}