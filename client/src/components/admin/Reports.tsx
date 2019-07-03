import React, {Component} from 'react';
import axios from 'axios';
import {Bar, Line, Pie} from 'react-chartjs-2';

//Block for admin only//

interface IReportsState {
    chartData: Record<any, any>
}

class Reports extends Component <IReportsState> {

    componentDidMount(): void {
        axios.get(`api/vacations/current/followed`)
            .then(res => {
                const numFollowers = res.data.map((numFollowers: any) => numFollowers.numOfFollowers);
                const description = res.data.map((description: any) => description.description);
                this.setState({
                    chartData: {
                        labels: description,
                        datasets: [
                            {
                                label: 'User Follows',
                                data: numFollowers
                            }
                        ]
                    }
                })
            })
    }

    state: IReportsState = {
        chartData: {
            labels: [],
            datasets: [
                {
                    label: 'User Follows',
                    data: [],
                    backgroundColor: [
                        'rgba(255,99,132,0.6)',
                        'rgba(54,162,235,0.6)',
                        'rgba(75,206,86,0.6)',
                        'rgba(153,102,255,0.6)',
                        'rgba(255,159,64,0.6)',
                        'rgba(255,99,132,0.6)'
                    ]
                }
            ],
        }
    };

    render() {
        return (
            <div className="chart">
                <Bar
                    data={this.state.chartData}
                    options={{
                        title: {
                            display: true,
                            text: 'Followed Vacations by Users',
                            fontSize: 25
                        },
                        legend: {
                            display: true,
                            position: 'bottom'
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }}
                />
            </div>
        );
    }
}

export default Reports;
