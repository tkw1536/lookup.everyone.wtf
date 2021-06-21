import * as React from "react";

import { GetStaticPaths, GetStaticProps } from "next";
import { Router, withRouter } from 'next/router';
import Head from "next/head";

import AnswerBox, { DOHQuery, EmptyAnswerBox } from "../../components/AnswerBox";
import Window from "../../components/design/Window";
import QueryBox from "../../components/QueryBox";
import { QType, QTypes } from "../../utils/qtypes";
import styles from "./[...type].module.css";


interface RRPageState {
  queryState: DOHQuery
  answerState?: DOHQuery
  counter: number;
}

interface RRPageProps {
    qtype: QType;
    router: Router;
}

class RRPage extends React.Component<RRPageProps, RRPageState> {
  state: RRPageState = {
    counter: 0,
    queryState: {
        nameserver: "https://1.1.1.1/dns-query",
        domain: "example.com",
        type: this.props.qtype,
    },
  }

  private onChange = (query: DOHQuery, prev: DOHQuery) => {
      if (query.type != prev.type) {
        this.props.router.push(`/rr/${query.type}`);
      }
      this.setState({ queryState: query });
  }

  private onSubmit = () => {
    this.setState(({ counter, queryState }) => ({ answerState: queryState, counter: 1 - counter }));
  }

  render() {
    const { queryState, answerState, counter } = this.state;

    return <>
      <Head>
        <title>DNS Lookup</title>
      </Head>
      <Window glass title="DNS Query" className={styles.queryBox}>
        <QueryBox onChange={this.onChange} onSubmit={this.onSubmit} query={queryState} />
      </Window>
      <Window glass title="Answer" className={styles.answerBox}>
        {answerState ? <AnswerBox {...answerState} forceReload={counter} /> : <EmptyAnswerBox />}
      </Window>
    </>;
  }
}

export default withRouter(RRPage);

export const getStaticProps: GetStaticProps = async (context) => {
    const qtype = (context.params!.type as string[]).join("/");
    return {
        props: {
            qtype,
        }
    };
}

export const getStaticPaths: GetStaticPaths = async () => {
    const classes = QTypes.map(c => ({ params: { type: c.split("/") } }));
    return {
        paths: classes,
        fallback: false,
    };
}