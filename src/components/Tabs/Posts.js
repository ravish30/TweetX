import React from 'react'
import { Box, Grid, Typography } from '@mui/material'

const Posts = () => {
    return (
        <>
            {new Array(5).fill("").map((i, _) => {
                return (
                    <Box sx={{ boxShadow: '0px 2px 20px -1px rgb(0 0 0 / 5%), 0px 4px 5px 0px rgb(0 0 0 / 5%), 0px 1px 10px 0px rgb(0 0 0 / 5%)', margin: "25px auto", padding: "30px" }}>
                        <Grid container spacing={2}>
                            <Grid item lg={2} md={2}>
                                <Box sx={{ border: '1px solid rgba(0,0,0, 0.3)', borderRadius: "50%", width: "60px", height: "60px" }}></Box>
                            </Grid>
                            <Grid item lg={10} md={10}>
                                <Box>
                                    <Box display="flex" justifyContent="space-between">
                                        <Typography color="primary" variant='div' sx={{ fontSize: "20px" }}>Arjun Reddy</Typography>
                                        <Typography color="primary" variant='div' sx={{ fontSize: '14px' }}>10 mins ago</Typography>
                                    </Box>
                                    <Typography color="primary" sx={{ marginTop: "20px", fontSize: "14px" }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                )
            })}
        </>
    )
}

export default Posts