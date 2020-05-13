import React, { Component } from 'react';
import Layout from '../../components/layouts/webstie'
import Axios from 'axios'

class about extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: {}
        };
    }

    componentDidMount() {
        Axios.get('/api/page/about')
            .then(response => {
                if (response.data.data) {
                    this.setState({
                        page: response.data.data
                    })
                }
    
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        let about = this.state.page;
        return (
            <Layout title="About">
                <div className="container">
                    <div className="row">
                        <div className="col-12  mx-auto mt-5 mb-5 p-5 bg-c">
                            <h1 className="text-center text-c">About Orangeito</h1>
                            <h4 className="text-c">{about.info_content}</h4>
                        </div>
                    </div>
                </div>

            </Layout>
        );
    }
}

export default about;

