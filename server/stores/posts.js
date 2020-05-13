import { types, applySnapshot } from 'mobx-state-tree'
import axios from 'axios';
import Router from 'next/router';


const posts = types.model("posts", {
    post: 'this data',
    title: ''
}).actions((self) => ({

    //user create post
    userCreatePost(post){
        return axios.post('/api/user-create-post',post)
        .then(response=>{
            return response;
        })
        .catch(err=>{
                return err    
        })
    },


    //create post admin panel 
    createPost(post){
        self.post = 'new data'
       // self.article = data;
          axios.post('/api/create-post',post)
        .then(response=>{
           // console.log(response)
            if (response.data.data == 'success') {
                  Router.push('/posts/list')  
            }
        })
        .catch(err=>{
            console.log(err)
        })
    },


    //create article function
    create(article) {
        self.post = 'new data'
       // self.article = data;
          axios.post('/api/article',article)
        .then(response=>{
           // console.log(response)
            if (response.data.data == 'success') {
                  Router.push('/articles/list')  
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
}))


export default posts;