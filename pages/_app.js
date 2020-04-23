import React from "react";
import App, {Container as NextContainer} from "next/app";
import Head from "next/head";
import {DefaultSeo} from "next-seo";

class MyApp extends App {
    static async getInitialProps({Component, ctx}) {
        return {
            pageProps: Component.getInitialProps
                ? await Component.getInitialProps(ctx)
                : {}
        }
    }

    render() {
        const {Component, pageProps, store} = this.props;

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
                <Component {...pageProps}/>

            </NextContainer>
        );
    }
}

export default MyApp;
