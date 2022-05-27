import React, { useEffect } from 'react'
import { Button } from '@mui/material'
import { useFollowUserMutation } from '../app/reducers/users.ts';
import { LoaderVisibility } from '../app/slices/loaderSlice';
import { useDispatch } from 'react-redux';

const Follow = ({ id }) => {
    const dispatch = useDispatch();
    const [followUser, { isLoading, isError, isSuccess, ...data }] = useFollowUserMutation();

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
            // console.log(data);
            if(data.data.success)
            {
                dispatch(LoaderVisibility(false))
            }
            else {
                dispatch(LoaderVisibility(false))
            }
        }
    }, [data])


    const FollowHandler = () => { 
        followUser({ id: id });
    }


    return (
        <>
            <Button color="secondary" variant="contained" sx={{ textTransform: 'capitalize', fontSize: '12px', padding: "7px 25px" }} onClick={FollowHandler}>Follow</Button>
        </>
    )
}

export default Follow