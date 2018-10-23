
import * as _ from "lodash";
import * as React from "react"
import { IDirectionHistory } from "./SensorData";

const canvas = "canvas";

const minStep = 5;

interface IMappedDataProps {
    historyData: IDirectionHistory
}
export class MappedData extends React.Component<IMappedDataProps, {}> {

    private step: number = 50;
    private img: any = new Image;
    private check: any = new Image;
    private startx: number = 50;
    private starty: number = 450;
    private success: boolean = false;

    public calculateDirection(t: number, direction: string) {
        switch (direction) {
            case "N":
                return t === 1 ? "W" : "E";
            case "S":
                return t === 1 ? "E" : "W";
            case "E":
                return t === 1 ? "N" : "S";
            case "W":
                return t === 1 ? "S" : "N";
            default: return direction;
        }
    }

    public componentDidMount() {
        this.check.src = "checkered.png";
        if (this.props.historyData && this.props.historyData.values) {
            this.renderCanvas(this.props);
        }
    }

    public componentWillReceiveProps(newProps: IMappedDataProps) {
        if (newProps.historyData && newProps.historyData.values) {
            this.renderCanvas(newProps);
        }
    }

    public getImagePoint(dir: any, x: number, y: number): any {

        switch (dir) {
            case "N":
            case "S":
                return { x: x - 11, y: y - 17 };
            case "E":
            case "W":
                return { x: x - 17, y: y - 11 };
            default:
                return { x, y };
        }
    }

    public renderCanvas(props: IMappedDataProps) {
        const canvas1: any = this.refs.canvas;
        const ctx = canvas1.getContext('2d');
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, 500, 500);
        ctx.beginPath();
        ctx.strokeStyle = "#000";
        let x1 = this.startx;
        let y1 = this.starty;
        let x2 = 200;
        let y2 = 200;
        let direction = "N";
        _.forEach(props.historyData.values, t => {
            if (t !== 0) {
                direction = this.calculateDirection(t, direction);
            } else {
                ctx.moveTo(x1, y1);
                if (direction === "N") {
                    x2 = x1;
                    y2 = y1 - this.step;
                } else if (direction === "S") {
                    x2 = x1;
                    y2 = y1 + this.step;
                } else if (direction === "E") {
                    x2 = x1 + this.step;
                    y2 = y1;
                } else if (direction === "W") {
                    x2 = x1 - this.step;
                    y2 = y1;
                }
                ctx.lineTo(x2, y2);
                x1 = x2;
                y1 = y2;
            }
            if ((x2 < 0 || x2 > 500) || (y2 < 0 || y2 > 500)) { this.step = Math.max(this.step - 5, minStep); }

        });
        // ctx.closePath();
        ctx.stroke();
        this.img.src = "r" + direction + ".png";
        const imagePoint = this.getImagePoint(direction, x1, y1);
        ctx.drawImage(this.img, imagePoint.x, imagePoint.y);

        if (x2 === this.startx && y2 === this.starty) {
            this.success = true;
        }

        if (this.success) {
            ctx.drawImage(this.check, 250, 250);
        }
    }


    public render() {
        return (
            <div>
                <canvas width="500" height="500" id={canvas} ref={canvas} />
            </div>
        )
    }
}