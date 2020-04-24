import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout';

export default function MyApp({Component, pageProps}) {
    return (
        <Layout>
            <Head>
                <title>Malaika</title>
                <script src="/public/kurento-utils.min.js"></script>
            </Head>
            <Component {...pageProps} />
        </Layout>

    );
}
