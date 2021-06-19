import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          <footer>
            Powered by <a href="https://nextjs.org/" rel="noopener noreferrer" target="_blank">Next.JS</a>, <a href="https://dohjs.org/" rel="noopener noreferrer" target="_blank">DoH.js</a> and <a href="https://khang-nd.github.io/7.css/" rel="noopener noreferrer" target="_blank">7.css</a>.{` `}
            {/* eslint-disable-next-line @next/next/no-sync-scripts */}
            <script src="https://inform.everyone.wtf/legal.min.js?dark"></script>
          </footer>
        </body>
      </Html>
    )
  }
};