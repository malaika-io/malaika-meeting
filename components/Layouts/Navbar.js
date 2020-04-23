import Link from "next/link";
import features from "../../lib/features";

export default function AppNavbar({user}) {
    return (
        <header>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/index">
                        <img src="/malaikalogo.svg"/>
                    </a>
                    <a id="burger"
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
                        <Link href="/contact">
                            <a className="navbar-item">Contact</a>
                        </Link>
                        {!user && (
                            <Link href="/login">
                                <a className="navbar-item">Log In</a>
                            </Link>
                        )}

                        {user && (
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
                    </div>
                </div>
            </nav>
        </header>
    );
}
