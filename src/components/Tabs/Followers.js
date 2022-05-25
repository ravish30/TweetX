import React from 'react'
import { Box, Grid, Typography, Button } from '@mui/material'


const Followers = () => {
  return (
    <>
      {new Array(20).fill("").map((i, _) => {
        return (
          <Box sx={{ boxShadow: '0px 2px 20px -1px rgb(0 0 0 / 5%), 0px 4px 5px 0px rgb(0 0 0 / 5%), 0px 1px 10px 0px rgb(0 0 0 / 5%)', margin: "25px auto", padding: "30px" }}>
            <Grid container spacing={2}>
              <Grid item lg={2} md={2}>
                <Box sx={{ border: '1px solid rgba(0,0,0, 0.3)', borderRadius: "50%", width: "40px", height: "40px" }}></Box>
              </Grid>
              <Grid item lg={10} md={10}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography color="primary" variant='div' sx={{ fontSize: "18px" }}>Arjun Reddy</Typography>
                    <Typography color="primary" variant='div' sx={{ fontSize: "12px", marginTop: "6px", display: 'block' }}>Following : 200</Typography>
                  </Box>
                  <Box>
                    <Button color="secondary" variant="contained" sx={{ textTransform: 'capitalize', fontSize: '12px', padding: "7px 25px" }}>Follow</Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )
      })}
    </>
  )
}

export default Followers