import * as Highcharts from "highcharts";
import * as _ from "lodash";
import * as React from "react";
import { MappedData } from "./mappedData";

interface ISensorData {
    distance: number;
    gyr_x: number;
    gyr_y: number;
    gyr_z: number;
    acc_x: number;
    acc_y: number;
    acc_z: number;
    status: string;
}

const style = {
    flex: {
        display: "inline-block",
        width: "49%" 
    }
}

export default class SensorData extends React.Component {

    private trend: ISensorData[] = [];
    private latestSnapshot: ISensorData;
    private chart: Highcharts.ChartObject;

    public componentDidMount() {
        this.chart = Highcharts.chart("container", {
            legend: {
                align: 'right',
                layout: 'vertical',
                verticalAlign: 'middle'
            },
            plotOptions: {
                line: {
                    marker: {
                        enabled: false
                    }
                }
            },
            series: [{
                data: _.map(this.trend, sd => sd.distance),
                name: "Distance"
            }, {
                data: _.map(this.trend, sd => sd.gyr_x),
                name: "Gyro X"
            }, {
                data: _.map(this.trend, sd => sd.gyr_y),
                name: "Gyro Y"
            }, {
                data: _.map(this.trend, sd => sd.gyr_z),
                name: "Gyro Z"
            }, {
                data: _.map(this.trend, sd => sd.acc_x),
                name: "Acceleration X"
            }, {
                data: _.map(this.trend, sd => sd.acc_y),
                name: "Acceleration Y"
            }, {
                data: _.map(this.trend, sd => sd.acc_z),
                name: "Acceleration Z"
            }],
            title: {
                text: "Sensors"
            },
            yAxis: {
                title: {
                    text: 'Value'
                }
            },

        });
        setInterval(() => this.fetchData(), 1000);
    }
    public render() {
        return <div>
            <h1>Team 0</h1>
            <div style={{ width: "100%", margin: "0 auto" }}>
                <div style={style.flex}>
                    <div id="container" />
                </div>
                <div style={style.flex}>
                    <MappedData />
                </div>
            </div>
            <div style={{ textAlign: "left", paddingLeft: "250px" }}>
                <label style={{ marginRight: "10px", fontSize: "40pt", fontWeight: "bold", minWidth: "250px" }}>Status</label>
                <label style={{ marginRight: "10px", fontSize: "40pt" }}>{this.latestSnapshot !== undefined ? this.latestSnapshot.status : ""}</label>
                <br />
                <br />
                <label style={{ marginRight: "10px", fontWeight: "bold", minWidth: "250px" }}>Gyro X</label>
                <label style={{ marginRight: "10px" }}>{this.latestSnapshot !== undefined ? this.latestSnapshot.gyr_x : ""}</label>
                <br />
                <label style={{ marginRight: "10px", fontWeight: "bold", minWidth: "250px" }}>Gyro Y</label>
                <label style={{ marginRight: "10px" }}>{this.latestSnapshot !== undefined ? this.latestSnapshot.gyr_y : ""}</label>
                <br />
                <label style={{ marginRight: "10px", fontWeight: "bold", minWidth: "250px" }}>Gyro Z</label>
                <label style={{ marginRight: "10px" }}>{this.latestSnapshot !== undefined ? this.latestSnapshot.gyr_z : ""}</label>
                <br />
                <label style={{ marginRight: "10px", fontWeight: "bold", minWidth: "250px" }}>Acc X</label>
                <label style={{ marginRight: "10px" }}>{this.latestSnapshot !== undefined ? this.latestSnapshot.acc_x : ""}</label>
                <br />
                <label style={{ marginRight: "10px", fontWeight: "bold", minWidth: "250px" }}>Acc Y</label>
                <label style={{ marginRight: "10px" }}>{this.latestSnapshot !== undefined ? this.latestSnapshot.acc_y : ""}</label>
                <br />
                <label style={{ marginRight: "10px", fontWeight: "bold", minWidth: "250px" }}>Acc Z</label>
                <label>{this.latestSnapshot !== undefined ? this.latestSnapshot.acc_z : ""}</label>
            </div>
        </div>
    }

    private fetchData() {
        fetch("http://192.168.1.17:5001/api/InputOutput/", {
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json'
            },
        }).then(response => response.json()).then(json => {
            const res = json as ISensorData;
            this.trend.push(res);
            if (this.trend.length > 100) {
                this.trend = _.takeRight(this.trend, 100);
            }
            this.latestSnapshot = res;
        });
        this.chart.update({
            series: [{
                data: _.map(this.trend, sd => sd.distance),
                name: "Distance"
            }, {
                data: _.map(this.trend, sd => sd.gyr_x),
                name: "Gyro X"
            }, {
                data: _.map(this.trend, sd => sd.gyr_y),
                name: "Gyro Y"
            }, {
                data: _.map(this.trend, sd => sd.gyr_z),
                name: "Gyro Z"
            }, {
                data: _.map(this.trend, sd => sd.acc_x),
                name: "Acceleration X"
            }, {
                data: _.map(this.trend, sd => sd.acc_y),
                name: "Acceleration Y"
            }, {
                data: _.map(this.trend, sd => sd.acc_z),
                name: "Acceleration Z"
            }],
        });
        this.forceUpdate();
    }
}