import React from "react";
import NoSSR from 'react-no-ssr';

import InfoBox from '../components/InfoBox'
import Features from '../components/Features'
import Summary from '../components/Summary'
import FadeIn from "react-fade-in";
import Navbar from "../components/Layouts/Navbar";
import {Container as NextContainer} from "next/dist/pages/_app";

class Index extends React.Component {
    static async getInitialProps(ctx) {
        let pageProps = {};
        if (ctx.req && ctx.req.session.passport) {
            pageProps.user = ctx.req.session.passport.user;
        }
        return {pageProps};
    }

    constructor(props) {
        super(props);
        this.state = {
            user: props.pageProps.user
        };
    }

    render() {
        const props = {
            user: this.state.user,
        };

        return (
            <NoSSR>
                <Navbar user={this.state['user']}/>
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
