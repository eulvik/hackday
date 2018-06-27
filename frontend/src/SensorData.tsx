import * as React from "react";

export default class SensorData extends React.Component {

    private lastFetch: object;
    public componentDidMount() {
        setInterval(() => this.fetchData(), 1000);
    }
    public render() {
        return <h1>Hello world {JSON.stringify(this.lastFetch)}</h1>;
    }

    private fetchData() {
        fetch("http://localhost:5001/api/InputOutput/", {
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json'
            },
        })
        .then(response => response.json()).then(json => this.lastFetch = json);
        this.forceUpdate();
    }
}