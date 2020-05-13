import React from 'react';
import axios from 'axios';
import 'bootstrap-scss'
class Test extends React.Component{
    state={
        data:{}
    }
    
    
    componentWillMount(){
        axios.get('http://localhost:3000/api/article/?post_id=1')
        .then(response=>{
                console.log(response.data.data);

                this.setState({
                    data: response.data.data
                })
        })
        .catch(err=>{
            console.log(err)
        })
    };
   
    render(){
        let html = this.state.data.body;
        return  (
                <div>
                    {this.state.data.title}
                    <div dangerouslySetInnerHTML={{__html: html}} />;

                </div>
            )
    }
}


export default Test;