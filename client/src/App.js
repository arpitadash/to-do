import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';


// const printAPIval = () => {
//   let response = apiCall().then(resp => resp);
//   console.log('Response: ', response[0].title)
//   return response[0].title;
//   // console.log('Response',resp);xx`
// }
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function App() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [list, setList] = React.useState([]);
  const [inputList, setInputList] = React.useState('');
  React.useEffect(()=>{
    getList();
  },[])

  const getList = async() => {
    let response = await axios.get('http://localhost:8000/api/todo');
    console.log('pt1 ', response.data);
    let allList = [];
    allList.push(...response.data);
    setList(allList);
  }
  const createListItem = (title, description='') => {
    if(!!list.find(listItem => listItem.title===title)) 
    {setIsOpen(true); return;} 
    if (!!title){
      let creationDate = new Date();
      let completionDate = new Date(new Date().setDate(new Date().getDate()+2));
      axios.post(`http://localhost:8000/api/todo/query/${title}`).then((data)=>console.log(data));
      axios.post('http://localhost:8000/api/todo',{title, description, creationDate, completionDate}).then(()=>{getList()});}
    return;
  }

  const deleteListItem = (id) => {
    if(!!id)
    axios.delete(`http://localhost:8000/api/todo/${id}`).then(
      resp => {
      console.log('Delete response', resp)
      let newList = list.filter(listItem=>listItem._id!=id);
      setList(newList)
    }
      );
    return;
  }
  const updateListItem = (id, title) => {
    if(!!title && !!id)
    axios.put(`http://localhost:8000/api/todo/${id}`,{title,description:''}).then(
      resp => {
        console.log('Updated val ', resp);
        getList();
      }
    )
  }
  const handleKeyDown = (id, e) => {
    if (e.key==='Enter'){
      console.log('Enter is pressed');
      updateListItem(id,e.target.value)
      e.target.value='';  
    }
  }
 
  const closeModal = () =>{
    setIsOpen(false);
  }
  const fetchItems = () => {
    getList().then(()=> {console.log(list);})
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          WOHOO we got in!!
        </p>
        
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
        
      </header>
      <div style={{flex: 1, left: "50%",right:"auto", position: "absolute",transform: 'translate(-50%, 50%)'}}>
      {!!list.length &&
        (<table>
        <thead >
          <tr>
          <td>Title</td>
          <td>Update</td>
          <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {list.map(listItem => {
            return(
            <tr key={listItem._id} style={new Date(listItem.completionDate)<new Date(new Date().setDate(new Date(listItem.creationDate).getDate()+2))?{background: '#cd9b9b'}:{}}>
              <td>{listItem.title}</td>
              <td><input placeholder='Enter updated title ' onKeyPress={(e)=>handleKeyDown(listItem._id,e)}/> </td>
              <td>
                <button onClick={()=>deleteListItem(listItem._id)}>Delete</button>
                </td>
            </tr>)
          })}
        </tbody>
      </table>)}
      </div>
    </div>
  );
}
export default App;
