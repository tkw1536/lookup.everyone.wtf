import * as React from "react";

interface DropdownProps {
    id?: string
    value: string;
    values: readonly string[];
    onChange?: React.EventHandler<React.ChangeEvent<HTMLSelectElement>>;
}

export default class Dropdown extends React.Component<DropdownProps> {
    render() {
        const { value, values, id, onChange } = this.props; 
        return <select value={value} id={id} onChange={onChange}>
            {values.map(v => <option value={v} key={v}>{v}</option>)}
        </select>
    }
}