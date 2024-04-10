
import '../App.css';
import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import CreateNav from './CreateNav';
import { ListItems } from './ViewExpiring';
import { deleteItem, getList, postCreateItem, updateItem } from '../api/api';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.minimal.css";
import { injectStyle } from "react-toastify/dist/inject-style";

// CALL IT ONCE IN YOUR APP
if (typeof window !== "undefined") {
  injectStyle();
}

function Home() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [list, setList] = React.useState([]);
  const [inputList, setInputList] = React.useState('');
  React.useEffect(()=>{
    fetchList();
  },[])

  const fetchList = async() => {
    let allList = await getList();
    setList(allList);
  }
  const createListItem = (title, description='') => {
    if(!!list.find(listItem => listItem.title===title)) 
    {setIsOpen(true); return;} 
    if (!!title){
      let creationDate = new Date();
      let newDate = new Date(new Date().setDate(new Date().getDate()-1))
      let completionDate = new Date(new Date().setDate(new Date().getDate()-3));
      postCreateItem({title:title, description:description, creationDate:creationDate, completionDate:completionDate}).then(resp => {
        if(resp==200){
          fetchList();
        }
        else{
          console.log(resp);
          toast(resp);
        }
      });
    }
    return;
  }

  const deleteListItem = (id) => {
    if(!!id)
    deleteItem({id:id}).then((resp) => {
      let newList = list.filter(listItem=>listItem._id!=id);
      setList(newList)
    }
      );
    return;
  }
  const updateListItem = (id, title) => {
    if(!!title && !!id)
    updateItem({id, title, description:''}).then(()=>{
        fetchList();
      }
    )
  }
  
 
  const closeModal = () =>{
    setIsOpen(false);
  }
  const fetchItems = () => {
    fetchList().then(()=> {console.log(list);})
  }
  
  const openModal = () => {
    return(
      <div>
        <p> Are you crazy, this already exists.</p>
        <button onClick={closeModal}>Ok, closing</button>
      </div>
    )
  }
  return (
    <div style={{padding: '10px'}}>
      <button onClick={()=>fetchItems()}>Fetch Latest List Items</button> 
        <Modal
        isOpen={modalIsOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <div>
          <p> Are you crazy, this already exists.</p>
          <button onClick={closeModal}>Ok, closing</button>
        </div>
        </Modal>  
        <input type={"text"} placeholder="Please enter the title of the list item" onKeyPress={(e)=>{if (e.key==="Enter"){ createListItem(e.target.value); e.target.value=''}}}></input>
        
     
      <div style={{flex: 1, left: "50%",right:"auto", position: "absolute",transform: 'translate(-50%, 50%)'}}>
      <ListItems list={list} updateListItem={updateListItem} deleteListItem={deleteListItem} />
      </div>
      <ToastContainer
      autoClose={3000}
      />
    </div>
  );
}
export default Home;
