import * as React from "react";
import { QType, QTypes } from "../utils/qtypes";
import { DOHQuery } from "./AnswerBox";
import Dropdown from "./design/Dropdown";

interface QueryBoxProps {
    /** called whenever the interface is changed */
    onChange: (query: DOHQuery, prevQuery: DOHQuery) => void;

    /** called whenever the props are submitted */
    onSubmit: () => void;

    /** state of the interface */
    query: DOHQuery;
}

const nameservers = {
    "Cloudflare": "https://1.1.1.1/dns-query",
}

export default class QueryBox extends React.Component<QueryBoxProps> {
    private onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.onSubmit();
    }

    private handleChangeNameserver = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const { query, onChange } = this.props;
        const newQuery = { ...query, nameserver: event.target.value };
        onChange(newQuery, query);
    }

    private handleChangeDomain = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const { query, onChange } = this.props;
        const newQuery = { ...query, domain: event.target.value };
        onChange(newQuery, query);
    }

    private handleChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();

        const { query, onChange } = this.props;
        const newQuery = { ...query, type: event.target.value as QType };
        onChange(newQuery, query);
    }

    private handleExampleNameserverClick = (nameserver: string, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const { query, onChange } = this.props;
        const newQuery = { ...query, nameserver };
        onChange(newQuery, query);
    }

    render() {
        const { nameserver, domain, type } = this.props.query;

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
                    <Dropdown id="record-type" onChange={this.handleChangeType} value={type} values={QTypes} />
                </div>
            </fieldset>
            <fieldset>
                <legend>Server Settings</legend>
                <div className="field-row-stacked">
                    <label html-for="nameserver">DNS over HTTPS Server</label>
                    <input id="nameserver" type="text" onChange={this.handleChangeNameserver} value={nameserver} />
                </div>

                <div className="field-row">
                    Common Servers:&nbsp;
                    {Object.entries(nameservers).map(([key, value]) =>
                        <button onClick={this.handleExampleNameserverClick.bind(this, value)} key={key}>{key}</button>
                    )}
                </div>
            </fieldset>
            <section className="field-row">
                <button type="submit">Lookup</button>
                <label>Press this button to submit the query</label>
            </section>
        </form>);
    }
}
