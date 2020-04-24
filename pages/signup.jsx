import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from "@material-ui/core/CircularProgress";
import Router from 'next/router';
import {useUser} from '../lib/hooks';

const useStyles = makeStyles(theme => ({
    layout: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '768px',
        margin: '0 auto'
    },
    paper: {
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(8),
            padding: `${theme.spacing(6)}px ${theme.spacing(4)}px`
        }
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
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
}));

const Signup = () => {
    const [user, {mutate}] = useUser();
    const [errorMsg, setErrorMsg] = useState('');
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    });
    const [submitting, setSubmitting] = useState(false);
    useEffect(() => {
        if (user) Router.replace('/profile');
    }, [user]);

    const classes = useStyles({});
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/users/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
        });
        if (res.status === 201) {
            const userObj = await res.json();
            mutate(userObj);
        } else {
            setErrorMsg(await res.text());
        }
    };

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
                        S'inscrire
                    </Typography>
                </Box>

                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="firstName"
                        label="Prénom"
                        name="first_name"
                        autoComplete="fname"
                        autoFocus
                        defaultValue={formData.first_name}
                        onChange={e => setFormData({...formData, first_name: e.target.value})}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="lastName"
                        label="Nom de famille"
                        name="last_name"
                        autoComplete="lname"
                        defaultValue={formData.last_name}
                        onChange={e => setFormData({...formData, last_name: e.target.value})}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="e-mail"
                        name="email"
                        autoComplete="email"
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
                        autoComplete="new-password"
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
                            {submitting ? 'Enregistrement...' : "S'inscrire"}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </main>
    )
}

export default Signup
