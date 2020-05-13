import React, { Component } from 'react';
import formStyle from 'bootstrap-scss'
import Axios from 'axios';

class signup extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    signUpHandler = async (e) => {
        e.preventDefault()
        let data = {
            firstName: this.firstName.value,
            lastName : this.lastName.value,
            username: this.username.value,
            email: this.Email.value,
            password: this.password.value
        }
        console.log(data)
        try {
            let result = await Axios.post('/api/admin-signup', data)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.signUpHandler} style={formStyle} className="row">
                    <div className="col-lg-6 col-md-7  col-sm-12 d-block mx-auto">
                        <h2 className="text-center"> Create New Admin </h2>

                        {/* first name  */}
                        <div className="form-group">
                            <label htmlFor=""> First Name </label>
                            <input type="text" ref={input => this.firstName = input} className="form-control" placeholder="First Name" />
                        </div>
                        {/* last name */}
                        <div className="form-group">
                            <label htmlFor=""> Last Name</label>
                            <input type="text" ref={input => this.lastName = input} className="form-control" placeholder="Last Name" />
                        </div>
                        {/*    user name  */}
                        <div className="form-group">
                            <label htmlFor="">User Name</label>
                            <input type="text" ref={input => this.username = input} className="form-control" placeholder="User Name" />
                        </div>
                        {/* email */}
                        <div className="form-group">
                            <label htmlFor="">Email</label>
                            <input type="email" ref={input => this.Email = input} className="form-control" placeholder="example@example.com" />
                        </div>
                        {/* password */}
                        <div className="form-group">
                            <label htmlFor="">Password</label>
                            <input type="password" ref={input => this.password = input} className="form-control" placeholder="********" />
                        </div>

                        <button className="btn btn-info btn-block"> Create </button>

                    </div>
                </form>

            </div>
        );
    }
}

export default signup;