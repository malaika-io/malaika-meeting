import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {useUser} from '../lib/hooks';
import NoSSR from "react-no-ssr";

export default ({children}) => {
    const [user, {mutate}] = useUser();
    const handleLogout = async () => {
        await fetch('/api/users/logout', {
            method: 'DELETE',
        });
        mutate(null);
    };
    return (
        <>
            <style jsx global>
                {`
          a {
            text-decoration: none !important;
            cursor: pointer;
            color: #0070f3;
          }
          a:hover {
            color: #0366d6;
          }
          body {
            margin: 0;
            padding: 0;
            color: #111;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
              'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
              'Helvetica Neue', sans-serif;
            background-color: #fff;
          }
          h2 {
            color: #333;
            text-align: center;
          }
          label {
            display: flex;
            margin-bottom: 0.5rem;
            align-items: center;
            width: 100%;
          }
          form {
            margin-bottom: 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          input,
          textarea {
            font-family: monospace;
            flex: 1 1 0%;
            margin-left: 0.5rem;
            box-shadow: none;
            width: 100%;
            color: #000;
            background-color: transparent;
            border: 1px solid #d8d8d8;
            border-radius: 5px;
            outline: 0px;
            padding: 10px 25px;
          }
          button {
            display: block;
            margin-bottom: 0.5rem;
            color: #fff;
            border-radius: 5px;
            border: none;
            background-color: #000;
            cursor: pointer;
            transition: all 0.2s ease 0s;
            padding: 10px 25px;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
          }
          button:hover,
          button:active {
            transform: translate3d(0px, -1px, 0px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          }
          header {
            border-bottom: 1px solid #d8d8d8;
          }
          nav {
            max-width: 1040px;
            margin: auto;
            padding: 1rem 2rem;
          }
          nav div {
            float: right;
          }
          nav div a {
            font-size: 0.9rem;
            margin-left: 1rem;
          }
          nav h1 {
            font-size: 1rem;
            color: #444;
            margin: 0;
            font-weight: 700;
            float: left;
          }
          nav:after {
            content: '';
            clear: both;
            display: table;
          }
          main {
            padding: 1rem;
            max-width: 1040px;
            margin: 0 auto;
          }
          footer {
            text-align: center;
            font-size: 0.8rem;
            margin-top: 1rem;
            padding: 3rem;
            color: #888;
          }
          .theme {
          background-color: #F5F8FB
        }
        
        `}
            </style>

            <header>
                <nav>
                    <Link href="/">
                        <a>
                            <h1>Malaika</h1>
                        </a>
                    </Link>
                    <div>
                        {!user ? (
                            <>
                                <Link href="/login">
                                    <a>Se connecter</a>
                                </Link>
                                <Link href="/signup">
                                    <a>S'inscrire</a>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/profile">
                                    <a>Profile</a>
                                </Link>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a tabIndex={0} role="button" onClick={handleLogout}>
                                    Logout
                                </a>
                            </>
                        )}
                    </div>
                </nav>
            </header>

            <main>{children}</main>
            <footer className="footer">
                <div className="content has-text-centered">
                    <p>Made with{' '}
                        <span role="img" aria-label="Love">❤️</span>
                        ,
                        {' '}
                        <a> By Malaika</a>.
                    </p>
                    <span id="brand-span">Malaika 2020</span>
                </div>
            </footer>

        </>
    );
};
