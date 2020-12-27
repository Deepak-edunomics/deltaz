import React, { useState , useEffect} from 'react'
import {
    Avatar, Button, CssBaseline, TextField,
    Grid, Box, Typography, Container
} from '@material-ui/core';
import { Link } from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Loader from '../components/Loader'
import { useSelector, useDispatch } from 'react-redux'
import { userLogin } from '../redux/actions/userAction'
import {useHistory} from 'react-router-dom'
import { red } from '@material-ui/core/colors';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = () => {
    const classes = useStyles()
    const reduxData = useSelector(store => store.userRoot)
    const {loader} = reduxData
    const dispatch = useDispatch()
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (reduxData.isAuthenticated && Object.keys(reduxData).length !== 0) {
            history.push('/home')
        }

    }, [])

    const formHandler = (e) => {
        e.preventDefault()
        if (email && password) {
            dispatch(userLogin({email, password},history))
        }
        else {
            alert("Field cannot be empty")
        }
    }

    return (
        <Container className="bg-white" component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5"> LOGIN </Typography>
                <form className={classes.form} onSubmit={formHandler} noValidate>
                    <TextField type="email" label="Email" variant="outlined" margin="normal" required
                        fullWidth autoFocus value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField type="password" variant="outlined" margin="normal" required fullWidth
                        label="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    {loader ? <Loader /> : <Button type="submit" fullWidth variant="contained" color="primary"
                        className={classes.submit}> LOGIN </Button>}
                    <Grid container>
                        <Grid item xs>
                        </Grid>
                        <Grid item>
                            <Link to="/sign-up" variant="body2">
                                {"Dont have an account? Register"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    )
}

export default Login
