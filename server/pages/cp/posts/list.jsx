import React, { Component } from 'react';
import '../../../assets/cp/components/table.scss'
import BootstrapTable from 'react-bootstrap-table-next';
import Layout from '../../../components/layouts/admin'
import Axios from 'axios';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { FaTrash, FaEye, FaEdit } from 'react-icons/fa'
import Router from 'next/router';
import Link from 'next/link'





//delete article
function deleteHandler(id) {
    //    e.preventDefault();
    //   alert(e)
    Axios.delete('/api/post-delete-admin/' + id)
    .then(response => {
        alert(response.data.data)
    }) 
}


//view the article
function viewHandler(id) {
    Router.push('/p/' + id)
}




function imageFormatter(cell, row) {
    return (
        <img src={cell} className="img-fluid img-thumbnail" key={cell} alt="" />
    )
}


function actionsFormatter(cell, row) {
    return (
        <div key={cell}>
            <button type="button" className="btn btn-outline-danger mr-2"
                onClick={e => { deleteHandler(cell) }} title="Delete"> <FaTrash /></button>
            <button className="btn btn-outline-info mr-2" title="Edit">
             <Link href={`/cp/posts/edit/?id=${cell}`} as={`/post/edit/${cell}`}><FaEdit /></Link> 
            </button>

            <button type="button" className="btn btn-outline-success mr-2" title="View"
                onClick={e => { viewHandler(cell) }}><FaEye /></button>

        </div>
    );
}


const columns = [
    { dataField: 'id', text: 'Article Id' },
    { dataField: 'title', text: 'Article Title' },
    { dataField: 'type', text: 'type' },
    { dataField: 'id', text: 'actions', formatter: actionsFormatter }
];


class list extends Component {
    state = {
        data: []
    }

    componentDidMount() {
        Axios.get('/api/post-list').then(response => {

            //console.log(response.data.data)
            this.setState({
                data: response.data.data
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