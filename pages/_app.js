import React from "react";
import App, {Container as NextContainer} from "next/app";
import Head from "next/head";
import Navbar from "../components/Navbar";
import {DefaultSeo} from "next-seo";

class MyApp extends App {
    static async getInitialProps({Component, ctx}) {
        return {
            pageProps: Component.getInitialProps
                ? await Component.getInitialProps(ctx)
                : {}
        }
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
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
        const {Component, pageProps} = this.props;
        const props = {
            ...pageProps,
            user: this.state['user'],
        };

        return (
            <NextContainer>
                <DefaultSeo
                    title="StartP - React Next IT Startups & Digital Services Template"
                    description="StartP is a React and Bootstrap 4 based Professional website template. This has been built with React, ES6+ and as framework Next.js and Express.js."
                    openGraph={{
                        type: "website",
                        locale: "en_IE",
                        url: "https://startp-react.envytheme.com/",
                        site_name:
                            "StartP - React Next IT Startups & Digital Services Template"
                    }}
                />
                <Head>

                </Head>
                <Navbar user={this.state['user']}/>
                <Component {...props}/>
                <footer className="footer">
                    <div className="content has-text-centered">
                        <span id="brand-span">Malaika 2020</span>
                    </div>
                </footer>

            </NextContainer>
        );
    }
}

export default MyApp;
