import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import pic_armando from '../images/team/armando_pinho.jpeg'
import pic_diogo from '../images/team/diogo_pratas.png'
import pic_dinis from '../images/team/dinis_lei.jpg'
import pic_denis from '../images/team/denis_yamunaque.jpeg'
import { Link } from 'react-router-dom';

const teamMembers = [
  {
    name: 'Dinis Lei',
    role: 'Master Student',
    image: pic_dinis, // Replace with actual image paths
  },
  {
    name: 'Denis Yamunaque',
    role: 'Master Student',
    image: pic_denis,
  },
  {
    name: 'Armando Pinho',
    role: 'Co Supervisor',
    image: pic_armando,
  },
  {
    name: 'Diogo Pratas',
    role: 'Supervisor',
    image: pic_diogo, // Replace with actual image paths
  }
];

export default function Team() {
  return (
    <Box sx={{ py: 8, backgroundColor: "background.paper" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", marginTop: '50px' }}
      >
        Team
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Grid container spacing={5} sx={{ maxWidth: 700 }}>
          {teamMembers.map((member, index) => (
            <Grid item key={index} xs={12} sm={6} md={6}>
              <Card
                sx={{
                  display: "flex",
                  boxShadow: 3,
                  borderRadius: 2,
                  p: 2,
                  maxWidth: 700,
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginRight: 2,
                  }}
                  image={member.image}
                  alt={member.name}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    flexGrow: 1,
                    padding: 0,
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold", textAlign: "center" }}
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: "center" }}
                  >
                    {member.role}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}> {/* Container for links */}
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Links for open source code and thesis
        </Typography>
        <Typography variant="body1" align="center">
          <a href="https://ria.ua.pt/handle/10773/42915" target="_blank" rel="noopener noreferrer">Thesis</a><br />
          <a href="https://github.com/Dinis-Lei/Tese/tree/master/calculator" target="_blank" rel="noopener noreferrer">ECOmpress</a><br />
          <a href="https://github.com/Dinis-Lei/Tese/tree/master/compression_tool_benchmark" target="_blank" rel="noopener noreferrer">Compression algorithm benchmark</a>
        </Typography>
      </Box>
      <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}> {/* Container for links */}
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Funding
        </Typography>
        <Typography variant="body1" align="center">
          This work was partially funded by FCT - Fundação para a Ciência e a
        </Typography>
        <Typography variant="body1" align="center">
          Tecnologia (FCT) I.P., through national funds, within the scope of the
        </Typography>
        <Typography variant="body1" align="center">
          UIDB/00127/2020 project (IEETA/UA, <Link to="http://www.ieeta.pt">http://www.ieeta.pt</Link>).
        </Typography>
      </Box>
    </Box>
  );
}