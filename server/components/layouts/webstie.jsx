import React from 'react'

import { Select, Input, Layout, Menu, } from 'antd';
const { Content } = Layout;

import { Header, NavBar, Footer } from '../index';
import { locale } from 'moment';
const LightStyle = require('../../assets/style.scss');

class WebLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: "light"
        }
    }


    //check what style the user saved and use it if exists 
    componentDidMount() {
        let styling = localStorage.getItem('style');
        //  console.log('component did mount' + styling)
        if (styling == "dark") {
            this.switching("dark")
        }
        if (styling == "light") {
            this.switching("light")
        }
    }
    //for switching  function
    switching = (style) => {
        this.setState({ theme: style });
        document.documentElement.classList.add("color-theme-in-transition");

        document.documentElement.setAttribute("data-theme", style);
        window.setTimeout(() => {
            document.documentElement.classList.remove("color-theme-in-transition");
        }, 1000);
    }

    //handle toggle button in nav bar to switch between themes in theme.scss
    toggleTheme = () => {
        const theme = this.state.theme === "light" ? "dark" : "light";
        document.documentElement.classList.add("color-theme-in-transition");
        this.setState({ theme });
        document.documentElement.setAttribute("data-theme", theme);
        window.setTimeout(() => {
            document.documentElement.classList.remove("color-theme-in-transition");
        }, 1000);
        localStorage.setItem('style', theme);
    }



    render() {
        return (
            <div style={LightStyle} >

                <Header
                    title={this.props.title}
                    keywords={this.props.keywords}
                    link={this.props.link}
                    image={this.props.image}
                    author={this.props.author}
                    description={this.props.description}

                />

                <NavBar styling={this.toggleTheme} />

                <div className="position-relative">
                    <Content style={{ paddingTop: '55px' }} className="b-bg">
                        {this.props.children}
                    </Content>
                    {/* <Footer />*/}
                </div>

            </div>
        )
    }
}


export default WebLayout;