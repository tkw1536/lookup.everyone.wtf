import Head from "next/head";
import * as React from "react";
import AnswerBox, { EmptyAnswerBox, DOHQuery } from "../components/AnswerBox";
import Window from "../components/design/Window";
import QueryBox from "../components/QueryBox";
import styles from "./index.module.css";

interface IndexState {
  query?: DOHQuery
  counter: number;
}

export default class Index extends React.Component<{}, IndexState> {
  state: IndexState = {
    counter: 0,
  }

  private onChange = (newProps: DOHQuery) => {
    this.setState(({ counter }) => ({ query: newProps, counter: 1 - counter }));
  }

  render() {
    const { query, counter } = this.state;

    return <>
      <Head>
        <title>DNS Lookup</title>
      </Head>
      <Window glass title="DNS Query" className={styles.queryBox}>
        <QueryBox onChange={this.onChange} />
      </Window>
      <Window glass title="Answer" className={styles.answerBox}>
        {query ? <AnswerBox {...query} forceReload={counter} /> : <EmptyAnswerBox />}
      </Window>
    </>;
  }
}
