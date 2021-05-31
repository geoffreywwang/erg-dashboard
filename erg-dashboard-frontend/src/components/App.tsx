import React, { useCallback, useContext, useEffect } from 'react';
import Stats from './Stats';
import Controller from './Controller'
import { SocketContext } from '../context/socket';
import {BottomNavigation, BottomNavigationAction, Container, Grid, makeStyles} from "@material-ui/core";
import {BugReportRounded, FavoriteRounded, TrendingUpRounded} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100%',
    },
    bottomNav: {
        maxWidth: '600px',
        margin: theme.spacing(1.5),
        width: '75vw',
        bottom: 0,
        position: 'fixed',
    }
}));

const App = () => {
    const classes = useStyles();
    const socket = useContext(SocketContext);

    const handleStop = useCallback(() => {
        socket.emit("idle");
        socket.emit("stopStats");
    }, [socket]);
    
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                handleStop();
                e.preventDefault();
                return false;
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return function cleanup() {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleStop]);

    return (
        <Container>
            <Grid container spacing={2} justify='center' className={classes.container}>
                <Grid item xs={12} sm={4}>
                    <Controller />
                </Grid>
                {/*<Grid item xs>*/}
                {/*    <Stats />*/}
                {/*</Grid>*/}

                <BottomNavigation
                    value={1}
                    showLabels
                    className={classes.bottomNav}
                >
                    <BottomNavigationAction label='Debug' icon={<BugReportRounded/>} />
                    <BottomNavigationAction label='Exercise' icon={<FavoriteRounded/>} />
                    <BottomNavigationAction label='Stats' icon={<TrendingUpRounded/>} />
                </BottomNavigation>
            </Grid>
        </Container>
    );
};

export default App;