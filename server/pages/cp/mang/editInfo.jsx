import React, { Component } from 'react';
import Layout from '../../../components/layouts/admin';
import Axios from 'axios'
import { withRouter} from 'next/router'
import Router from 'next/router';

class editInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info:{}
        };
    }

    componentDidMount(){
        Axios.get('/api/web-info/'+this.props.router.query.id)
        .then(response=>{
            console.log(response)
            this.setState({
                info:response.data.data
            })
        })
        .catch(error=>{
            console.log(error);
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        let data = {};

        if (this.infoname.value) {
            data.name = this.infoname.value;
        }
        if (this.content.value) {
            data.content = this.content.value;
        }
        if (this.tag.value) {
            data.tag = this.tag.value;
        }

        console.log(data)
        try {
            let response = await Axios.patch('/api/web-info/edit/'+ this.props.router.query.id , data)
            console.log(response);
            if (response.data.message =='success') {
                Router.push('/mange/infoList')
            }

        } catch (error) {
            console.log(error);
        }

    }

    render() {
        //alert(this.props.router.query.id);
        let info = this.state.info;
        return (
            <Layout>
                <form onSubmit={e => this.handleSubmit(e)} >
                    <h2>{this.props.router.query.id}</h2>
                    <div className="form-group">
                        <label htmlFor="">info name: like facebook or email or phone</label>
                        <input type="text" ref={input => this.infoname = input} className="ant-input" placeholder="enter info name" />
                        <p>{info.info_name}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">content info like link or email</label>
                        <textarea className="ant-input" ref={input => this.content = input}></textarea>
                        <p>{info.info_content}</p>
                    </div>
                    <div className="form-group">
                        <select ref={input => this.tag = input} className="ant-input">
                            <option value="social_media"> Social Media "like facebook like or other"</option>
                            <option value="contact_info"> Contact info "like phone or email"</option>
                            <option value="other"> Other</option>
                        </select>
                        <p>{info.tag}</p>
                    </div>
                    <button className="btn btn-info" >update</button>
                </form>

            </Layout>
        );
    }
}

export default withRouter(editInfo);