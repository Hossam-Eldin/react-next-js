import React, { Component } from 'react'
import styles from './BottomFooter.scss'
import Link from 'next/link'


class BottomFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="bottom-footer" style={styles}>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">

                            <Link href="/single/about" as="/about">
                                <a className="nav-item nav-link">About</a>
                            </Link>
                            <Link href="/single/terms" as="/terms">
                                <a className="nav-item nav-link">Terms</a>
                            </Link>
                            <Link href="/single/privacy" as="/privacy">
                                <a className="nav-item nav-link">Privacy</a>
                            </Link>
                            <Link href="/single/contact" as="/contact-us">
                                <a className="nav-item nav-link">Contact Us</a>
                            </Link>

                        </div>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ml-auto">
                            <a className="nav-item nav-link active" href="#">© 2019 All Rights Reserved</a>

                        </div>
                    </div>
                </nav>

            </div>
        );
    }
}

export default BottomFooter;