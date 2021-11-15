import * as React from "react";


declare module "react" {
    interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
        rel?: string;
    }
}

export default class ButtonLink<T> extends React.Component<React.ButtonHTMLAttributes<HTMLButtonElement> & { href: string }> {
    render() {
        const { href, ...rest } = this.props;
        return <form action={href} method="GET" target="_blank" rel="external noreferrer noopener">
            <button role="link" {...rest} />
        </form>
    }
}