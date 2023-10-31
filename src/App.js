/* eslint-disable */ 
import React, { useState } from "react";
import "./App.css"

function App() {
  let [title , setTitle] = useState(['남성복 추천' , '여성복 추천' , '아동복 추천']);
  let [visibleModal , setVisibleModal] = useState(false);
  let [like , setLike] = useState([0,0,0]);
  let [titleNum , setTitleNum] = useState(0);
  let [inputText , setInputText] = useState('');
  let today = new Date();
  let formattedDate = `${today.getFullYear()}년 ${today.getMonth()+1}월 ${today.getDate()}일` 

  let plutHits = (i) => {
    let copy = [...like];
    copy[i] = copy[i] + 1;
    setLike(copy);
  }

  let getText = (e) => {
    let inputText = e.target.value;
    setInputText(inputText);
  }

  let plusTitle = (inputText) => {
      setInputText('')
      setTitle([...title , inputText])
      setLike([...like , 0])
  }

  let onRemoveTitle = (deleteTitle) => {
      setTitle(title.filter(title => deleteTitle != title));
  }
  return(
    <div className="today-board">
    <div className="today-logo">
      <h4>오늘의 게시판</h4>
    </div>
    {
      title.map(function(key, i){
        return(
          <div className="today-list" key={i}>
            <h4 onClick={()=>{setVisibleModal(!visibleModal); setTitleNum(i)}}>{title[i]} <span onClick={(e)=>{e.stopPropagation(); plutHits(i)} }> 🤙 </span> {like[i]}</h4>
            <h4>{formattedDate}</h4>
            <button onClick={()=>{onRemoveTitle(title[i])}}>글 삭제</button>
          </div>
        )
      })
    }
    <input onChange={getText} value={inputText}></input>
    <button onClick={()=>{plusTitle(inputText)}}>글 작성</button>
    {
      visibleModal == true ? <Modal title={title} titleNum={titleNum} formattedDate={formattedDate}/> : ''
    }
    </div>
  )
}

const Modal = (props) => {
  return (
    <div className="modal">
      <h4>제목 : {props.title[props.titleNum]}</h4>
      <h4>작성일 : {props.formattedDate}</h4>
      <h4>상세내용 :</h4>
    </div>
  )
}
export default App;
