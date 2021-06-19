import Head from "next/head";
import * as React from "react";
import DOHQuery, { DOHQueryProps } from "../components/DOHQuery";
import QueryInterface from "../components/QueryInterface";
import styles from "./index.module.css";

interface IndexState {
  query?: DOHQueryProps
  counter: number;
}

export default class Index extends React.Component<{}, IndexState> {
  state: IndexState = {
    counter: 0,
  }

  private onChange = (newProps: DOHQueryProps) => {
    this.setState(({ counter }) => ({ query: newProps, counter: 1 - counter }));
  }

  render() {
    const { query, counter } = this.state;
  
    return <>
      <Head>
        <title>DNS Lookup</title>
      </Head>
      <div className={`window glass ${styles.queryBox}`}>
        <div className="title-bar">
          <div className="title-bar-text">DNS Query</div>
          <div className="title-bar-controls">
            <button aria-label="Close"></button>
          </div>
        </div>
        <div className="window-body">
          <QueryInterface onChange={this.onChange} />
        </div>
      </div>
      <div className={`window glass ${styles.answerBox}`}>
        <div className="title-bar">
          <div className="title-bar-text">Query Result</div>
          <div className="title-bar-controls">
            <button aria-label="Close"></button>
          </div>
        </div>
        <div className="window-body">
          { query ? <DOHQuery {...query} forceReload={counter} /> : "Make a query to get started" }
        </div>
      </div>
    </>;
  }
}
