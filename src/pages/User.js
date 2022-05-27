import React, { useEffect } from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { LoaderVisibility } from '../app/slices/loaderSlice'
import { useGetAllUsersQuery } from '../app/reducers/users.ts'
import { useDispatch, useSelector } from 'react-redux'
import { GetUserList } from '../app/slices/userSlice'
import Follow from '../components/Follow'

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

const Users = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const userList = useSelector(state => state.user.users)

    const { data, isLoading, isError, isSuccess } = useGetAllUsersQuery()




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
                dispatch(GetUserList(data.result));
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
                <Box sx={{ marginTop: "20px", marginBottom: "20px" }}>
                    {userList ? (
                        userList.map(data => {
                            return (
                                <Box sx={{ boxShadow: '0px 2px 20px -1px rgb(0 0 0 / 5%), 0px 4px 5px 0px rgb(0 0 0 / 5%), 0px 1px 10px 0px rgb(0 0 0 / 5%)', margin: "25px auto", padding: "30px" }}>
                                    <Grid container spacing={2}>
                                        <Grid item lg={2} md={2} sm={12}>
                                            <Box sx={{ border: '1px solid rgba(0,0,0, 0.3)', borderRadius: "50%", width: "40px", height: "40px" }}></Box>
                                        </Grid>
                                        <Grid item lg={10} md={10} sm={12}>
                                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                                <Box>
                                                    <Typography color="primary" variant='div' sx={{ fontSize: "18px" }}>{data.name}</Typography>
                                                    <Typography color="primary" variant='div' sx={{ fontSize: "12px", marginTop: "6px", display: 'block' }}>Following : {data.following.length}</Typography>
                                                </Box>
                                                <Box>
                                                    <Follow id={data._id} />
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            )
                        })
                    ) : <Typography color="primary" variant='h6' sx={{ textAlign: 'center' }}>No Users...</Typography>}
                </Box>
            </Box>
        </>
    )
}

export default Users