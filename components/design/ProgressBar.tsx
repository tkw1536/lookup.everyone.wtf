import * as React from "react";


interface ProgressBarProps {
    style?: "" | "paused" | "error";
    animate?: boolean;
    marquee?: boolean;
    value?: number;
}

export default class ProgressBar extends React.Component<ProgressBarProps> {
    render() {
        const { style, value, animate, marquee } = this.props;

        const classNames: Array<string> = [];
        if (style !== undefined && style !== "") classNames.push(style);
        if (animate) { classNames.push("animate"); }
        if (marquee) { classNames.push("marquee"); }

        const valueOK = value !== undefined;
        return <div
            role="progressbar"
            className={classNames.join(" ")} aria-valuemin={valueOK ? 0 : undefined} aria-valuemax={valueOK ? 100 : undefined} aria-valuenow={valueOK ? value : undefined}>
            {valueOK && <div style={{ width: `${value}%` }} />}
        </div>
    }
}