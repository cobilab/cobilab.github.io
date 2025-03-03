import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material'; // Assuming you're using Material-UI
import { Link } from 'react-router-dom';
import BoltIcon from '@mui/icons-material/Bolt';

export default function MainPage(props) {

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md"> {/* Added Container for better spacing */}
        <Typography variant="h4" component="h1" paragraph sx={{textAlign: 'justify'}}> {/* Adjusted variant and added paragraph */}
          <BoltIcon/> ECOmpress is a web-based tool developed to analyze and compare the energy consumption of various data compression algorithms, especially those used for genomic data. 
          
          The tool helps users identify energy-efficient compression solutions for different scenarios, contributing to a reduction in the environmental footprint of data management in bioinformatics. 
          
          ECOmpress allows users to evaluate the energy impact of different algorithms and choose the most suitable ones for their needs.
        </Typography>

        <Typography variant="h4" component="h1" paragraph> {/* Adjusted variant and added paragraph */}
          Click  <Link to="/model">here</Link> to access simulation tool.
        </Typography>
      </Container>
    </Box>
  );
}