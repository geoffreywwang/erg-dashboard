import React, { useContext, useCallback } from 'react'
import { SocketContext } from '../context/socket'
import {Button, Card, Grid, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    card: {
        // height: '80vh',
        // maxHeight: '450px'
    },
    button: {
        margin: theme.spacing(1.5),
        [theme.breakpoints.up('xs')]: {
            height: '10vh',
            maxHeight: '100px'
        },
        [`${theme.breakpoints.up('sm')} and (orientation: landscape)`]: {
            height: '30vh',
            maxHeight: '200px'
        }
    }
}));

const Stats = () => {
    const classes = useStyles();
    const socket = useContext(SocketContext);

    const handleStart = useCallback(() => {
        socket.emit("closedLoop");
    }, [socket]);

    const handleStop = useCallback(() => {
        socket.emit("idle");
    }, [socket]);

    const handleClearError = useCallback(() => {
        socket.emit("clearErrors");
    }, [socket]);

    return (
        <Card>
            <Grid container direction='column' justify="space-evenly" className={classes.card}>
                <Button
                    variant="contained"
                    color="primary"
                    size='large'
                    onClick={handleStart}
                    className={classes.button}>
                    Start
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    size='large'
                    onClick={handleStop}
                    className={classes.button}>
                    Stop
                </Button>
            </Grid>
        </Card>
    );
};

export default Stats;