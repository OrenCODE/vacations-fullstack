import React, {Component} from 'react';
import axios from 'axios';
import {connect} from "react-redux";
import {Bar} from 'react-chartjs-2';
import {Link} from "react-router-dom";
import {IAdminProps} from "./Admin";

interface IReportsState {
    chartData: Record<any, any>
}

class Reports extends Component <IAdminProps, IReportsState> {
    interval: any;

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
            ]
        }
    };

    componentDidMount(): void {
        if (this.props.auth.isAuthenticated && this.props.auth.user.isAdmin === true) {
            this.props.history.push('/reports');
            this.interval = setInterval(() => this.getReports(), 2000);
        } else {
            this.props.history.push('/dashboard')
        }
    }

    componentWillUnmount(): void {
        clearInterval(this.interval)
    }

    getReports(): any {
        const bearerToken = localStorage.getItem('jwtToken');
        axios.get(`api/vacations/current/followed`, {headers: {Authorization: bearerToken}})
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

    render() {
        return (
            <div className="create-profile">
                <div className="container">
                    <Link to="/admin" className="btn btn-light">
                        Go Back
                    </Link>
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
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Reports);
