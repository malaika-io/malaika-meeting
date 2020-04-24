import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../lib/hooks';
const useStyles = makeStyles(theme => ({
    layout: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    paper: {
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(8),
            padding: `${theme.spacing(6)}px ${theme.spacing(4)}px`
        }
    },
    submit: {
        margin: theme.spacing(3, 0, 3)
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12
    }
}))

const LoginForm = () => {
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState('');
    const [user, { mutate }] = useUser();
    useEffect(() => {
        // redirect to home if user is authenticated
        if (user) router.replace('/');
    }, [user]);

    async function onSubmit(e) {
        e.preventDefault();
        const body = {
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
        };
        const res = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (res.status === 200) {
            const userObj = await res.json();
            mutate(userObj);
        } else {
            setErrorMsg('Incorrect username or password. Try again!');
        }
    }

    const classes = useStyles({})
    const [formData, setFormData] = useState({email: '', password: ''})
    const [submitting, setSubmitting] = useState(false)

    return (
        <main className={classes.layout}>
            <Paper className={classes.paper} elevation={2}>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                >
                    <Typography component="h1" variant="h4" gutterBottom>
                        Login
                    </Typography>
                    <Typography component="p" gutterBottom>
                        Log in to your account dashboard
                    </Typography>
                </Box>
                <form method="post" className={classes.form} noValidate>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        defaultValue={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        defaultValue={formData.password}
                        onChange={e => setFormData({...formData, password: e.target.value})}
                    />
                    <Box mb={6}>
                        <Button
                            disabled={submitting}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {submitting && (
                                <CircularProgress size={24} className={classes.buttonProgress}/>
                            )}
                            {submitting ? 'Connectez-vous...' : 'Se connecter'}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </main>
    )
}

export default LoginForm
