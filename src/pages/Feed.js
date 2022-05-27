import React, { useEffect } from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import WriteModal from '../components/WriteModal'
import { makeStyles } from '@mui/styles'
import { LoaderVisibility } from '../app/slices/loaderSlice'
import { useGetAllFeedPostsQuery } from '../app/reducers/feed.ts'
import { useDispatch, useSelector } from 'react-redux'
import { MyFeeds } from '../app/slices/feedSlice'
import Timer from '../components/Timer'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        marginTop: '100px',
        width: "600px",
        [theme.breakpoints.down(650)]: {
            width: "100%",
        }
    }
}))

const Feed = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const feedList = useSelector(state => state.feed.feeds)

    const { data, isLoading, isError, isSuccess } = useGetAllFeedPostsQuery()

    useEffect(() => {
        // console.log(data)
        if(isLoading)
        {
            dispatch(LoaderVisibility(true))
        }
        else if(isError)
        {
            dispatch(LoaderVisibility(false))
        }
        else if(isSuccess)
        {
            console.log(data);
            if(data.success)
            {
                dispatch(MyFeeds(data.result));
                dispatch(LoaderVisibility(false))
            }
            else {
                dispatch(LoaderVisibility(false))
            }
        }
    }, [data])

    return (
        <>
            <Box className={classes.root}>
                <WriteModal />
                <Box sx={{ marginTop: "20px", marginBottom: "20px" }}>
                    {feedList ? (
                        feedList.map(feed => {
                            return (
                                <Box sx={{ boxShadow: '0px 2px 20px -1px rgb(0 0 0 / 5%), 0px 4px 5px 0px rgb(0 0 0 / 5%), 0px 1px 10px 0px rgb(0 0 0 / 5%)', margin: "25px auto", padding: "30px" }}>
                                    <Grid container spacing={2}>
                                        <Grid item lg={2} md={2}>
                                            <Box sx={{ border: '1px solid rgba(0,0,0, 0.3)', borderRadius: "50%", width: "60px", height: "60px" }}></Box>
                                        </Grid>
                                        <Grid item lg={10} md={10}>
                                            <Box>
                                                <Box display="flex" justifyContent="space-between">
                                                    <Typography color="primary" variant='div' sx={{ fontSize: "20px" }}>{feed?.name}</Typography>
                                                    <Timer Time={feed?.createdAt} />
                                                </Box>
                                                <Typography color="primary" sx={{ marginTop: "20px", fontSize: "14px" }}>{feed?.desc}</Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            )
                        })
                    ) : <Typography color="primary" variant='h6' sx={{ textAlign: 'center' }}>Nothing to show in feed...</Typography>}
                </Box>
            </Box>
        </>
    )
}

export default Feed