import React, { Component } from 'react';
import { Drawer } from 'antd';
import { SearchComponent, AuthComponent } from '../../index'
import Link from 'next/link'
import { FaHome, FaBars } from 'react-icons/fa';
import { IoIosPlanet } from 'react-icons/io';


class LeftMenu extends Component {
    render() {
        return (
            <Drawer
                title="Orangeito"
                placement="left"
                closable={false}
                onClose={this.props.onClose}
                visible={this.props.visible}
            >
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <div className="logo">
                            <a href="/"> <img className="logo-img img-fluid" src="/static/logo0.png" /></a>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <AuthComponent />
                    </li>
                    {/* search articles */}
                    <li className="list-group-item">
                        <SearchComponent />
                    </li>

                    {/*  home link */}
                    <li className="list-group-item">
                        <Link href="/index" as="/">
                            <a className="nav-box">
                                <span><FaHome className="nav-icon" /> Home</span>
                            </a>
                        </Link>
                    </li>
                    {/* sections link */}
                    <li className="list-group-item">

                        <Link href={`/sections`} as={`/o/`} className="white-text">
                            <a>
                                <span className="text-c"><IoIosPlanet className="nav-icon-sections" /> Fun Planet</span>
                            </a>
                        </Link>
                    </li>
                    {/* static pages*/}
                    <li className="list-group-item">
                        <Link href="/single/about" as="/about">
                            <a className=" text-c m-2">About</a>
                        </Link>
                        <Link href="/single/terms" as="/terms">
                            <a className="text-c m-2 ">Terms</a>
                        </Link>
                        <Link href="/single/privacy" as="/privacy">
                            <a className="text-c m-2">Privacy</a>
                        </Link>
                        <Link href="/single/contact" as="/contact-us">
                            <a className=" d-block text-c m-2">Contact Us</a>
                        </Link>
                    </li>

                </ul>
            </Drawer>
        );
    }
}
export default LeftMenu;