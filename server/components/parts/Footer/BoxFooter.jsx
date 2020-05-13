import React, { Component } from 'react';
import Link from 'next/link';


class BoxFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
             {/*    <p>Follow Orangeito</p> */}
                <ul className="box-footer-list">
                    <li>
                        <Link href="/single/about" as="/about">
                            <a className="m-2">About</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/single/terms" as="/terms">
                            <a className="m-2 ">Terms</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/single/privacy" as="/privacy">
                            <a className="m-2">Privacy</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/single/contact" as="/contact-us">
                            <a className="m-2">Contact Us</a>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default BoxFooter;