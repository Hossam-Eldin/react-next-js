import React, { Component } from 'react';
import Admin from '../../../components/layouts/admin'
import Axios from 'axios';
import Router from 'next/router';

import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';


const { Option } = Select;



class add extends Component {

    constructor(props) {
        super(props);

        this.state = {


            //add
            inputR: [],
            postList: []

        };
    }

    componentDidMount() {

        Axios.get('/api/list-posts-random')
            .then(response => {
                this.setState({
                    postList: response.data.data
                })
            })
            .catch(err => {
                console.log(err)
            })

    }





    handleInputChange = (e, index) => {
        console.log(e)
        this.state.inputR[index] = e;
        this.setState({ inputR: this.state.inputR })
    }

    handleRemove(index) {
        this.state.inputR.splice(index, 1);
        this.setState({ inputR: this.state.inputR })
        console.log(this.state.inputR);
    }

    addInput = () => {
        this.setState({
            inputR: [...this.state.inputR, '']
        })
    }

    submit(e) {
        e.preventDefault();
        console.log(this.state.inputR);

        let data = {
            posts: this.state.inputR,
            tag: this.tag.value
        }
        console.log(data);
        Axios.post('/api/create-random', data)
            .then(result => {
                console.log(result)
                if (result.data.message == 'success') {
                    Router.push('/random/list');
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {

        let { posts } = this.state;
        const { fetching, data, value } = this.state;

        return (
            <Admin>
                <div>
                    <form onSubmit={e => this.submit(e)} className="row">
                        <div className="form-group col-4">
                            <label >Random Tag</label>
                            <select ref={input => this.tag = input} className="form-control" required >
                                <option value="">Select Tag</option>
                                <option value="CatDog">Cat and Dog</option>
                                <option value="Meme">Meme</option>
                            </select>
                        </div>
                        <div className="col-4 form-group">
                            <label htmlFor=""> Select lang for the random</label>
                            <select className="form-control" required>
                                <option value="Ar">Arabic</option>
                                <option value="En">English</option>
                            </select>
                        </div>
                        <div className="form-group col-4">
                            <label htmlFor="">to add mulitple posts </label>
                            <button type="button" className="btn btn-block btn-primary" onClick={this.addInput}>add more  posts</button>
                        </div>
                        {
                            this.state.inputR.map((post, index) => {
                                return (
                                    <div key={index} className="form-group m-3">
                                        <Select
                                            showSearch
                                            style={{ width: 200 }}
                                            placeholder="Select a person"
                                            optionFilterProp="children"
                                            value={post}
                                            onChange={e => this.handleInputChange(e, index)}
                                            /*        onChange={onChange}
                                                   onFocus={onFocus}
                                                   onBlur={onBlur}
                                                   onSearch={onSearch} */
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {
                                                this.state.postList.map(el => {
                                                    return <Option key={el.id} value={el.id}>{el.title}</Option>
                                                })
                                            }
                                        </Select>
                                        <button type="button" className="btn btn-danger"  onClick={() => this.handleRemove(index)} > remove</button>
                                    </div>
                                )
                            })
                        }

                        <div className="form-group col-12">
                            <button type="submit" className="btn btn-info">Add to Random</button>
                        </div>
                    </form>
                </div>

            </Admin>
        );
    }
}

export default add;