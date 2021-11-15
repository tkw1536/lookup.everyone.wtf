import * as React from "react";

import { GetStaticPaths, GetStaticProps } from "next";
import { Router, withRouter } from 'next/router';
import Head from "next/head";

import AnswerBox, { DOHQuery, EmptyAnswerBox } from "../../components/AnswerBox";
import Window from "../../components/design/Window";
import QueryBox from "../../components/QueryBox";
import { QType, QTypes } from "../../utils/qtypes";
import styles from "./[...type].module.css";
import ButtonLink from "../../components/design/ButtonLink";


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

  private onSubmit = () => {
    this.setState(({ counter, queryState }) => ({ answerState: queryState, counter: 1 - counter }));
  }

  private onChange = (q: Partial<DOHQuery>, prev?: DOHQuery) => {
    const prevQ = prev ?? this.state.queryState;
    const newQ = { ...prevQ, ...q };

    this.setState({ queryState: newQ }, () => {
      if (newQ.type != prevQ.type) {
        this.props.router.push(`/rr/${newQ.type}`);
      }
    });
  }

  componentDidUpdate(prevProps: RRPageProps) {
    const { qtype } = this.props;
    if (prevProps.qtype != this.props.qtype) {
      this.onChange({ type: qtype });
    }
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

      <Window glass title="Public Cache Purger Links" className={styles.queryBox}>
      <section className="field-row">
        <ButtonLink href="https://cloudflare-dns.com/purge-cache/">CloudFlare</ButtonLink>
        <ButtonLink href="https://developers.google.com/speed/public-dns/cache">Google DNS</ButtonLink>
        <ButtonLink href="https://cachecheck.opendns.com/">OpenDNS</ButtonLink>
        </section>
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