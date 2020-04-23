import Document, {Head, Html, Main, NextScript} from "next/document";


export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return {...initialProps}
    }


    render() {
        return (
            <Html lang="fr">
                <Head>
                    <title>Malaika</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}
