import { useUser } from '../lib/hooks';
import React, { useState, useEffect } from "react";
import Head from "next/dist/next-server/lib/head";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3000";

const ProfilePage = () => {
    const [user] = useUser();
    const [response, setResponse] = useState("");
    const {
        email,
        first_name
    } = user || {};

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT,{
            path: '/kurento',
            transports: ['websocket', 'polling']
        });
        socket.on('connect', function () {
            console.log('connect');
        });

        socket.on("FromAPI", data => {
            setResponse(data);
        });
    }, []);

    return (
        <>
            <style jsx>
                {`
          h2 {
            text-align: left;
            margin-right: 0.5rem;
          }
          button {
            margin: 0 0.25rem;
          }
          img {
            width: 10rem;
            height: auto;
            border-radius: 50%;
            box-shadow: rgba(0, 0, 0, 0.05) 0 10px 20px 1px;
            margin-right: 1.5rem;
          }
          div {
            color: #777;
            display: flex;
            align-items: center;
          }
          p {
            font-family: monospace;
            color: #444;
            margin: 0.25rem 0 0.75rem;
          }
          a {
            margin-left: 0.25rem;
          }
        `}
            </style>
            <Head>
                <title>{first_name}</title>
            </Head>
            <div>
                <p>
                    It's <time dateTime={response}>{response}</time>
                </p>

                <section>
                    Email
                    <p>
                        {email}
                    </p>
                </section>
            </div>
        </>
    );
};
export default ProfilePage;
