import React, { Component } from 'react';
import Layout from '../../../components/layouts/admin';
import axios from 'axios'
import Router from 'next/router'


class info extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    handleSubmit = (e) =>{
            e.preventDefault()
            let data= {
                name:this.name.value,
                content:this.content.value,
                tag:this.tag.value
            };

//            console.log(data)
            axios.post('/api/web-info',data)
            .then(response=>{
                console.log(response);
                
                if (response.data.message =='success') {
                    Router.push('/mange/infoList');
                }


            })
            .catch(error => {
                console.log(error);
            })


    }

    render() {
        return (
            <Layout>
                <form onSubmit={e => this.handleSubmit(e)} >

                    <div className="form-group">
                        <label htmlFor="">info name: like facebook or email or phone</label>
                        <input type="text" ref={input => this.name = input} className="ant-input" placeholder="enter info name"/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="">content info like link or email</label>
                       <textarea className="ant-input" ref={input =>this.content = input}></textarea> 
                    </div>
                    <div className="form-group">
                        <select ref={input => this.tag = input} className="ant-input">
                            <option value="social_media"> Social Media "like facebook like or other"</option>
                            <option value="contact_info"> Contact info "like phone or email"</option>
                            <option value="pages"> Text Pages like About , Terms</option>
                            <option value="static_info"> Static info like About in footer or text</option>
                            <option value="other"> Other</option>
                        </select>
                    </div>
                  <button className="ant-btn" > create</button>
                </form>

            </Layout>
        );
    }
}

export default info;
