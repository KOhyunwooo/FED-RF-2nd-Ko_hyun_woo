// 패션 인트로 컴포넌트 ////
import React from "react";

// 컨텍스트 API불러오기:전역변수
import { pcon } from "./pcon";

// 데이터 불러오기
import { fsData } from "../../js/data/fashion_intro";

// CSS불러오기
import "../../css/fashion_intro.scss";
import { useContext } from "react";

function FashionIntro({ catName, subCat, opt }) {
    // 1. catName - 카테고리명(men,women,style)
    // 2. subCat - 서브 카테고리명
    //  (서브가 아닌경우 subCat의 값은 "etc"임!)
    // 3. opt - 방향옵션(역방향은 true / 정방향은 false)
    //  (역방향은 flex-direction: row-reverse 적용!)

    //컨텍스트API사용하기
    const myCon = useContext(pcon); //useContext에서 pcon을 가져옴

    // 선택 데이터 변수할당
    const selData = fsData[catName];

    return (
        <div id={catName} className="fs-page">
            <ul
                className="pgc"
                style={{
                    // 정방향, 역방향 적용코드
                    flexDirection: opt ? "row-reverse" : "row",
                }}
            >
                {/* 1. 첫번째 이미지 박스 */}
                <li className="imgc">
                    <img src={selData.isrc[0]} alt={selData.ialt[0]} />
                </li>
                {/* 2. 두번째 글자 박스 */}
                <li className="txtc">
                    <h2 className={catName == "style" ? "tm" : ""}>
                        {/* (참고) 데이터에 태그가 있어서 이를 html로 넣으려면
                          dangerouslySetInnerHTML={{__html:데이터}} 
                          속성을 사용한다! */}
                        <a href="#" onClick={(e)=>{//클릭하면 e값 실행
                          e.preventDefault();//a링크 막기
                          myCon.setPgName(catName);
                        }}>
                            {selData.tit[0][0]} {/* 0번째의 0번쨰 */}
                            <br />
                            {selData.tit[0][1]}
                        </a>
                    </h2>
                    {
                        // 스타일인 경우 글자박스 하나더 출력됨
                        catName == "style" && ( //catName이 style이면 &&(출력)해라.
                            <h2 className="tw">
                                <a href="#">
                                    {selData.tit[1][0]}
                                    <br />
                                    {selData.tit[1][1]}
                                </a>
                            </h2>
                        )
                    }
                </li>
                {/* 3. 세번째 이미지박스 : 스타일만! */}
                {
                    // 스타일인 경우 li 이미지박스 생성
                    catName == "style" && ( //catName이 style이면 &&(출력)해라.
                        <li className="imgc">
                            <img src={selData.isrc[1]} alt={selData.ialt[1]} />
                        </li>
                    )
                }
            </ul>
        </div>
    );
}

export default FashionIntro;
