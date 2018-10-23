
import * as _ from "lodash";
import * as React from "react"

const dummyArray = [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,1,0,0,0,0,2,0,0,0,0,0,2,0,0,0,1,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,0];
let index = 0;
const target: number[] = [];
const canvas = "canvas";
export class MappedData extends React.Component {


    public renderCanvas() {
        setTimeout(() => {
            target.push(dummyArray[index]);
            index++;
            this.refreshCanvas();
        }, 0)
    }

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

    public refreshCanvas() {
        const canvas1: any = this.refs.canvas;
        const ctx = canvas1.getContext('2d');
        ctx.strokeStyle = "#000";
        ctx.beginPath();
        let x1 = 200;
        let y1 = 200;
        let x2 = 200;
        let y2 = 200;
        let direction = "N";
        _.forEach(target, t => {
            if (t !== 0) {
                direction = this.calculateDirection(t, direction);
            } else {
                ctx.moveTo(x1, y1);
                if (direction === "N") {
                    x2 = x1;
                    y2 = y1 - 10;
                } else if (direction === "S") {
                    x2 = x1;
                    y2 = y1 + 10;
                } else if (direction === "E") {
                    x2 = x1 + 10;
                    y2 = y1;
                } else if (direction === "W") {
                    x2 = x1 - 10;
                    y2 = y1;
                }
                ctx.lineTo(x2, y2);
                x1 = x2;
                y1 = y2;
            }
        });
        // ctx.closePath();
        ctx.stroke();
    }


    public render() {
        this.renderCanvas();
        return (
            <div>
                <canvas width="400" height="400" id={canvas} ref={canvas} />
            </div>
        )
    }
}