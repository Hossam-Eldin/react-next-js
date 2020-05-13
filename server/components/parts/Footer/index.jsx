import React, { Component } from 'react';
import styles from './style.scss'
import { BottomFooter, Slider, SocialBtns } from '../../index'
import Axios from 'axios';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {

    }

    render() {

        const image = {
            backgroundImage: "url(" + 'https://boombox.px-lab.com/animatrix/wp-content/uploads/sites/9/2016/10/animatrix-bg.jpg' + ")"
        }
        return (

            <div className="footer col-12 p-0" style={[styles, image]}>

                <div className="container-fluid" >
                    <div className="row p-4" >

                        <div className="col-4 footer-text text-center">
                            <h2>About us</h2>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta dolorum quaerat qui doloremque. Dolorum autem id voluptates eveniet fuga suscipit adipisci velit! Quia illo praesentium placeat perspiciatis nesciunt cumque impedit?</p>
                        </div>
                        <div className="col-4 d-flex row justify-content-center">
                            <img
                                src="https://boombox.px-lab.com/wp-content/uploads/2018/11/250-1.jpg?x98972"
                                alt=""
                                className="img-fluid" />
                            <div className="col-12">
                                <SocialBtns />
                            </div>
                        </div>

                        <div className="col-4">
                            <h2 className="text-center footer-text"> The Facebook Box</h2>
                        </div>



                    </div>
                </div>

                <div className="col-12 p-0">
                    <BottomFooter />
                </div>
            </div>

        );
    }
}

export default Footer;