import React from 'react';
import Link from 'next/link';
import 'bootstrap-scss';
import '../../assets/ant.scss'
import {Layout, Menu, Breadcrumb, Icon, } from 'antd';
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
import '../../assets/cp/style.scss'
import { inject } from 'mobx-react';
import Router from 'next/router'


@inject('store')
class Admin extends React.Component {
    state = {
      collapsed: false,
    };
  
    onCollapse = (collapsed) => {
      console.log(collapsed);
      this.setState({ collapsed });
    }

    componentDidMount(){
    /*   if (this.props.store.auth ===false) {
        Router.replace('/cp/login') 
        } */
    }
  
    render() {
      return (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
              <Icon type="home" />
                <Link href="/cp/home">
                <a>Home</a>
                </Link>
              </Menu.Item>

              <SubMenu key="sub1" title={<span><Icon type="form" /><span>Articles</span></span>}>
                <Menu.Item key="3">
                    <Link href="/cp/articles/list" as="/articles/list" >
                   <a> Article List</a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link href="/cp/articles/create" as="/articles/create">
                    <a>Create</a>
                    </Link>
                </Menu.Item>

              </SubMenu>

              {/* ############# posts ########  */}
              <SubMenu key="posts" title={<span><Icon type="form" /><span>Posts</span></span>}>

                <Menu.Item key="post-create">
                    <Link href="/cp/posts/post" as="/posts/create" >
                     <a>Create</a>
                    </Link>
                </Menu.Item>

                <Menu.Item key="post-list">
                    <Link href="/cp/posts/list" as="/posts/list" >
                     <a>post list</a>
                    </Link>
                </Menu.Item>


              </SubMenu>
              {/* ############# sections ########  */}
              <SubMenu key="sub2" title={<span><Icon type="form" /><span>Sections</span></span>}>
                <Menu.Item key="5">
                    <Link href="/cp/sections/create" as="/section/create">
                    <a>Create</a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="6">
                    <Link href="/cp/sections/list" as="/section/list">
                    <a>list</a>
                    </Link>
                </Menu.Item>
              </SubMenu>

              {/* ##################### Landing  ###################  */}
              <SubMenu key="landing" title={<span><Icon type="form" /><span>Landing</span></span>}>
                <Menu.Item key="head">
                    <Link href="/cp/landing/head" as="/landing/head">
                    <a>head</a>

                    </Link>
                </Menu.Item>
              </SubMenu>
                {/* ###################  Random  ###################*/}
                <SubMenu key="random" title={<span><Icon type="form" /><span>Random</span></span>}>
                <Menu.Item key="add">
                    <Link href="/cp/random/add" as="/random/add">
                    <a>Add</a>

                    </Link>
                </Menu.Item>
                <Menu.Item key="list">
                    <Link href="/cp/random/list" as="/random/list">
                    <a>List</a>

                    </Link>
                </Menu.Item>
              </SubMenu>

                {/* ###################  Management  ###################*/}
              <SubMenu key="mang" title={<span><Icon type="form" /><span>Management</span></span>}>
                <Menu.Item key="create-admin">
                    <Link href="/cp/mang/create-admin" as="/mange/create-admin">
                    <a>Create</a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="info">
                    <Link href="/cp/mang/info" as="/mange/info" >
                        <a>Create Info</a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="infoList">
                    <Link href="/cp/mang/infoList" as="/mange/infoList" >
                        <a>info List</a>
                    </Link>
                </Menu.Item>


              </SubMenu>
     
            </Menu>
          </Sider>

          <Layout>
            <Header style={{ background: '#fff', padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>

              <div style={{ padding: 24, background: '#fff', minHeight: 360 }} className="mt-4">
                {this.props.children}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Dashboard Orangeito
            </Footer>
          </Layout>
        </Layout>
      );
    }
  }
  
export default Admin;
