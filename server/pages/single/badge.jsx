import React, { Component } from 'react';
import Layout from '../../components/layouts/webstie';
import { withRouter } from 'next/router';
import { PostCard } from '../../components/index'
import Axios from 'axios';

class badge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            url: ''
        };
    }

    componentDidMount() {
        let badge = this.props.router.query.badge;

        Axios.get('/api/badge/' + badge)
            .then(response => {
                console.log(response);
                this.setState({
                    url: window.location.href,
                    articles: response.data.data
                })
            })
            .catch(error => {
                console.log(error)
            })

    }
    render() {
        let badge = this.props.router.query.badge;
        return (
            <Layout
                title={badge}
                keywords={badge}
                link={this.state.url}
                author="Orangeito"
            >
                <div className="container">
                    <div className="row pt-5">
                        <div className="col-12 p-3">
                            <h2 className="text-c">{this.props.router.query.badge} </h2>
                            <div className="border-d"></div>
                        </div>
                        <div className="col-8">
                            {
                                this.state.articles.map(el => {

                                    return <PostCard image={el.thumbnail} id={el.id} title={el.title} text={el.summery} date={el.created_at} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default withRouter(badge);