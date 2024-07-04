// Pilot PJ 전체메뉴 컴포넌트

import { useContext } from "react";
import { pcon } from "./pcon";
import ItemList from "../pages/ItemList";

export function TotalMenu() {
 //컨텍스트 사용하기
 const myCon=useContext(pcon);
// 서브페이지 이동함수//
  const gosub=(e)=>{
    //이동할 서브 페이지명: a 요소의  글자를 소문자로!
    let pgName = e.target.innerText.toLowerCase();
    console.log("이동할 페이지 소문자로 바꾸기:",pgName)
    // -> 아이템 리스트 페이지는 중간 공백을 데쉬로 변경
    pgName = pgName.replace(" ","-")
    //기본이동막기
    e.preventDefault();
    //서브페이지 이동위해 상태변수 업데이트
    myCon.setPgName(pgName);
    // 햄버거버튼 클릭이벤트 발생하여 전체메뉴 닫기
    document.querySelector(".ham").click();
  };///////////////////////////

    // 코드 리턴 //////////////////////
    return (
      <>
        <div className="mbox">
          <video
            src="./images/disc2018.mp4"
            loop="loop"
            muted="muted"
            className="bgm"
          ></video>
          <nav className="mlist">
            <dl>
              <dt>
                <a href="#" onClick={gosub}>MEN</a>
              </dt>
              <dd>
                <a href="#" onClick={gosub}>T-SHIRT</a>
              </dd>
              <dd>
                <a href="#" onClick={gosub}>JACKET</a>
              </dd>
              <dd>
                <a href="#" onClick={gosub}>TRAINING WARE</a>
              </dd>
              <dd>
                <a href="#" onClick={gosub}>BEACH WARE</a>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="#" onClick={gosub}>WOMEN</a>
              </dt>
              <dd>
                <a href="#" onClick={gosub}>T-SHIRT</a>
              </dd>
              <dd>
                <a href="#" onClick={gosub}>JACKET</a>
              </dd>
              <dd>
                <a href="#" onClick={gosub}>TRAINING WARE</a>
              </dd>
              <dd>
                <a href="#" onClick={gosub}>BEACH WARE</a>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="#" onClick={gosub}>STYLE</a>
              </dt>
              <dd>
                <a href="#" onClick={gosub}>COLLECTION</a>
              </dd>
              <dd>
                <a href="#" onClick={gosub}>SEASON AD</a>
              </dd>
              <dd>
                <a href="#" onClick={gosub}>STAR &amp; NEWS</a>
              </dd>
              <dd>
                <a href="#" onClick={gosub}>MAIN ITEM</a>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="#" onClick={gosub}>ITEM LIST</a>
              </dt>
              <dd>
              </dd>
             
            </dl>
          </nav>
        </div>
      </>
    );
  } ///////// TotalMenu 컴포넌트 //////////
  