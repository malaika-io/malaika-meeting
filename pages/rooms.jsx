import React, { Component } from "react"
import {Card} from '@material-ui/core';
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "../components/Button";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import fetch from 'node-fetch'
import Router from "next/router";

//const [open, setOpen] = React.useState(false);

class RoomsPage extends Component {
    state = {
        rooms: []
    };


    componentDidMount() {
        this.callApi()
            .then(res => {
                console.log(res)
                this.setState({
                    rooms: res
                })
            })
            .catch(err => console.log(err));
    }


    callApi = async () => {
        const response = await fetch('/api/rooms');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    handleClickOpen = () => {
        ////setOpen(true);
    };

     handleClose = () => {
        //setOpen(false);
    };

    /* const [errorMsg, setErrorMsg] = useState('');
     const [open, setOpen] = React.useState(false);
     const [formData, setFormData] = useState({email: '', password: ''});
     const [submitting, setSubmitting] = useState(false);
    */

    /*async function onSubmit(e) {
        e.preventDefault();

        const res = await fetch('/api/rooms', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
        });
        if (res.status === 200) {
            await Router.push("/rooms");
        }
    }


 */
    render() {
        return (
            <section>
                {this.state.rooms && this.state.rooms.map(room => (
                    <Card>
                        <CardContent>
                            {room.name}
                        </CardContent>
                        <CardActions>
                            <Button size="small">Go to room</Button>
                        </CardActions>
                    </Card>
                ))}
                {!this.state.rooms && <div>Loading...</div>}
                {!this.state.rooms && <Button variant="contained" color="primary" onClick={this.handleClickOpen()}>Add room</Button>}
                {/* {!rooms && <Button variant="contained" color="primary" onClick={handleClickOpen}>Add room</Button>}
            <Button variant="contained" color="primary">
                Add mores rooms
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText>
                    <form  noValidate onSubmit={onSubmit}>
                        {errorMsg ? <p style={{color: 'red'}}>{errorMsg}</p> : null}
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

                        <Box mb={6}>
                            <Button
                                disabled={submitting}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                {submitting && (
                                    <CircularProgress size={24}/>
                                )}
                                {submitting ? 'Connectez-vous...' : 'Se connecter'}
                            </Button>
                        </Box>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>*/}
            </section>
        );
    }
}


export default RoomsPage;
