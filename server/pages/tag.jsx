import React, { Component } from 'react';
import Layout from '../components/layouts/webstie';
import { withRouter } from 'next/router'
import Link from 'next/link'
import Axios from 'axios';



class tag extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    componentWillMount(){
            Axios.get('/api/tag/'+this.props.router.query.title)
            .then(response=>{
                console.log(response)
            })
            .catch(error=>{
                console.log(error)
            })
    }

    render() {
        return (
            <Layout>

            {this.props.router.query.title}

            </Layout>
        );
    }
}

export default withRouter(tag);