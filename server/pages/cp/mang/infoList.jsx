import React, { Component } from 'react';
import '../../../assets/cp/components/table.scss'
import BootstrapTable from 'react-bootstrap-table-next';
import Layout from '../../../components/layouts/admin'
import Axios from 'axios';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { FaTrash, FaEye, FaEdit } from 'react-icons/fa'
import Router from 'next/router';
import Link from 'next/link'


function viewHandler(id) {

}

function deleteHandler(id) {
     Axios.delete('/api/info-delete/' + id)
     .then(response=>{
         console.log(response)
     }).catch(error=>{
         console.log(error)
     })
}

function actionsFormatter(cell, row) {
    return (
        <div key={cell}>
     
     <button type="button" className="btn btn-outline-danger mr-2"
                onClick={e => { deleteHandler(cell) }} title="Delete"> <FaTrash /></button>
            <button className="btn btn-outline-info mr-2" title="Edit">
                 <Link href={`/cp/editInfo/edit/?id=${cell}`} as={`/info/edit/${cell}`}><FaEdit /></Link>
            </button>
            <button type="button" className="btn btn-outline-success mr-2" title="View"
                onClick={e => { viewHandler(cell) }}><FaEye /></button>

        </div>
    );
}




const columns = [
    { dataField: 'id', text: 'Id' },
    {dataField:'info_name' , text:'title'},
    { dataField: 'tag', text: 'Tag' },
    { dataField: 'id', text: 'Actions', formatter: actionsFormatter },
]

class infoList extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    componentDidMount() {
        Axios.get('/api/web-infos')
            .then(response => {

                this.setState({
                    data: response.data.data
                })
            })
            .catch(error => {
                console.log(error);

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

export default infoList;