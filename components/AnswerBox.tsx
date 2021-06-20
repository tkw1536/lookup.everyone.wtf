import * as React from "react";

import { DohResolver } from "dohjs";
import { Packet, Question, Answer } from "dns-packet";
import { QType } from "../utils/qtypes";

import ProgressBar from "./design/ProgressBar";
import Tabs from "./design/Tabs";
import Code from "./design/Code";
import Copyable from "./design/Copyable";

import styles from "./AnswerBox.module.css";

export interface DOHQuery {
  nameserver: string;
  domain: string;
  type: QType;
}

interface AnswerBoxProps extends DOHQuery {
  forceReload: number;
}

interface DOHQueryState {
  loading: boolean;
  error?: string;
  result?: Packet;
}

export default class AnswerBox extends React.Component<DOHQuery & AnswerBoxProps, DOHQueryState>{
  state: DOHQueryState = {
    loading: true
  }
  componentDidMount() {
    this.runQuery();
  }
  componentDidUpdate(prevProps: DOHQuery & AnswerBoxProps) {
    // if the props have not changed, do nothing!
    const { nameserver, domain, type, forceReload } = this.props;
    const { nameserver: prevNameserver, domain: prevDomain, type: prevType, forceReload: prevForceReload } = prevProps;
    if (nameserver === prevNameserver && domain === prevDomain && type === prevType && forceReload === prevForceReload) {
      return;
    }

    // run the query again!
    this.runQuery();
  }

  private runQuery = async () => {
    // tell the state that we are loading something
    this.setState({
      loading: true,
      error: undefined,
      result: undefined,
    })

    // make the query
    const { nameserver, domain, type } = this.props;
    let result: Packet | undefined = undefined;
    let error: string | undefined;
    try {
      result = await (new DohResolver(nameserver)).query(domain, type);
    } catch (e) {
      error = e.toString();
    }

    // store the result unless we have been unmounted
    if (this.unmounted) return;
    this.setState({
      loading: false,
      result,
      error,
    })
  }

  // inform the updater method if we unmount
  // so that it doesn't attempt to update state!
  private unmounted = false;
  componentWillUnmount() {
    this.unmounted = true;
  }

  // render the actual query result
  render() {
    const { loading, result, error } = this.state;
    if (loading) {
      return <ProgressBar marquee />;
    }

    if (error !== undefined || result === undefined) {
      return <>
        <ProgressBar animate style="error" value={100} />
        <p>
          Something went wrong: {error ?? "Unexpected error"}
        </p>
      </>;
    }

    return <>
      <ProgressBar value={100} />
      <p />
      <PacketDisplay packet={result} />
    </>;
  }
}

export class EmptyAnswerBox extends React.Component {
  render() {
    return <>
      <ProgressBar value={0} />
      <p>
        Make a query to get started
      </p>
    </>;
  }
}

interface PacketDisplayProps {
  packet: Packet;
}

interface PacketDisplayState {
  activeIndex: number;
}

class PacketDisplay extends React.Component<PacketDisplayProps, PacketDisplayState> {
  state: PacketDisplayState = {
    activeIndex: 0,
  }
  private onChangeIndex = (activeIndex: number) => {
    this.setState({ activeIndex });
  }
  render() {
    const { packet } = this.props;
    const { questions, answers, additionals, authorities, ...rest } = packet;
    const { activeIndex } = this.state;

    const tabs: Array<{ title: string; child?: React.ReactChild }> = [
      {
        title: "Answers",
        child: <>
          <p>Status: <code>{hasOwnProperty(rest, "rcode") ? rest.rcode as string : "UNKNOWN"}</code></p>
          <AnswersDisplay answers={answers || []} />
        </>
      },
      {
        title: "Additionals",
        child: (additionals && additionals.length > 0) ? <AnswersDisplay answers={additionals} /> : undefined
      },
      {
        title: "Authorities",
        child: (authorities && authorities.length > 0) ? <AnswersDisplay answers={authorities} /> : undefined
      },
      {
        title: "Questions",
        child: (questions && questions.length > 0) ? <QuestionsDisplay questions={questions} /> : undefined
      },
      {
        title: "Raw",
        child: <Code>{JSON.stringify(packet, null, "  ")}</Code>,
      }
    ];

    return <Tabs onChange={this.onChangeIndex} activeIndex={activeIndex}>{tabs}</Tabs>;
  }
}

interface QuestionsProps {
  questions: Question[];
}

class QuestionsDisplay extends React.Component<QuestionsProps> {
  render() {
    const { questions } = this.props;
    return <table className={styles.table}>
      <thead>
        <tr>
          <th>Type</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {questions.map((q, i) => <tr key={i}>
          <td>{q.type}</td>
          <td><Copyable>{q.name}</Copyable></td>
        </tr>)}
      </tbody>
    </table>
  }
}

interface AnswersProps {
  answers: Answer[];
}

class AnswersDisplay extends React.Component<AnswersProps> {
  render() {
    const { answers } = this.props;
    return <table className={styles.table}>
      <thead>
        <tr>
          <th>Type</th>
          <th>Class</th>
          <th>Name</th>
          <th>TTL</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        {answers.map((a, i) => <AnswerDisplay key={i} answer={a} />)}
      </tbody>
    </table>
  }
}

function hasOwnProperty<O extends {}, K extends PropertyKey>(obj: O, prop: K): obj is O & Record<K, unknown> {
  return obj.hasOwnProperty(prop);
}

class AnswerDisplay extends React.Component<{ answer: Answer }>{
  render() {
    const { answer: { type, name, ttl, data, ...rest } } = this.props;
    let clz = hasOwnProperty(rest, "class") ? rest.class as string : "";

    let dataNode: React.ReactChild;
    if (typeof data === "string") { // string
      dataNode = <Copyable>{data}</Copyable>;
    } else if (data instanceof Buffer) { // Buffer
      dataNode = <Copyable>{data.toString()}</Copyable>;
    } else {
      dataNode = <Copyable>{JSON.stringify(data)}</Copyable>
    }

    return <tr>
      <td>{type}</td>
      <td>{clz}</td>
      <td><Copyable>{name}</Copyable></td>
      <td>{ttl}</td>
      <td>{dataNode}</td>
    </tr>;
  }
}