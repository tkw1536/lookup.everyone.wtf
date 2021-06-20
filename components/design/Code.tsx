import * as React from "react";

export default class Code extends React.Component<{ children: string }> {
    render() {
        const { children } = this.props;
        return <code style={{whiteSpace: "pre-wrap"}}>{children.split("\n").map((v, i) => <React.Fragment key={i}>{v}<br /></React.Fragment>)}</code>
    }
}