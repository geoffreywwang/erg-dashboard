import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { SocketContext, socket } from './context/socket';
import {CssBaseline, ThemeProvider} from "@material-ui/core";
import theme from "./shared/theme";

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <SocketContext.Provider value={socket}>
                <CssBaseline/>
                <App />
            </SocketContext.Provider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);