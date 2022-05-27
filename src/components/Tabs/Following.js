import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography, Button } from '@mui/material'
import { LoaderVisibility } from '../../app/slices/loaderSlice';
import { useGetFollowingListQuery } from '../../app/reducers/profile.ts';
import { saveMyFollowingList } from '../../app/slices/profileSlice'


const Following = () => {

  const dispatch = useDispatch();

  const following = useSelector(state => state.profile.followingList)


  const { data, isLoading, isError, isSuccess } = useGetFollowingListQuery()


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
        dispatch(saveMyFollowingList(data.result));

      }
      else {
        dispatch(LoaderVisibility(false))
      }
    }
  }, [data])

  return (
    <>
      {following ? (
        following.map((user) => {
          return (
            <Box sx={{ boxShadow: '0px 2px 20px -1px rgb(0 0 0 / 5%), 0px 4px 5px 0px rgb(0 0 0 / 5%), 0px 1px 10px 0px rgb(0 0 0 / 5%)', margin: "25px auto", padding: "30px" }}>
              <Grid container spacing={2}>
                <Grid item lg={2} md={2}>
                  <Box sx={{ border: '1px solid rgba(0,0,0, 0.3)', borderRadius: "50%", width: "40px", height: "40px" }}></Box>
                </Grid>
                <Grid item lg={10} md={10}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography color="primary" variant='div' sx={{ fontSize: "18px" }}>{user.name}</Typography>
                      <Typography color="primary" variant='div' sx={{ fontSize: "12px", marginTop: "6px", display: 'block' }}>Following : {user.following.length}</Typography>
                    </Box>
                    <Box>
                      <Button sx={{ textTransform: 'capitalize', fontSize: '12px', padding: "7px 25px" }}>Following</Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )
        })
      ) :  <Typography color="primary" variant='h6' sx={{ textAlign: 'center' }}>You haven't followed anyone yet...</Typography>}
    </>
  )
}

export default Following