import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'

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
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: validationSchema,
        onSubmit: (data, { resetForm }) => {
            console.log(data);
            localStorage.setItem('role', 'student')
            localStorage.setItem('isauth', true)
            navigate('/tutor-list')
            resetForm({});
        }
    })

    const createAccount = (e) => {
        e.preventDefault();
        navigate('/register')
    }

    return (
        <>
            <Box>
                <Grid container spacing={0}>
                    <Grid item xs={12} md={5} sm={12}>
                        <Box>
                            <Typography color="secondary" variant="h5" className={classes.head}>TweetX</Typography>
                            <Button color="primary" variant="outlined" style={{ fontWeight: 'bolder', textTransform: 'capitalize', marginLeft: "55px", marginTop: "30px" }} onClick={createAccount}>Create Account</Button>
                            <Box component="form" onSubmit={formik.handleSubmit} className={classes.formWrapper}>
                                <Typography color="primary" variant='h4' style={{ marginBottom: "40px", fontWeight: 'bolder' }}>Login</Typography>
                                <div>
                                    <TextField
                                        id="outlined-required"
                                        label="Email"
                                        fullWidth
                                        name="email"
                                        sx={{ marginBottom: "7px" }}
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
                                        sx={{ marginTop: "7px" }}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                    />
                                </div>
                                <Box display="flex" justifyContent="space-between" sx={{ marginTop: "30px" }}>
                                    <Link to="/forgot-password" className={classes.forgotPswrd}>Forgot Password?</Link>
                                    <Button type="submit" variant="contained" color="secondary" className={classes.btn}>Login</Button>
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

export default Login;