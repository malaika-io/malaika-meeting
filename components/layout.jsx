import React, {useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {useUser} from '../lib/hooks';
import {useRouter} from 'next/router';

export default ({children}) => {
    const [user, {mutate}] = useUser();
    const router = useRouter();
    useEffect(() => {
        if (user) router.replace('/profile');
    }, [user]);

    const handleLogout = async () => {
        await fetch('/api/users/logout', {
            method: 'DELETE',
        });
        mutate(null);
    };
    const toggleStyles = (event) => {
        document.querySelector('#burger').classList.toggle('is-active');
        document.querySelector('#navbarmenu').classList.toggle('is-active');
    };

    return (
        <div className="theme">
            <Head>
                <title>Malaika</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <header>
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="/index">
                            <img src="/malaikalogo.svg"/>
                        </a>
                        <a id="burger" onClick={toggleStyles}
                           role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false"
                           data-target="navbarmenu">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>
                    <div id="navbarmenu" className="navbar-menu">
                        <div className="navbar-end">
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
                                            Se déconnecter
                                        </a>
                                    </>
                                )}

                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <main>{children}</main>
            <footer className="footer">
                <div className="content has-text-centered">
                    <p>Made with{' '}
                        <span role="img" aria-label="Love">❤️</span> By Malaika
                    </p>
                </div>
            </footer>
            <style jsx>{`
                html,
                body {
                  padding: 0;
                  margin: 0;
                  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
                    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                }
                * {
                  box-sizing: border-box;
                }
                .theme {
                  background-color: #F5F8FB
                }
                header {
                    border-bottom: 1px solid #d8d8d8;
                }
                nav {
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
                  background-color: #f1f1f1;
                  position: relative;
              }
              
              #brand-span {
                  position: absolute;
                  bottom: 2em;
              }
            
        `}</style>
        </div>
    );
};
