import * as React from "react";

import { DohResolver } from "dohjs"; 
import { Packet } from "dns-packet";
import { QType } from "../utils/qtypes";

export interface DOHQueryProps {
  nameserver: string;
  domain: string;
  type: QType;
}

interface ForceReloadProps {
  forceReload: number;
}

interface DOHQueryState {
  loading: boolean;
  error?: string;
  result?: Packet;
}

export default class DOHQuery extends React.Component<DOHQueryProps & ForceReloadProps, DOHQueryState>{
  state: DOHQueryState = {
    loading: true
  }
  componentDidMount() {
    this.runQuery();
  }
  componentDidUpdate(prevProps: DOHQueryProps & ForceReloadProps) {
    // if the props have not changed, do nothing!
    const { nameserver, domain, type, forceReload } = this.props;
    const { nameserver: prevNameserver, domain: prevDomain, type: prevType, forceReload: prevForceReload } = prevProps;
    if (nameserver === prevNameserver && domain === prevDomain && type === prevType && forceReload === prevForceReload ) {
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
      return <div role="progressbar" className="marquee"></div>;
    }

    if (error !== undefined || result === undefined) {
      return <>
        <div role="progressbar" className="animate error">
          <div style={{width: "100%"}} />
        </div>
        <p>
          Something went wrong: {error ?? "Unexpected error"}
        </p>
      </>;
    }

    return <>
      <div role="progressbar" className="animate">
        <div style={{width: "100%"}} />
      </div>
      <p>
        <DOHPacket packet={result} />
      </p>
    </>;
  }
}

class DOHPacket extends React.Component<{ packet: Packet }> {
  render() {
    const { packet } = this.props;
    return <>{JSON.stringify(packet)}</>;
  }
}