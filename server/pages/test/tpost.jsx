import React from 'react'
import 'bootstrap-scss'
import Axios from 'axios';

class tpost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
        let data = this.state.value;        
        Axios.post('http://localhost:3000/api/article',{title:this.state.value})
        .then(response=>{
            console.log(response)
        }).catch(error=>{
            console.log(error)
        })

      }




    render() {
        return (
        
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
        );
    }
}

export default tpost;