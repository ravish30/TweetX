import React, { useEffect } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import Timer from '../Timer'
import { useSelector } from 'react-redux'


const Posts = () => {

    const myPosts = useSelector(state => state.profile.myPosts)

    
    return (
        <>
            {myPosts ? (
                myPosts.map((post) => {
                    return (
                        <Box sx={{ boxShadow: '0px 2px 20px -1px rgb(0 0 0 / 5%), 0px 4px 5px 0px rgb(0 0 0 / 5%), 0px 1px 10px 0px rgb(0 0 0 / 5%)', margin: "25px auto", padding: "30px" }}>
                            <Grid container spacing={2}>
                                <Grid item lg={2} md={2}>
                                    <Box sx={{ border: '1px solid rgba(0,0,0, 0.3)', borderRadius: "50%", width: "60px", height: "60px" }}></Box>
                                </Grid>
                                <Grid item lg={10} md={10}>
                                    <Box>
                                        <Box display="flex" justifyContent="space-between">
                                            <Typography color="primary" variant='div' sx={{ fontSize: "20px" }}>{post.name}</Typography>
                                            <Timer Time={post?.createdAt} />
                                        </Box>
                                        <Typography color="primary" sx={{ marginTop: "20px", fontSize: "14px" }}>{post.desc}</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    )
                })
            ) : <Typography color="primary" variant='h6' sx={{ textAlign: 'center' }}>You haven't posted yet...</Typography> }
        </>
    )
}

export default Posts