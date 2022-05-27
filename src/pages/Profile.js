import React, { useState, useEffect } from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import Posts from '../components/Tabs/Posts';
import Followers from '../components/Tabs/Followers';
import Following from '../components/Tabs/Following';
import { makeStyles } from '@mui/styles'
import { LoaderVisibility } from '../app/slices/loaderSlice';
import { useDispatch, useSelector } from 'react-redux'
import { useGetMyPostsQuery } from '../app/reducers/profile.ts';
import { saveMyPosts, saveUser } from '../app/slices/profileSlice';


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

const Tab = styled(TabUnstyled)`
  font-family: Montserrat;
  color: rgba(0,0,0, 0.4);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: light;
  background-color: transparent;
  width: 100px;
  padding: 12px 0px;
  margin: 15px 20px;
  border: none;
  border-top: 1px solid rgba(0,0,0, 0.4);
  display: flex;
  justify-content: center;
  margin: 0;
  &.${tabUnstyledClasses.selected} {
    background-color: #fff;
    color: rgba(0,0,0, 0.7);
    border-top: 2px solid rgba(0,0,0, 0.7);
  }
  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  background-color: transparent;
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

const Profile = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const user = useSelector(state => state.profile.user)
    const posts = useSelector(state => state.profile.myPosts)


    const { data, isLoading, isError, isSuccess } = useGetMyPostsQuery()


    useEffect(() => {
        // console.log(data)
        if (isLoading) {
            dispatch(LoaderVisibility(true))
        }
        else if (isError) {
            dispatch(LoaderVisibility(false))
        }
        else if (isSuccess) {
            console.log(data);
            if (data.success) {
                dispatch(LoaderVisibility(false))
                dispatch(saveMyPosts(data.posts));
                dispatch(saveUser(data.user));

            }
            else {
                dispatch(LoaderVisibility(false))
            }
        }
    }, [data])

    return (
        <>
            <Box className={classes.root}>
                <Box sx={{ marginTop: "20px", marginBottom: "20px" }}>
                    <Grid container spacing={5}>
                        <Grid item lg={2} md={2}>
                            <Box sx={{ border: '1px solid rgba(0,0,0, 0.3)', borderRadius: "50%", width: "70px", height: "70px" }}></Box>
                        </Grid>
                        <Grid item lg={10} md={10}>
                            <Box sx={{ marginTop: "30px" }}>
                                <Box sx={{ marginLeft: "40px" }}>
                                    <Typography color="primary" variant='div' sx={{ fontSize: "20px" }}>{user && user.name}</Typography>
                                    <Box display="flex" gap="20px" sx={{ marginTop: "20px" }}>
                                        <Typography variant='div' sx={{ fontSize: '14px', color: "rgba(0,0,0, 0.4)" }}>Posts : {posts && posts.length}</Typography>
                                        <Typography variant='div' sx={{ fontSize: '14px', color: "rgba(0,0,0, 0.4)" }}>Followers : {user && user.followers? user.followers.length : 0}</Typography>
                                        <Typography variant='div' sx={{ fontSize: '14px', color: "rgba(0,0,0, 0.4)" }}>Following : {user && user.following? user.following.length : 0}</Typography>

                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ marginTop: "60px" }}>
                    <TabsUnstyled defaultValue={0}>
                        <Box
                            display="flex"
                            gap="20px"
                            flexWrap="wrap-reverse"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <TabsList>
                                <Tab sx={{ display: 'flex', alignItems: 'center' }}><ViewTimelineIcon />Post</Tab>
                                <Tab sx={{ display: 'flex', alignItems: 'center' }}><ViewTimelineIcon />Followers</Tab>
                                <Tab sx={{ display: 'flex', alignItems: 'center' }}><ViewTimelineIcon />Following</Tab>
                            </TabsList>
                        </Box>

                        <Box sx={{ marginTop: "30px" }}>
                            <TabPanel value={0}>
                                <Posts />
                            </TabPanel>
                            <TabPanel value={1}>
                                <Followers />
                            </TabPanel>
                            <TabPanel value={2}>
                                <Following />
                            </TabPanel>
                        </Box>
                    </TabsUnstyled>
                </Box>
            </Box>
        </>
    )
}

export default Profile