import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { makeStyles, withStyles } from '@mui/styles'
import { Box, Typography, Button, Modal, TextField, InputBase } from "@mui/material";
// import { useDispatch } from 'react-redux'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';




const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#000',
    border: '2px solid #000',
    borderRadius: "5px",
    p: 4,
    border: '1px solid #768BF9'
};

export default function WriteModal(props) {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    // const dispatch = useDispatch();

    // const [bookSlot, { isLoading, isError, isSuccess, ...data }] = useBookParkingMutation();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [post, setPost] = useState('');

    const handleSubmit = () => {
        if (post) {
            const postData = {
                post: post,
            }

            setOpen(false);

        }
    }

    return (
        <>
            <Button color="secondary" variant="contained" sx={{ textTransform: 'capitalize' }} onClick={handleOpen}>Write</Button>
            <Dialog
                open={open}
                fullScreen={fullScreen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <Box sx={{ border: '1px solid #fff', borderRadius: '5px' }}>
                    <DialogTitle>Post to Feed</DialogTitle>
                    <DialogContent sx={fullScreen ? null : { width: "500px" }}>
                        <DialogContentText id="alert-dialog-slide-description">
                            <Box sx={{ marginTop: "10px" }}>
                                <Typography component="div" sx={{ margin: "auto" }}>
                                    <InputBase
                                        type="text"
                                        label="Post"
                                        name="post"
                                        sx={{ width: "100%", border: '1px solid rgba(0,0,0, 0.7)', padding: "10px", borderRadius: '5px' }}
                                        onChange={(e) => setPost(e.target.value)}
                                        value={post}
                                        multiline
                                        rows={8}
                                        placeholder="Write your post here ..."
                                        variant="filled"
                                    />
                                </Typography>
                            </Box>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Box display="flex" justifyContent="end">
                            <Button color="secondary" onClick={handleClose}>Cancel</Button>
                            <Button color="secondary" onClick={handleSubmit}>Post</Button>
                        </Box>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    );
}