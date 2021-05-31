import React, { useCallback, useContext, useEffect, useState } from 'react'
import {SocketContext} from '../context/socket'
import Chart from './Charts'
import { OdriveStat } from '../shared/stats.types'


const Stats = () => {
    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.on('stats', (data: OdriveStat) => {
            setOdriveStats((oldStats) => {
                if (oldStats.length === 75) {
                    return [...oldStats.slice(1), data];
                } else {
                    return [...oldStats, data];
                }
                
            })
        });
    }, [socket]);

    const handleStartStats = useCallback(() => {
        socket.emit("startStats");
    }, [socket]);

    const handleStopStats = useCallback(() => {
        socket.emit("stopStats");
    }, [socket]);

    const [odriveStats, setOdriveStats] = useState<OdriveStat[]>([]);

    return (
        <div>
            <button onClick={handleStartStats}>Start Stats</button>
            <button onClick={handleStopStats}>Stop Stats</button>
            <Chart data={odriveStats} />
        </div>
    );
};

export default Stats;