import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateNav from './components/CreateNav';
import { ListItems } from './components/ViewExpiring';
import { deleteItem, getList, postCreateItem, updateItem } from './api/api';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.minimal.css";
import styled from 'styled-components';
import { injectStyle } from "react-toastify/dist/inject-style";
import Home from './components/Home';
// CALL IT ONCE IN YOUR APP
if (typeof window !== "undefined") {
  injectStyle();
}

function App() {
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
      alert('new Date().setDate(new Date().getDate()-3)', new Date().setDate(new Date().getDate()-3))
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
       <BrowserRouter>
        <div className="App">
       <CreateNav />
        <Route path="/home" render={()=><Home />} />
        <Route path="/home/expiring" render={()=><ListItems list={list} updateListItem={updateListItem} deleteListItem={deleteListItem} />}/>
        </div>
    </BrowserRouter>
  );
}
export default App;
