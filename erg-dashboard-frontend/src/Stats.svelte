<canvas id='myChart'></canvas>

<script lang='ts'>
    import Chart, { ChartData } from 'chart.js';
    import { onMount, afterUpdate } from 'svelte';

    export let velocityData;
    export let torqueData;

    var chart: Chart;
    function createChart() {
        const ctx = <HTMLCanvasElement> document.getElementById('myChart');
        chart = new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                datasets: [
                    {
                        data: velocityData,
                        label: 'Velocity',
                        borderColor: '#61b0ff',
                        borderJoinStyle: 'round',
                        fill: false,
                        yAxisID: 'velocity'
                    },
                    {
                        data: torqueData,
                        label: 'Torque',
                        borderColor: '#2ff786',
                        borderJoinStyle: 'round',
                        fill: false,
                        yAxisID: 'torque'
                    }
                ]
            },
            options: {
                scales: {
                    xAxes: [
                        {
                            type: 'time',
                            time: {
                                unit: 'second',
                                tooltipFormat: 'h:mm:ss',
                                displayFormats: {
                                    'second': 'ss'
                                }
                            },
                            ticks: {
                                autoSkip: true,
                                maxTicksLimit: 10
                            }
                        }
                    ], 
                    yAxes: [
                        {
                            id: 'velocity',
                            type: 'linear',
                            position: 'left',
                            scaleLabel: {
                                display: true,
                                labelString: "rps"
                            }
                        },
                        {
                            id: 'torque',
                            type: 'linear',
                            position: 'right',
                            scaleLabel: {
                                display: true,
                                labelString: "Nm"
                            }
                        }
                    ]
                }
            }
        });
    }

    onMount(createChart);
    afterUpdate(() => chart.update());
</script>