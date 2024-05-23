import {ConnectionLineComponentProps} from "reactflow";

export default ({ fromX, fromY, toX, toY }: ConnectionLineComponentProps) => {


    return (
        <g>
            <path
                fill="none"
                strokeWidth={1.5}
                stroke={"blue"}
                className="animated"
                d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
            />
            <circle
                stroke={"blue"}
                cx={toX}
                cy={toY}
                fill="#fff"
                r={3}
                strokeWidth={1.5}
            />
        </g>
    );
};
