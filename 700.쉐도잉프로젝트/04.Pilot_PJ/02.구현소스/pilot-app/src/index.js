//import ReactDOM from 'react-dom/client'; 입력후 하단 createRoot에서 ctrl+space로 ReactDOM ^ from 사이에 {createRoot} 생성
import ReactDOM, { createRoot } from 'react-dom/client';

import React from 'react';
import TopArea from './components/layout/TopArea';
import MainArea from './components/layout/MainArea';
import FooterArea from './components/layout/FooterArea';

//인덱스 css불러오기
import "../src/css/index.scss";


function MainComponent(props) {
  return (
    <>
      <TopArea/>
      <MainArea/>
      <FooterArea/>
    </>
  );
}


//출력하기/////
const root= createRoot(document.querySelector("#root"))

root.render(<MainComponent/>);