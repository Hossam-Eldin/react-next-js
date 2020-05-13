import React, { Component } from 'react'
import { SocialList, ImgCard, BCard, SocialBtns, NavSlider } from '../../index'
import styles from './style.scss';
import { FaBeer, FaFacebookF } from 'react-icons/fa';

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {


        const Posts = [...this.props.posts];
        return (
            <div style={styles} className="side-bar row mb-5">

                <div className="col-10 d-block mx-auto row">
                    <div className="col-12  pt-5 pb-5">
                        <img src=" https://boombox.px-lab.com/wp-content/uploads/2018/11/250-1.jpg?x98972"
                            className="img-fluid d-block mx-auto "
                            alt="" />
                    </div>

                    <div className="col-12 pt-4 pb-4  mt-5 mb-5 nav-slider border-t border-d">
                        {/* nav slider  */}
                        <p>You may also like</p>
                        <NavSlider posts={Posts} /> 
                    </div>


                    <div className="col-12 pt-5 pb-5 border-d">
                        <img src=" https://boombox.px-lab.com/wp-content/uploads/2018/11/250-1.jpg?x98972"
                            className="d-block  mx-auto img-fluid"
                            alt="" />
                        <SocialBtns />
                    </div>
                </div>



            </div>
        );
    }
}

export default SideBar;


