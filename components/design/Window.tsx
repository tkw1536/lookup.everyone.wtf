import * as React from "react";

interface WindowProps {
    title?: React.ReactNode;

    glass?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export default class Window extends React.Component<WindowProps> {
    render() {
        const { title, children, glass, className } = this.props;

        const classNames = ["window"];
        if (glass) classNames.push("glass");
        if (className) classNames.push(className);

        return <div className={classNames.join(" ")}>
            <div className="title-bar">
                <div className="title-bar-text">{title}</div>
                <div className="title-bar-controls">
                    <button aria-label="Close"></button>
                </div>
            </div>
            <div className="window-body">{children}</div>
        </div>;
    }
}