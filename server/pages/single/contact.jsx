import React, { Component } from 'react';
import Layout from '../../components/layouts/webstie';
import { FaRocket } from 'react-icons/fa'
import Axios from 'axios';
class contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success:false
        };
    }

    handleForm = (e) => {
        e.preventDefault()
        let data = {
            name: this.name.value,
            email: this.email.value,
            about: this.about.value,
            subject: this.subject.value,
            message: this.message.value
        }

        Axios.post('/api/contact-message', data)
            .then(response => {
                console.log('====================================');
                console.log(response.data);
                console.log('====================================');
                if (response.data.message === 'success') {
                    
                    this.setState({
                        success:true
                    })
                }
            })
            .catch(error => {

            })
    }

    render() {
        const message = (
                <div className="col-6 mx-auto">
                    <h2 className="text-center text-c">
                        Message was sent successfully , we will answer you  faster than internet explorer 
                    </h2>
                </div>
        )

        const form = (
        <form className="row mb-5" onSubmit={this.handleForm}>

            <div className="form-group col-4">
                <label htmlFor="">Name</label>
                <input type="text"
                    placeholder="Name"
                    ref={input => this.name = input}
                    className="form-control input-o" required />
            </div>

            <div className="form-group col-4">
                <label htmlFor="">Email</label>
                <input type="email"
                    placeholder="example@ex.com"
                    ref={input => this.email = input}
                    className="form-control input-o" required />
            </div>

            <div className="form-group col-4">
                <label htmlFor="">About</label>
                <select className="form-control input-o" ref={input => this.about = input}
                    required>
                    <option value="">About ? </option>
                    <option value="Improvement">Improve For Website</option>
                    <option value="Report">Report For Something</option>
                    <option value="Question">Question</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className="form-group col-12">
                <label htmlFor="">Subject</label>
                <input type="text" placeholder="Message Title "
                    ref={input => this.subject = input}

                    className="form-control input-o" required />
            </div>

            <div className="form-group col-12">
                <label htmlFor="">Message</label>
                <textarea className="form-control input-o"
                    ref={input => this.message = input}
                    rows="8" required></textarea>
            </div>

            <div className="col-12">
                <button className="btn-block btn-o btn btn-outline-warning"> <h3 className="m-0 text-c"> Send <small> <FaRocket /></small></h3></button>
            </div>
        </form>)

        return (
            <Layout title="Contact Us">
                <div className="container bg-c p-4 mt-5 rounded">

                    <div className="col-12 mt-5 mb-5">
                        <h2 className="text-c">Contact Us</h2>
                        <h5 className="text-c">Don't worry we don't bit </h5>
                    </div>
                        {   
                            this.state.success  === false ? 
                              form
                            : message

                         }

                </div>
            </Layout>

        );
    }
}

export default contact;