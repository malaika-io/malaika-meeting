import {useUser} from '../lib/hooks';
import React from "react";
import Head from "next/dist/next-server/lib/head";
import Link from 'next/link';

const ProfilePage = () => {
    const [user] = useUser();
    const {
        email,
        first_name
    } = user || {};

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
