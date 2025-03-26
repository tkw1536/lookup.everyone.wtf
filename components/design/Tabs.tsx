import * as React from "react";

interface TabsProps {
    children: Array<{ title: string; child?: React.ReactNode }>;
    activeIndex: number;
    onChange: (index: number) => void;
}

export default class Tabs extends React.Component<TabsProps> {
    render() {
        const { activeIndex, children, onChange } = this.props;

        return <section className="tabs">
            <menu role="tablist">
                {children.map(({ title, child }, index) => <button
                    aria-selected={activeIndex === index ? "true" : undefined}
                    disabled={child === undefined}
                    key={index}
                    onClick={onChange.bind(this, index)}
                >
                    {title}
                </button>
                )}
            </menu>

            {children.map(({ child }, index) => <article
                role="tabpanel"
                hidden={activeIndex !== index}
                key={index}
                style={{"overflow": "auto"}}
            >
                {child}
            </article>
            )}
        </section>;
    }
}