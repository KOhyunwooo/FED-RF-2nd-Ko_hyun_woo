import React from "react";

// 메뉴 데이터 불러오기
import { gnbData } from "../../js/data/gnb";
import { TotalMenu } from "../modules/TotalMenu";
// 제이쿼리 불러오기
import $ from "jquery";

function TopArea({pgName}) {
  
  // 전체 메뉴 열기닫기 함수///////////////////////////////
  const showHideMenu=(e)=>{
    console.log("나는 showHideMenu",e.currentTarget); //<- 나 자신을 콘솔찍기
    // 1.전체메뉴 대상: .mbox
    $(".mbox").fadeToggle(200);
    //fadeIn() 서서히 나타남
    //fadeOut() 서서히 사라짐 -> display:none
    //fadeToggle() 서서히 나타남/ 사라짐 전환

    // 2.햄버거 버튼에 클래스 "on"넣기/ 뺴기
    $(e.currentTarget).toggleClass("on");
    // addClass() 클래스 넣기
    // removeClass() 클래스 뺴기
    // toggleClass() 클래스 넣기/ 뺴기


    console.log($(e.currentTarget).is(".on"));//<-e.currentTarget에 .on 이 있냐?
    // 3. 비디오 재생/멈춤하기
    // 대상:. bgm
    let bgm = $(".bgm");
    // 제이쿼리의 미디어를 선택후 실제 사용할 때는 get(0)하고 난 후 사용한다!


    // 햄버거버튼에 클래스"on"있으면 재생, 없으면 멈춤
    $(e.currentTarget).is(".on")? bgm.get(0).play():bgm.get(0).pause();
    // play()는 재생, pause()는 멈춤 메서드

    // JS에서는 선택후 바로 play(),pause()를 사용함
    // document.querySelector(".bgm").play();
    // document.querySelector(".bgm").pause();

  };/////////전체 메뉴 열기닫기 함수:showHideMenu//////////
  
  return (
    <>
      <div id="top-area">
        <header className="top-area ibx">
          <h1 id="logo">
            <a href="#">
            <img src={process.env.PUBLIC_URL+"/images/main_logo.png"} alt="파일럿로고" />
            </a>
          </h1>
          <nav className="gnb">
            <ul>
              <li className="bld">배너순번 li 숨기기</li>
              {gnbData[pgName].map((v, i) => (
                <li key={i}>
                  <a href="#">{v}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="ham" onClick={showHideMenu}>
            <span></span> <span></span> <span></span>
          </div>
          {/* 전체메뉴 컴포넌트 */}
          <TotalMenu/>
        </header>
      </div>
    </>
  );
}

export default TopArea;
