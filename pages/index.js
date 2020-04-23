import React from "react";
import NoSSR from 'react-no-ssr';

import InfoBox from '../components/InfoBox'
import Features from '../components/Features'
import Summary from '../components/Summary'
import FadeIn from "react-fade-in";

class Index extends React.Component {
    render() {
        return (
            <NoSSR>
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

                <footer className="footer">
                    <div className="content has-text-centered">
                        <span id="brand-span">Malaika 2020</span>
                    </div>
                </footer>
            </NoSSR>
        )
    }
}

export default Index
