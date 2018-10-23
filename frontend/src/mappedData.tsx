
import * as _ from "lodash";
import * as React from "react"
import { IDirectionHistory } from "./SensorData";

const canvas = "canvas";
const step = 20;

interface IMappedDataProps {
    historyData: IDirectionHistory
}
export class MappedData extends React.Component<IMappedDataProps, {}> {

    private img: any = new Image;

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
        ctx.fillRect(0, 0, 400, 400);
        ctx.beginPath();
        ctx.strokeStyle = "#000";
        let x1 = 200;
        let y1 = 200;
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
                    y2 = y1 - step;
                } else if (direction === "S") {
                    x2 = x1;
                    y2 = y1 + step;
                } else if (direction === "E") {
                    x2 = x1 + step;
                    y2 = y1;
                } else if (direction === "W") {
                    x2 = x1 - step;
                    y2 = y1;
                }
                ctx.lineTo(x2, y2);
                x1 = x2;
                y1 = y2;
            }
        });
        // ctx.closePath();
        ctx.stroke();
        this.img.src = "r" + direction + ".png";
        const imagePoint = this.getImagePoint(direction, x1, y1);
        ctx.drawImage(this.img, imagePoint.x, imagePoint.y);
    }


    public render() {
        return (
            <div>
                <canvas width="500" height="500" id={canvas} ref={canvas} />
            </div>
        )
    }
}