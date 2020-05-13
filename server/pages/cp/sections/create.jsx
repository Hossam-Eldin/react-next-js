import React, { Component } from 'react';
import Layout from '../../../components/layouts/admin';
import axios from 'axios';
import Router from 'next/router';

class create extends Component {

    handleSubmit = (e)=>{
    
        e.preventDefault()

        console.log(this.title.value, this.description.value, this.image.value);
        const section = new FormData();
        section.append('image', this.image.files[0], this.image.files[0].name)
        section.append('title', this.title.value);
        section.append('description', this.description.value);

        axios.post('/api/section',section).then(response => {
            console.log(response)
            if (response.data.data =='success') {
                Router.push('/section/list');
            }
        }).catch(error=>{
            console.log(error)
        })

      //  const category = new FormData();
        //category.append('title',)
    }

    render() {
        return (
            <Layout>
            <div>
                <form  onSubmit={e => { this.handleSubmit(e) }} encType="multipart/form-data">
                    <div className="form-group">
                        <label htmlFor="">category title</label>
                        <input type="text" ref={input => this.title = input} className="form-control"/>
                    </div>  
                    
                    <div className="form-group">
                        <label htmlFor="">category description</label>
                        <textarea  ref={input => this.description = input}  className="form-control" rows="2"></textarea>
                    </div>  

                    <div className="form-group">
                        <label htmlFor="">Category Icon (image)</label>
                        <input type="file" ref={input => this.image = input} className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Language</label>
                        <select ref={input =>  this.lang  = input} className="form-control" >
                            <option value="">Please select lang</option>
                            <option value="Ar">Arabic</option>
                            <option value="En">English</option>
                        </select>
                    </div>

                    <button className="btn btn-info">Create</button>
                </form>
            </div>
            </Layout>
        );
    }
}

export default create;