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
  result?: EPacket;
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
    let result: EPacket | undefined = undefined;
    let error: string | undefined;
    try {
      result = await (new DohResolver(nameserver)).query(domain, type) as EPacket;
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

type EPacket = Packet & {
  answers: EAnswer[] | undefined;
  additionals: EAnswer[] | undefined;
  authorities: EAnswer[] | undefined;
}
interface PacketDisplayProps {
  packet: EPacket;
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
  answers: EAnswer[];
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

type EAnswer = Answer & {
  ttl?: number;
  data: any
}

class AnswerDisplay extends React.Component<{ answer: EAnswer }>{
  render() {
    const { answer: { type, name, ttl, data, ...rest } } = this.props;
    let clz = hasOwnProperty(rest, "class") ? rest.class as string : "";

    return <tr>
      <td>{type}</td>
      <td>{clz}</td>
      <td><Copyable>{name}</Copyable></td>
      <td>{ttl !== undefined && <TTLDisplay ttl={ttl} />}</td>
      <td><DataDisplay data={data} /></td>
    </tr>;
  }
}

class TTLDisplay extends React.Component<{ ttl: number }> {
  render() {
    const { ttl } = this.props;

    let seconds = ttl;
    let minutes = Math.floor(seconds / 60);
    seconds %= 60;
    let hours = Math.floor(minutes / 60);
    minutes %= 60;
    let days = Math.floor(hours / 24);
    days %= 48;

    const hasDays = days > 0;
    const hasHours = hasDays || hours > 0;
    const hasMinutes = hasHours || minutes > 0;
    const hasSeconds = seconds > 0;

    return <p>
      <code>{ttl}</code>
      {" "} = {" "}
      <code>
        {hasDays && <>{days} Day{days != 1 && "s"} </>}
        {hasHours && <>{hours} Hour{hours != 1 && "s"} </>}
        {hasMinutes && <>{minutes} Minute{minutes != 1 && "s"} </>}
        {hasSeconds && <>{seconds} Second{seconds != 1 && "s"} </>}
      </code>
    </p>
  }
}

class DataDisplay extends React.Component<{ data: any }> {
  render() {
    const { data } = this.props;

    switch (true) {
      // regular Array => render recursively
      case Array.isArray(data):
        return data.map((d, i) => <p key={i}><DataDisplay data={d} /></p>);

      // Uint8Array || Buffer => render data directly
      case data instanceof Uint8Array || data instanceof Buffer:
        const value = String.fromCharCode.apply(String, Array.from(data));
        return <Copyable>{value}</Copyable>;

      // Plain Record
      case typeof data === "string":
        return <Copyable>{data}</Copyable>;

      // MX record
      case hasOwnProperty(data, "exchange") && hasOwnProperty(data, "preference"):
        const { exchange, preference } = data;
        return <table className={styles.table}>
          <thead>
            <tr>
              <th>Exchange</th>
              <th className={styles.preference}>Preference</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><Copyable>{exchange as string}</Copyable></td>
              <td className={styles.preference}>{preference}</td>
            </tr>
          </tbody>
        </table>;
    }

    // Fallback
    return <code>{JSON.stringify(data)}</code>
  }
}