import Head from 'next/head'
import Link from 'next/link'
import '../styles/styles.sass'
import features from '../lib/features'

export default ({children}) => {
    const toggleStyles = (event) => {
        document.querySelector('#burger').classList.toggle('is-active')
        document.querySelector('#navbarmenu').classList.toggle('is-active')
    }
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
                            <div className="navbar-item dropdown is-hoverable is-right">
                                <div className="dropdown-trigger">
                                    <Link href="/product">
                                        <p>Produit</p>
                                    </Link>
                                </div>
                                <div className="dropdown-menu" id="dropdown-menu4" role="menu">
                                    <div className="dropdown-content">
                                        {features.map(feature => {
                                            return (
                                                <div className="dropdown-item">
                                                    <Link href={`/feature?title=${feature.title}`}>
                                                        <div className="columns feature">
                                                            <div className="column is-one-fifth">
                                                                <figure className="image is-32x32">
                                                                    <img className="img-features"
                                                                         src={feature.img}></img>
                                                                </figure>
                                                            </div>
                                                            <div className="column">
                                                                <a className="feature-link">
                                                                    <b id="feature-title">{feature.title}</b>
                                                                </a>
                                                                <p>{feature.subtitle}</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                          {/*  {user && (
                                <>
                                    <Link href="/share-thought">
                                        <a className="nav-link">New Thought</a>
                                    </Link>
                                    <Link href="/profile">
                                        <a className="nav-link">Profile</a>
                                    </Link>
                                    <Link href="/logout">
                                        <a className="nav-link">Log Out</a>
                                    </Link>
                                </>
                            )}
                            {!user && (
                                <Link href="/login">
                                    <a className="nav-link">Log In</a>
                                </Link>
                            )}*/}

                        </div>
                    </div>
                </nav>
            </header>
            {children}
            <footer className="footer">
                <div className="content has-text-centered">
                    <span id="brand-span">Malaika 2020</span>
                </div>
            </footer>
            <style jsx>{`
        .theme {
          background-color: #F5F8FB
        }
        footer {
          background-color: #f1f1f1;
          position: relative;
        }
        #brand-span {
          position: absolute;
          bottom: 2em;
        }
        .navbar {
          background-color: #F5F8FB !important
        }
        .navbar-item {
          margin-right: 3em;
        }
        .feature-link {
          align-content: right  ;
        }
        .img-features {
          margin-right: 1em;
        }
        .feature {
          align-items: center;
        }
        #feature-title {
          font-size: 1rem;
        }
      `}</style>
        </div>
    )
}
