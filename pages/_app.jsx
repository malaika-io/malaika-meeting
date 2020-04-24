import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import NoSSR from 'react-no-ssr';
import {DefaultSeo} from "next-seo";

export default function MyApp({Component, pageProps}) {
    return (
        <NoSSR>
            <DefaultSeo
                title="Malaika"
                description="Malaika meetings"
                openGraph={{
                    type: "website",
                    site_name:
                        "Malaika"
                }}
            />
            <Layout>
                <Head>
                    <title>Malaika</title>
                </Head>
                <Component {...pageProps} />
            </Layout>
        </NoSSR>

    );
}
