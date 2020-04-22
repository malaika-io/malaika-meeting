import Head from 'next/head'
import InfoBox from '../components/InfoBox'
import Features from '../components/Features'
import Summary from '../components/Summary'
import Layout from '../components/Layout'
import React from 'react'
import FadeIn from "react-fade-in";

const Index: React.FunctionComponent = () => (
  <Layout>
    <div className="container">
      <Head>
        <title>Malaika</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section id="top-container" className="columns container">
            <div className="column infobox">
            <FadeIn>
                <InfoBox/>
            </FadeIn>
            </div>
            <div className="column column-img">
              <img id="main-img" src="/Component 5.svg"></img>
            </div>
        </section>
        <section className="columns">
          <Features/>
        </section>
        <section id="summary-section">
          <Summary/>
        </section>
      </main>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          box-sizing: border-box;
        }

      `}</style>
      <style jsx>{`
        #top-container {
          background: #F5F8FB;
          height: 80vh;
        }
        #main-img {
          margin: auto;
          align-item: center;
        }
        .infobox {
          margin: auto;
        }
        .column-img {
          margin: auto;
          text-align: center;
        }
        #summary-section {
          padding: 3em;
        }
      `}</style>
    </div>
  </Layout>
)

export default Index
