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
function deleteHnadler(e) {
    //    e.preventDefault();
    alert(e)
    Axios.delete('/api/article-delete/' + e).then(response => {
        alert( JSON.stringify( response.data.data))
        Router.push('/articles/list')
    })
}


//view the article
function viewHandler(id) {
    Router.push('/p/' + id)
}




function imageFormatter(cell, row) {
    return (
        <img src={cell} className="img-fluid img-thumbnail d-block mx-auto" style={{height:'200px'}} key={cell} alt="" />
    )
}


function actionsFormatter(cell, row) {
    return (
        <div key={cell}>
            <button type="button" className="btn btn-outline-danger mr-2"
                onClick={e => { deleteHnadler(cell) }} title="Delete"> <FaTrash /></button>
                <button className="btn btn-outline-info mr-2" title="Edit">

                <Link href={`/cp/articles/edit/?id=${cell}`} as={`/articles/edit/${cell}`}><FaEdit /></Link>
                </button>

            <button type="button" className="btn btn-outline-success mr-2" title="View"
                onClick={e => { viewHandler(cell) }}><FaEye /></button>

        </div>
    );
}


const columns = [{
    dataField: 'id',
    text: 'Article Id'
},
{
    dataField: 'title',
    text: 'Article Title'
}, {
    dataField: 'summery',
    text: 'summery',
    // formatter: priceFormatter
},
{
    dataField: 'image',
    text: 'image',
    formatter: imageFormatter
}, {
    dataField: 'id',
    text: 'actions',
    formatter: actionsFormatter
}
];




class list extends Component {
    state = {
        data: []
    }

    componentDidMount() {
        Axios.get('/api/article-list').then(response => {

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