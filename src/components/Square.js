import { Button } from "react-bootstrap";

export default function Square({ value, color, doOnUserMove }) {
    return (<Button className="square" id={value} variant={color} style={{ width: "50px", height: "50px" }}
        onClick={() => {
            console.log(value);
            doOnUserMove(value);
        }} />);
}