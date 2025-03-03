import React from 'react';
import { Box } from '@mui/material';
import { MathJax } from 'better-react-mathjax';
import { useTheme } from '@emotion/react';

const CustomBox = (props) => {
    const { children } = props;
    const theme = useTheme();
    return (
        <Box display="flex" justifyContent="center" pt={2}>
            <Box 
                sx={{
                    borderRadius: 10,
                    border: 5,
                    borderColor: 'primary.main',
                    width: '75%',
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: theme.typography.pxToRem(20),
                }} 
            >   
                <MathJax>
                    {"\\(" + children + "\\)"}
                </MathJax>
            </Box>
        </Box>
    );
}

export default CustomBox;