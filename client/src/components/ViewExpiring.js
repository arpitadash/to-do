import React, { FunctionComponent, useState, useEffect, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';

// const style = require('common.css');
const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  background-color: #2196F3;
  padding: 2px;
`;
const RowEle = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 5px;
  font-size: 24 px;
  text-align: center;
`;


export const ListItems = (props) => {
    const [render, setRender] = useState(false);
    // const checkKeyPress = useCallback((e) => {
    //     const { key, keyCode } = e;
    //     console.log(key, keyCode);
    //     if (keyCode === 13) {
    //       alert(render);
    //     }
    //   },[render]);
    useEffect(()=>{
        console.log("rerendering");

    },[render])
    const {list, updateListItem, deleteListItem} = props;
    const handleKeyDown = (id, e) => {
        if (e.key==='Enter'){
        //   console.log('Enter is pressed');
          updateListItem(id,e.target.value)
          e.target.value='';  
          setRender(false)
        }
        else{
            const inputEl = document.getElementById(`list-btn-${id}`);
            console.log('nput el of', id,inputEl.innerText)
            inputEl.innerText = inputEl.textContent = getButtonLabel(id);
            e.key==='Backspace'?setRender(false):setRender(true);
            return; 
        }
      }
      const getInputValue = (itemid) => {
        const inputEl = document.getElementById(`list-inp-${itemid}`);
        return inputEl?.value;
      }
     const getButtonLabel = (itemid) => {
        console.log('GetButtonLabell', !!getInputValue(itemid))
        return !!getInputValue(itemid) ? 'Update' : 'Delete';
     };
    const buttonClick = (itemid) => {
        return !!getInputValue(itemid) ? updateListItem(itemid,getInputValue(itemid)) : deleteListItem(itemid);
    }
    const isExpiring = (itemExp) => {
        // let currentDate = new Date();
        let completionDate = new Date(new Date().setDate(new Date().getDate()-2));
        return new Date(itemExp)<completionDate;
     
    }
    // const renderTableEle = (listItem) => {
    //     // const buttonLabel = getButtonLabel(listItem._id);
    //     return (
            
    //         )
    // }
    return (
        <Container>
            <div>
            {!!list.length &&
        (
            <Grid>
                <RowEle>Title</RowEle>
                <RowEle>Date Expiring</RowEle>
                <RowEle>Update Title</RowEle>
                <RowEle>Action</RowEle>
                {list.map(listItem => (
                    <>
                    <RowEle expiring={isExpiring(listItem.completionDate)}>{listItem.title}</RowEle>
                    <RowEle>{new Date(listItem.completionDate).toString()}</RowEle>
                    <RowEle><input id={`list-inp-${listItem._id}`} placeholder='Enter updated title' onFocus={(e)=>{handleKeyDown(listItem._id,e)}} onKeyDown={(e)=>{ handleKeyDown(listItem._id,e);}}/> </RowEle>
                    <RowEle>
                        <button  id={`list-btn-${listItem._id}`} onClick={(e)=>{console.log('delete pressed',e ); buttonClick(listItem._id)}}>{getButtonLabel()}</button>
                    </RowEle>
                    </>
                ))}   
            </Grid>
      )}
            </div>
        </Container>
        

    )
}