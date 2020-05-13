import {observable} from 'mobx'
import {observer, inject} from 'mobx-react'
import {Component} from 'react'

const appState= observable({
    count :0 ,
})

@inject('store')
@observer class mobx extends Component {




    render() {
const {store}  = this.props;
        return (
            <div>
                    {store.posts.post}
                <button onClick={ (e)=>{store.test()}}>da</button>
                    <br></br>
                {appState.count}
                <button onClick={this.handleInc}>+</button>
                <button onClick={this.handleDec}>-</button>
            </div>
        );
    }

    handleInc =() =>{
        appState.count ++;
    }
    handleDec = () =>{
            appState.count--;
    }
}

export default mobx;