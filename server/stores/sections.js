import{types} from 'mobx-state-tree'
import axios from 'axios';


const Section = types.model("Section",{
    id:"",
    title:"sectui"
  
})



const Sections = types.model("Sections",{
   // sections: types.array(Section),
   sections:'',
}).actions((self)=>({
    getSection(){
       return axios.get('/api/sections')
        .then(response=>{
              return response;
            })
        .catch(error=>{
           // console.log(error)
        })
    }
}))

export default Sections;