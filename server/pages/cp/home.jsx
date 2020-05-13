import React from 'react'
import Admin from '../../components/layouts/admin'
import { inject } from 'mobx-react';
import Router from 'next/router'
import {ColorCard} from '../../components/index'
import Axios from 'axios';

@inject('store')
class Home extends React.Component {
    constructor(props){
        super(props);
        this.state={
            numbers:[]
        }
    }
     componentDidMount(){
        Axios.get('/api/get-count')
            .then(response =>{
              //  console.log(response.data.data);
                this.setState({
                    numbers : response.data.data
                })
            })
            .catch(error=>{
                consoleError(error)
            })
     }

    render(){
/* 
        if (this.props.store.auth ===false) {
                Router.replace('/cp/login')
        } */

    return (
        <div>

            <Admin>
            <h1>Dashboard</h1>
                <div className="row">
                    {
                            this.state.numbers.map(el=>{
                                return (
                                    <div className="col-3 mb-4" key={el.count}>
                                        <ColorCard  bgColor={el.bg} number={el.count} bgtColor={"#e1e2e1"} name={el.name} />
                                    </div>
                                )
                            })
                    }
                </div>
            </Admin>
        </div>
    )
    }
}

export default Home;