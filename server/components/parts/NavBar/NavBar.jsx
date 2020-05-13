import React, { Component } from 'react'
import Router from 'next/router'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import { Select, Input, Layout, Menu, Drawer } from 'antd';
import '../../../assets/ant.scss';
import { FaHome, FaBars, FaMoon } from 'react-icons/fa';
import { IoIosPlanet } from 'react-icons/io'
import Axios from 'axios';
import Link from 'next/link';
import { SearchComponent, LeftMenu, AuthComponent } from '../../index'
import SectionsMenu from './SectionsMenu';
import UploadComponent from '../../logical/users/upload';

const { Header, Content, Footer } = Layout;


class Nava extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: [],
      visible: false,
      section_list: false
    }
  }


  componentDidMount() {
    Axios.get('/api/sections')
      .then(response => {
        this.setState({
          sections: response.data.result
        })
      })
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  handleSearch = (e) => {
    //e.preventDefault();
    // alert(e)
    Axios.get('/api/search/?search=' + e)
      .then(response => {
        this.setState({
          result: response.data.data
        })
      })
      .catch(error => {

      })
  }



  renderSection = (option) => {
    return (
      <Link key={option.id} href={`/section/?id=${option.name}`} as={`/o/${option.name}`} >
        {option.name}
      </Link>
    );

  }

  render() {
    const { selectedOption, sections } = this.state;

    return (
      <Header style={{ position: 'fixed', zIndex: 10, width: '100%' }} className="nav-style">

        <div className="logo">
          <ul className="list-inline">
            <li className="list-inline-item">
              <button className="btn drawer-btn" onClick={this.showDrawer}>
                <FaBars />
              </button>
            </li>
            <li className="list-inline-item">
              <a href="/" className="logo-warpper"> <img className="img-fluid mx-auto" src="/static/logo0.png" /></a>
            </li>
          </ul>
        </div>

        <Menu mode="horizontal" style={{ lineHeight: '64px' }} >

          {/* search articles */}
          <Menu.Item key="search" >
            <div style={{ width: '250px' }} className="d-none d-lg-block d-xl-block">
              <SearchComponent />
            </div>
          </Menu.Item>
          {/* home */}
          <Menu.Item key="3" title="Home">
            <div className="d-none d-lg-block d-xl-block">
              <Link href="/index" as="/">
                <div className="nav-box">
                  <FaHome className="nav-icon" />
                </div>
              </Link>
            </div>
          </Menu.Item>
          {/* sections feed */}
          <Menu.Item title="Fun Planet" >
            <div className="d-none d-lg-block d-xl-block">
              <Link href={`/sections`} as={`/o/`} className="white-text"><IoIosPlanet className="nav-icon-sections" /></Link>
            </div>
          </Menu.Item>
          {/* sections menu  */}
          <Menu.Item title="Explore Sections" >
            <div className="d-none d-lg-block d-xl-block">
              <SectionsMenu />
            </div>
          </Menu.Item>


          {/* auth component */}
          <Menu.Item key="auth" className="float-right">
            <div>
              <AuthComponent />
            </div>
          </Menu.Item>
          {/* switch themes */}
          <Menu.Item className="float-right">
            <button className="btn btn-outline-light nav-theme-btn"
              title="switch themes"
              onClick={this.props.styling}><FaMoon /> </button>
          </Menu.Item>
          {/* upload */}
          <Menu.Item key="upload" className="float-right">
            <div>
              <UploadComponent />
            </div>
          </Menu.Item>




        </Menu>
        {/*  drawer */}
        <LeftMenu visible={this.state.visible} onClose={this.onClose} />

      </Header>


    )
  }
};


export default Nava;