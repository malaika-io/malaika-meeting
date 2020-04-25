import React, {Component, useState} from "react"
import {Card} from '@material-ui/core';
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import fetch from 'node-fetch'
import Link from 'next/link';
import {useRouter} from "next/router";
import {BrowserRouter, Route} from 'react-router-dom';
import Room from './[room]';
//const router = useRouter();

class RoomsPage extends Component {


    constructor(props) {
        super(props);
        this.handleClose = this._handleClose.bind(this);
        this.handleClickOpen = this._handleClickOpen.bind(this);
        this.state = {open: false, rooms: [], formData: {name: ""}, submitting: false};
        this.onSubmit = this.onSubmit.bind(this);
    }

    _handleClose() {
        this.setState({open: false});
    }

    _handleClickOpen() {
        this.setState({open: true});
    }

    goToRoom(history, roomId) {
        this.props.history.push('/dashboard')
    }

    componentDidMount() {
        this.fetchRooms();
    }

    fetchRooms() {
        fetch('/api/rooms')
            .then(res => res.json())
            .then((data) => {
                this.setState({rooms: data})
            })
            .catch(console.log)
    }

    async onSubmit(e) {
        e.preventDefault();
        const res = await fetch('/api/rooms', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.formData),
        });
        if (res.status === 200) {
            this._handleClose();
            this.fetchRooms();
        }
    }


    render() {
        return (
            <section>
                {this.state.rooms && this.state.rooms.map(room => (
                    <Card>
                        <CardContent>
                            {room.name}
                        </CardContent>
                        <CardActions>
                            <Link href="rooms/[name]" as={`rooms/${room.name}`} >
                                <Button variant="outlined" color="primary">Go to
                                    room</Button>
                            </Link>

                        </CardActions>
                    </Card>
                ))}
                {this.state.rooms.length === 0 &&
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Create ur First room !
                </Button>
                }

                <div>
                    <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                        Add mores rooms !
                    </Button>

                    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Room</DialogTitle>
                        <form noValidate onSubmit={this.onSubmit}>
                            <DialogContent>
                                <DialogContentText>
                                    Create a Room
                                </DialogContentText>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                    defaultValue={this.state.formData.name}
                                    onChange={e => this.state.formData.name = e.target.value}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose} color="primary">
                                    Annuler
                                </Button>

                                <Button
                                    disabled={this.state.submitting}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    envoyer
                                </Button>
                            </DialogActions>
                        </form>
                    </Dialog>
                </div>
            </section>
        );
    }
}


export default RoomsPage;
