import React, {useState} from 'react'
import {
    Avatar, Button, CssBaseline, TextField,
     Grid, Box, Typography, Container
} from '@material-ui/core';
import {Link} from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Loader from '../components/Loader'
import { userRegister } from '../redux/actions/userAction'
import { useHistory } from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux'

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

const Register = () => {
    const classes = useStyles()
    const reduxData = useSelector(store => store.userRoot)
    const {loader} = reduxData
    const history = useHistory()
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const formHandler = (e) => {
        e.preventDefault()
        if (name && email && password) {
            dispatch(userRegister({name, email, password}, history))
        }
        else {
            alert("Fields are empty")
        }
    }

    return (
        <Container className="bg-white" component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5"> REGISTER </Typography>
                <form className={classes.form} onSubmit={formHandler} noValidate>
                    <TextField type="text" label="Name" variant="outlined" margin="normal" required
                        fullWidth autoFocus value={name} onChange={(e) => setName(e.target.value)}
                    />
                    <TextField type="email" label="Email" variant="outlined" margin="normal" required
                        fullWidth autoFocus value={email} onChange={(e)=>setEmail(e.target.value)}
                    />
                    <TextField type="password" variant="outlined" margin="normal" required fullWidth
                        label="Password" value={password} onChange={(e)=>setPassword(e.target.value)}
                    />
                    {loader ? <Loader /> : <Button type="submit" fullWidth variant="contained" color="primary"
                        className={classes.submit}> REGISTER </Button> }
                   
                    <Grid container>
                        <Grid item xs>
                        </Grid>
                        <Grid item>
                            <Link to="/" variant="body2">
                                {"Already account? Login"}
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

export default Register
