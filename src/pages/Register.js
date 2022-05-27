import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useSignUpUserMutation } from '../app/reducers/auth';
import { LoaderVisibility } from '../app/slices/loaderSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    imageWrapper: {
        // backgroundColor: '#34acdc',
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
        marginTop: "10px !important",
        marginLeft: "55px !important"
    },
    formWrapper: {
        width: "400px",
        margin: "auto",
        marginTop: "50px",
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
        }
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
    name: yup
        .string("Enter your name")
        .required("Name is required"),
    email: yup
        .string("Enter your email")
        .min(4, "Email should of minimum 4 characters")
        .required("Email is required"),
    password: yup
        .string("Enter your password")
        .min(8, "Password should of minimum 8 characters")
        .required("Password is required"),
    confirmPassword: yup
        .string("Enter your password")
        .min(8, "Password should of minimum 8 characters")
        .required("Password is required")
});

function Register() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [registerUser, { isLoading, isError, isSuccess, ...data }] = useSignUpUserMutation();

    useEffect(() => {
        // console.log(data)
        if (isLoading) {
            dispatch(LoaderVisibility(true))
        }
        else if (isError) {
            dispatch(LoaderVisibility(false))
            toast.error(data.error.error, {
                position: 'top-center',
                autoClose: 2000
            })
        }
        else if (isSuccess) {
            // console.log(data);
            if (data.data.success) {
                toast.success(data.data.message, {
                    position: 'top-center',
                    autoClose: 2000
                });
                dispatch(LoaderVisibility(false))
                navigate('/')
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
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: validationSchema,
        onSubmit: (data, { resetForm }) => {
            registerUser(data);
            resetForm({});
        }
    })

    const backToLogin = (e) => {
        e.preventDefault();
        navigate('/')
    }

    return (
        <>
            <Box>
                <Grid container spacing={0}>
                    <Grid item xs={12} md={5} sm={12}>
                        <Box>
                            <Typography color="secondary" variant="h5" className={classes.head}>TweetX</Typography>
                            <Button color="primary" variant="outlined" style={{ fontWeight: 'bolder', textTransform: 'capitalize', marginLeft: "55px", marginTop: "30px" }} onClick={backToLogin}>Login</Button>
                            <Box component="form" onSubmit={formik.handleSubmit} className={classes.formWrapper}>
                                <Typography color="primary" variant='h4' style={{ marginBottom: "40px", fontWeight: 'bolder' }}>Create Account</Typography>
                                <div>
                                    <TextField
                                        id="outlined-required"
                                        label="Name"
                                        fullWidth
                                        name="name"
                                        sx={{ marginBottom: "10px", marginTop: "10px" }}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.name}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="outlined-required"
                                        label="Email"
                                        fullWidth
                                        name="email"
                                        sx={{ marginBottom: "10px", marginTop: "10px" }}
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
                                        sx={{ marginBottom: "10px", marginTop: "10px" }}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        type="password"
                                        id="outlined-required"
                                        label="Confirm Password"
                                        fullWidth
                                        name="confirmPassword"
                                        sx={{ marginBottom: "10px", marginTop: "10px" }}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.confirmPassword}
                                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                    />
                                </div>
                                <Box display="flex" justifyContent="end" sx={{ marginTop: "30px" }}>
                                    <Button type="submit" variant="contained" color="secondary" className={classes.btn}>Register</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={7} sm={12}>
                        <Box className={classes.imageWrapper}>
                            <Box>
                                <Typography variant="h5" sx={{ color: "#fff", textAlign: 'center', fontWeight: "bold", marginTop: "35px", marginBottom: "50px" }}>Welcome to the learning platform</Typography>
                                <img src={require('../assets/pablo-sign-in.png')} className={classes.mainImg} alt="" />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default Register;