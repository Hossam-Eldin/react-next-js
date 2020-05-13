import React, { Component } from 'react';
import Layout from '../../components/layouts/webstie'
import Axios from 'axios';

class privacy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page:{}
        };
    }

    componentDidMount() {
            Axios.get('/api/pages/privacy')
            .then(response=>{
                this.setState({
                    page:response.data.data
                })
            })
            .catch(error=>{
                console.log(error);
            })
        }

    render() {
        let privacy = this.state.page;
        return (
            <Layout title="privacy">
                <div className="container">
                    <div className="row">
                        <div className="col-12 bg-c mx-auto mt-5 mb-5 p-5">
                            <h1 className="text-center text-c">Privacy Policy</h1>
                            <h4 className="text-c">{privacy.info_content}</h4>
                        </div>
                    </div>
                </div>

            </Layout>
        );
    }
}

export default privacy;