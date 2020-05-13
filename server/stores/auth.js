import {
    types,
    applySnapshot
} from 'mobx-state-tree'
import Axios from 'axios';
import jtw from 'jsonwebtoken';

const oauth = types.model("auth", {
        auth: '',
        testing: 'testing working',
        username: '',
        avatar: ''
    })
    .actions((self) => ({

        //handle facebook auth
        facebookLogin(data) {
            console.log(data.accessToken)
            const token = {
                "access_token": data.accessToken
            }

            return Axios.post('/api/oauth/facebook', token)
                .then(response => {
                    //saving the token in local storage
                    console.log(response.data.token)
                    localStorage.setItem('token', response.data.token)
                    let token = jtw.decode(response.data.token)
                    console.log(token);
                    //save the user data in token                        
                    localStorage.setItem('user_data', JSON.stringify(token));
                    let user = JSON.parse(localStorage.getItem('user_data'))
                    console.log(user.avatar)
                })
                .catch(error => {
                    console.log(error)
                })

        },
        //handle google auth
        googleLogin(data) {
            /**handle google token auth  */
            console.log(data.accessToken)
            //token to send to api
            const token = {
                "access_token": data.accessToken
            }
            //api call
            return Axios.post('/api/oauth/google/', token)
                .then(response => {
                    //saving the token in local storage
                    console.log(response.data.token)
                    localStorage.setItem('token', response.data.token)
                    let token = jtw.decode(response.data.token)
                    console.log(token);
                    //save the user data in token                        
                    localStorage.setItem('user_data', JSON.stringify(token));
                    let user = JSON.parse(localStorage.getItem('user_data'))
                    console.log(user.avatar)
                })
                .catch(error => {
                    console.log(error)
                })

        }
    }))


export default oauth