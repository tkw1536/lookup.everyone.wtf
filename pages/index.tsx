import Head from "next/head";
import * as React from "react";
import { QType } from "../utils/qtypes";

import RRPage from "./rr/[...type]";

export default class Index extends React.Component {
  render() {
    return <RRPage qtype={QType.A} />
  }
}