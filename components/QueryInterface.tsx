import * as React from "react";
import { QType, QTypes } from "../utils/qtypes";
import { DOHQueryProps } from "./DOHQuery";

interface QueryInterfaceProps {
    onChange: (newProps: DOHQueryProps) => void;
}

export default class QueryInterface extends React.Component<QueryInterfaceProps, DOHQueryProps> {
    state: DOHQueryProps = {
        nameserver: "https://1.1.1.1/dns-query",
        domain: "example.com",
        type: QType.A,
    }

    private onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { nameserver, domain, type } = this.state;
        const { onChange } = this.props;
        onChange({ nameserver, domain, type });
    }

    private handleChangeNameserver = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ nameserver: event.target.value });
    }

    private handleChangeDomain = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ domain: event.target.value });
    }

    private handleChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ type: event.target.value as QType });
    }

    render() {
        const { nameserver, domain, type } = this.state;

        return (<form onSubmit={this.onSubmit}>
                <p>
                    Make a DNS-over-HTTPS (DOH) Query using this page. 
                    All data is sent only to the selected server, and not stored by this website. <br />
                    Usage of the external server might be subject to the servers&apos; Privacy Policy and/or Terms of Service.
                </p>
                <fieldset>
                    <legend>Query Settings</legend>
                    <div className="field-row-stacked">
                        <label html-for="domain">Domain Name</label>
                        <input id="domain" type="text" onChange={this.handleChangeDomain} value={domain} />
                    </div>
                    <div className="field-row-stacked">
                        <label html-for="record">Record Type</label>
                        <Select id="record-type" onChange={this.handleChangeType} value={type} values={QTypes}/>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Server Settings</legend>
                    <div className="field-row-stacked">
                        <label html-for="nameserver">DNS over HTTPS Server</label>
                        <input id="nameserver" type="text" onChange={this.handleChangeNameserver} value={nameserver} />
                    </div>
                </fieldset>
                <section className="field-row">
                    <button type="submit">Lookup</button>
                    <label>Press this button to submit the query</label>
                </section>
        </form>);
    }
}

interface SelectProps {
    id?: string
    value: string;
    values: readonly string[];
    onChange?: React.EventHandler<React.ChangeEvent<HTMLSelectElement>>;
}

class Select extends React.Component<SelectProps> {
    render() {
        const { value, values, id, onChange } = this.props; 
        return <select value={value} id={id} onChange={onChange}>
            {values.map(v => <option value={v} key={v}>{v}</option>)}
        </select>
    }
}