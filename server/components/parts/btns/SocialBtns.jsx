import React, { Component } from 'react';
import Axios from 'axios';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'


class SocialBtns extends Component {
    constructor(props) {
        super(props);
        this.state = {
            facebook: {},
            twitter: {},
            insta: {},
            youtube: {},
        };
    }

    componentDidMount() {
        //facebook data
        Axios.get('/api/info-name/?name=facebook')
            .then(response => {
                this.setState({ facebook: response.data.data })
            })
            .catch(error => {
                console.log(error)
            })
         //twitter 
        Axios.get('/api/info-name/?name=twitter')
            .then(response => {
                this.setState({ twitter: response.data.data })
            })
            .catch(error => {
                console.log(error)
            })
        //instagram
        Axios.get('/api/info-name/?name=insta')
        .then(response => {
            this.setState({ insta: response.data.data })
        })
        .catch(error => {
            console.log(error)
        })
    }


    render() {
        return (
            <div className="social-style">
                <div className="effect jaques">

                    <div className="buttons">
                        {
                            this.state.facebook != null ?
                                (
                                    <a href={this.state.facebook.info_content}
                                        className="fb" title="Join us on Facebook"><FaFacebookF /></a>
                                )
                                : null
                        }

                        {
                            this.state.twitter  != null ?
                                (
                                    <a href={this.state.twitter.info_content}
                                        className="tw" title="Join us on Twitter"><FaTwitter /></a>
                                )
                                : null
                        }
                        {
                            this.state.inst  != null ?
                                (
                                    <a href={this.state.inst.info_content}
                                        className="insta" title="Join us on Instagram"><FaInstagram /></a>
                                )
                                : null
                        }



                    </div>
                </div>
            </div>


        );
    }
}

export default SocialBtns;