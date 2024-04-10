
import axios from 'axios';
import {toast, ToastContainer, otherPropsFromToastConfigure} from 'react-toastify';
{/* <ToastContainer
    autoClose={5000}
    hideProgressBar={true}
/> */}
const getList = async() => {
    let response = await axios.get('http://localhost:8000/api/todo');
    console.log('pt1 ', response.data);
    let allList = [];
    allList.push(...response.data);
    return allList;
};
const postCreateItem = async({title, description, creationDate, completionDate}) => {
   try{
    console.log('posting')
    let response = await axios.post(`http://localhost:8000/api/todo/create-list-item/${title}`,{title, description, creationDate, completionDate});
    
    return response.status;
   }
   catch(e){
    return e?.response?.data?.error || e.response.statusText;
   }
}
const updateItem = ({id, title, description=''}) =>{
    return axios.put(`http://localhost:8000/api/todo/update-item/${id}`,{title,description}).then(
      resp => {
        console.log('Updated val ', resp);
      });
}

const deleteItem = ({id}) => {
   return axios.delete(`http://localhost:8000/api/todo/delete-item/${id}`).then(
      resp => {
      console.log('Delete response', resp)
      });
}

export {getList, postCreateItem, updateItem, deleteItem};