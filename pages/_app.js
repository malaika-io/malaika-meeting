import React from "react";
import App, {Container as NextContainer} from "next/app";
import Head from "next/head";
import {DefaultSeo} from "next-seo";
import Navbar from "../components/Layouts/Navbar";

class MyApp extends App {
    static async getInitialProps({Component, ctx}) {
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
            user: this.state.user,
        };

        return (
            <NextContainer>
                <DefaultSeo
                    title="Malaika"
                    description="Malaika meetings"
                    openGraph={{
                        type: "website",
                        site_name:
                            "Malaika"
                    }}
                />
                <Head>
                    <link rel="stylesheet" type="text/css" href={`/styles/style.css`}/>
                </Head>
                <Navbar user={this.state['user']}/>
                <Component {...props}/>

            </NextContainer>
        );
    }
}

export default MyApp;
