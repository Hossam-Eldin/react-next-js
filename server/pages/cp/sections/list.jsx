import React, { Component } from 'react';
import '../../../assets/cp/components/table.scss'
import BootstrapTable from 'react-bootstrap-table-next';
import Layout from '../../../components/layouts/admin'
import Axios from 'axios';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { FaTrash, FaEye, FaEdit } from 'react-icons/fa'
import Router from 'next/router';
import Link from 'next/link'
import { func } from 'prop-types';


function viewHandler(id) {

}

function imageFormatter(cell, row) {
    return (
        <img src={cell} className="img-fluid img-thumbnail" key={cell} />
    )
}

function actionsFormatter(cell, row) {
    return (
        <div key={cell}>
            <button className="btn btn-outline-info mr-2" title="Edit">
                <Link href={`/cp/sections/edit/?id=${cell}`} as={`/section/edit/${cell}`}><FaEdit /></Link>
            </button> 
            <button type="button" className="btn btn-outline-success mr-2" title="View"
                onClick={e => { viewHandler(cell) }}><FaEye /></button>

        </div>
    );
}


const columns  = [
    {dataField:'id', text:'Id'},
    {dataField:'name', text:'Title'},
    {dataField:'icon', text:'icon', formatter: imageFormatter},
    {dataField:'id', text:'actions',formatter:actionsFormatter}

]


class list extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        Axios.get('/api/sections').then(response => {

            //console.log(response.data.data)
            this.setState({
                data: response.data.result
            })
            console.log(this.state.data)

        }).catch(error => {
            console.log(error)
        })
    }



    render() {
        return (
            <Layout>

                <BootstrapTable keyField='id' data={this.state.data}
                    columns={columns} pagination={paginationFactory()} />
            </Layout>
        );
    }
}

export default list;