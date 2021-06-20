import * as React from "react";

import CopyToClipboard from "react-copy-to-clipboard";

import styles from "./Copyable.module.css";

export default class Copyable extends React.Component<{ children: string }, { copied: boolean }> {
    state: { copied: boolean } = { copied: false }

    private copyTimeout?: number;
    private setCopy = () => {
        this.setState({ copied: true }, () => {
            this.clearTimeout();

            setTimeout(() => {
                this.copyTimeout = undefined;
                this.setState({ copied: false });
            }, 1000);
        })
    }

    private clearTimeout() {
        if (this.copyTimeout !== undefined) {
            clearTimeout(this.copyTimeout)
            this.copyTimeout = undefined;
        }
    }

    render() {
        const { children } = this.props;
        const { copied } = this.state;
        return <span>
            <code>{children}</code>
            <CopyToClipboard text={children} onCopy={this.setCopy}>
                <a className={styles.overlay}>
                    {copied ? "Copied" : "Copy"}
                </a>
            </CopyToClipboard>
        </span>;
    }
}