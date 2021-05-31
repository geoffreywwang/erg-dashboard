import React from 'react';
import { OdriveStat } from '../shared/stats.types'
import {Line} from 'react-chartjs-2';

type ChartProps = {
    data: OdriveStat[]
};

const Chart = (props: ChartProps) => {
    const velocityTorqueData = {
        datasets: [
            {
                label: "Velocity",
                data: props.data.map(
                    (stat: OdriveStat) => ({
                        t: stat.time,
                        y: stat.velocity
                    })
                ),
                fill: false,
                yAxisID: 'velocity',
                borderColor: '#17cdff'
            }, {
                label: "Torque",
                data: props.data.map(
                    (stat: OdriveStat) => ({
                        t: stat.time,
                        y: stat.torque
                    })
                ),
                fill: false,
                yAxisID: 'torque',
                borderColor: '#0ef05d'
            }, {
                label: "Voltage",
                data: props.data.map(
                    (stat: OdriveStat) => ({
                        t: stat.time,
                        y: stat.voltage
                    })
                ),
                fill: false,
                yAxisID: 'voltage',
                borderColor: '#f04646'
            }, {
                label: "Current",
                data: props.data.map(
                    (stat: OdriveStat) => ({
                        t: stat.time,
                        y: stat.current
                    })
                ),
                fill: false,
                yAxisID: 'current',
                borderColor: '#fcba03'
            },
        ]
    };

    const legend = {
        display: true,
        position: "top",
        labels: {
            fontColor: "#323130",
            fontSize: 14
        }
    };

    const options = {
        animation: {
            duration: 0
        },
        title: {
            display: true,
            text: "Odrive Stats"
        },
        scales: {
            xAxes: [
                {
                    type: 'time',
                    time: {
                        unit: 'second',
                        displayFormats: {
                            second: 'ss'
                        }
                    },
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 20
                    }
                }
            ],
            yAxes: [
                {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'velocity',
                    scaleLabel: {
                        display: true,
                        labelString: 'Velocity'
                    }
                },
                {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'torque',
                    scaleLabel: {
                        display: true,
                        labelString: 'Torque'
                    }
                }, {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    id: 'voltage',
                    ticks: {
                        suggestedMin: 18,
                        suggestedMax: 21,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Voltage'
                    }
                }, {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    id: 'current',
                    ticks: {
                        // suggestedMin: 18,
                        // suggestedMax: 21,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Current'
                    }
                }
            ]
        }
    };
    return (
        <div>
            <Line data={velocityTorqueData} legend={legend} options={options}/>
        </div>
    );
};

export default Chart;