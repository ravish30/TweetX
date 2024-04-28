import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useSignInUserMutation } from '../app/reducers/auth';
import { LoginUser } from '../app/slices/authSlice';
import { LoaderVisibility } from '../app/slices/loaderSlice';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
    imageWrapper: {
        height: "100vh",
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: "10px",
        paddingRight: "10px",
        [theme.breakpoints.down('md')]: {
            height: "80vh"
        }
    },
    head: {
        fontWeight: '700 !important',
        paddingTop: "40px",
        paddingLeft: "70px"
    },
    formWrapper: {
        width: "400px",
        margin: "auto",
        marginTop: "80px",
        [theme.breakpoints.down('md')]: {
            width: "320px",
        }
    },
    mainImg: {
        width: "500px",
        [theme.breakpoints.between(900, 1250)]: {
            width: "400px"
        },
        [theme.breakpoints.down(550)]: {
            width: "100%",
        },
        marginTop: '40px'
    },
    forgotPswrd: {
        textDecoration: 'none',
        fontSize: "13px",
        color: theme.palette.primary.main,
        marginTop: '3px',
        fontWeight: 'bolder'
    },
    btn: {
        color: "#fff !important",
        padding: "9px 30px !important",
        borderRadius: "10px !important",
        boxShadow: 'none',
        textTransform: 'capitalize !important'
    },
    link: {
        textDecoration: 'none',
        color: "blue"
    }
}))

const validationSchema = yup.object({
    email: yup
        .string("Enter your email")
        .min(4, "Email should of minimum 4 characters")
        .required("Email is required"),
    password: yup
        .string("Enter your password")
        .min(8, "Password should of minimum 8 characters")
        .required("Password is required")
});

function Login() {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginUser, { isLoading, isError, isSuccess, ...data }] = useSignInUserMutation();

    useEffect(() => {
        // console.log(data)
        if(isLoading)
        {
            dispatch(LoaderVisibility(true))
        }
        else if(isError)
        {
            dispatch(LoaderVisibility(false))
            toast.error(data.error.error, {
                position: 'top-center',
                autoClose: 2000
            })
        }
        else if(isSuccess)
        {
            // console.log(data);
            if(data.data.success)
            {
                toast.success(data.data.message, {
                    position: 'top-center',
                    autoClose: 2000
                });
                dispatch(LoaderVisibility(false))
                dispatch(LoginUser(data.data.token));
                localStorage.setItem('isAuth', true)
                localStorage.setItem('token', data.data.token)
                navigate('/feed')
            }
            else {
                toast.warning(data.data.message, {
                    position: 'top-center',
                    autoClose: 2000
                });
                dispatch(LoaderVisibility(false))
            }
        }
    }, [data])

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: validationSchema,
        onSubmit: (userData, { resetForm }) => {
            loginUser(userData)
            resetForm({});
        }
    })

    const createAccount = (e) => {
        e.preventDefault();
        navigate('/register')
    }

    return (
        <>
            <Box style={{ backgroundColor: '#6332a8' }}>
                <Typography color="primary" variant="h3" className={classes.head}>TweetX</Typography>
                <Grid container spacing={0}>
                    <Grid item xs={12} md={5} sm={12}>
                        <Box>
                            <Button color="primary" variant="outlined" style={{ fontWeight: 'bolder', textTransform: 'capitalize', marginLeft: "75px", marginTop: "50px" }} onClick={createAccount}>Create Account</Button>
                            <Box component="form" onSubmit={formik.handleSubmit} className={classes.formWrapper}>
                                <Typography color="primary" variant='h4' style={{ marginBottom: "50px", fontWeight: 'bolder' }}>Login</Typography>
                                <div>
                                    <TextField
                                        id="outlined-required"
                                        label="Email"
                                        fullWidth
                                        name="email"
                                        sx={{ marginBottom: "10px", color: '#ffffff' }}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        type="password"
                                        id="outlined-required"
                                        label="Password"
                                        fullWidth
                                        name="password"
                                        sx={{ marginTop: "10px", color: '#ffffff' }}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                    />
                                </div>
                                <Box display="flex" justifyContent="space-between" sx={{ marginTop: "50px" }}>
                                    <Link to="/forgot-password" className={classes.forgotPswrd}>Forgot Password?</Link>
                                    <Button type="submit" variant="contained" color="secondary" className={classes.btn}>Login</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={7} sm={12}>
                        <Box className={classes.imageWrapper}>
                            <Box>
                                <Typography variant="h4" sx={{ color: "#fff", textAlign: 'center', fontWeight: "bold", marginTop: "35px", marginBottom: "50px" }}>Welcome to the Best Social Media platform</Typography>
                                <img src={require('../assets/tweetImage.png')} className={classes.mainImg} alt="" />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default Login;