import React, { Component } from 'react';
import Axios from 'axios';
import Link from 'next/link'
import {FaSearch} from 'react-icons/fa'

class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            query: '',
        };
    }

    getInfo = () => {
        Axios.get(`/api/search/?search=${this.state.query}`)
          .then(({ data }) => {
            this.setState({
              results: data.data // MusicGraph returns an object named data, 
              // as does axios. So... data.data                             
            })
          })
      }
    
  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
      }

    })
    if (!this.search.value) {
      this.setState({
        results: [],
        query: ''
      })
    }
  }


    render() {
        return (
            <div>

                <form className="nav-search">

                    <input
                        type="search"
                        className="ant-input"
                        placeholder="Search..."
                        ref={input => this.search = input}
                        onChange={this.handleInputChange}
                    // onMouseLeave={e => { this.setState({ results: [] }) }}
                    />
                        <FaSearch className="search-icon" />
                </form>
                <ul className="list-group bg-light position-absolute">

                    {
                        this.state.results.map(el => {
                            return <li key={el.id} className="list-group-item bg-white" > <Link href={`/article/?id=${el.id}`} as={`/a/${el.id}`}>{el.title}</Link> </li>
                        })
                    }
                </ul>
            </div>

        );
    }
}

export default SearchComponent;