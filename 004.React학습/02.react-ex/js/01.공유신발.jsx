//01.공유신발 JSX

//공유신발 데이터 불러오기
import { func } from "prop-types";
import guData from "./data/gu_data.js";

console.log(guData);
// [ 메인 컴포넌트 ]
// 메인의 의미는? : 다른 구성요소 컴포넌트들을 모아
// 최종적으로 렌더링하는 구성 컴포넌트

// 그렇다면 컴포넌트란? (컴포넌트는 부르면 html코드를 뱉어낸다)
// 특정 모듈로 구성된 html 코드를 리턴하는 객체

// 함수형 컴포넌트는 첫글자 대문자인 함수키워드로 만든다
function MainComponent() {
    // [후크 상태관리 변수 셋팅!!!]///
    // 1. 리스트/상세보기 전환용 상태관리 변수
    const[viewList, setViewList]= React.useState(true); //=뒤에 값이 =앞쪽으로 딱딱 들어감(구조 분해 할당)


    /************************************** 
        [코드구성]
        1.타이틀: h1.tit
        2.내용박스: section
         ->제목: h2
         ->이미지박스: div.img-box > img
        3.기능버튼박스: div.btn-box
         ->기능버튼: button
        4.상품리스트박스: div.gwrap
         ->상품리스트: 
            ul>li>ol>li(img/text)
         ->상품상세보기:
            ol>li>(img/text/button)        
         
     **************************************/

    //코드리턴구역///////////////
    return (
        <React.Fragment>
            {/* 1. 타이틀 */}
            <h1 className="tit">공유가 신고 다닌다는!</h1>

            {/* 2.내용박스 */}
            <section>
                <h2>공유는 오늘도 멋찝니다!</h2>
                <div className="img-box">
                    <img src="./images/vans/gongyoo.jpg" alt="멋진공유" />
                </div>
            </section>

            {/* 3.기능버튼박스 */}
            <div className="btn-box">
                <button>효진초이스 바로가기</button>
            </div>

            {/* 4.상품리스트박스 */}
            <div className="gwrap">
                {
                //상태관리변수 viewList값이 true이면 리스트보기
                viewList?<GoodsList viewDetail={setViewList}/>:<GoodsDetail backList={setViewList}/>
                
                }
                
            </div>
        </React.Fragment>
    );
} //////////MainComponent 컴포넌트////////////




//[상품리스트 서브 컴포넌트 : GoodsList]
function GoodsList({viewDetail}){
    //viewDetail-부모컴포넌트가 전달해준 상태변수 
    //viewList를 업데이트하는 setViewList메서드임!
    //코드 리턴구역//////////
    return(
        <ul> 
            {
            //반복요소 li에 key속성을 쓸 것을 
            //리액트는 필수적이라고 함!
            //어디에 쓰나? 업데이트시 순번구분을 위함
            //node.js개발 환경에서는 안쓰면 에러남!
           guData.map((v,i) => (
                <li key={i}>
                    <a href="#" onClick={(e)=>{
                        //a요소 기본이동막기
                        e.preventDefault();
                        //상태변수 vieList업데이트
                        viewDetail(false);
                        }}
                    >  
                    {/* 바로실행 되버릴떈 익명함수'()=>' 를 추가해주기 */}
                        
                        <ol className="glist">
                            <li>
                                <img
                                    src={`./images/vans/vans_${v.idx}.jpg`}
                                    alt="신발"
                                />
                            </li>
                            <li>{v.gname}</li>
                            <li>가격 : {v.gprice}원</li>
                        </ol>
                    </a>
                </li>
            ))}
        </ul>
    );
}///GoodsList 컴포넌트/////




///[상품 상세보기 서브컴포넌트: GoodsDetail]///
function GoodsDetail({backList}) {
    // backList-부모컴포넌트가 전달해준 상태변수
    // viewList를 업데이트 하는 setViewList메서드임!
    //코드리턴구역////////
    return(
        <ol style={{display:"flex",listStyle:"none",justifyContent:"center"}}>
        <li>
            <img src="./images/vans/vans_1.jpg" alt="반스신발" />
        </li>
        <li style={{lineHeight:"2",padding:"10px",textAlign:"left"}}>
            상품명: {guData[0].gname}<br />
            가격: {guData[0].gprice}<br />
            소재: {guData[0].소재}<br />
            색상: {guData[0].색상}<br />
            치수: {guData[0].치수}<br />
            제조자/수입자: {guData[0]["제조자/수입자"]}<br />
            제조국: {guData[0].제조국}<br />
            제조연월: {guData[0].제조연월}<br />
            A/S 책임자와 전화번호: {guData[0]["A/S 책임자와 전화번호"]}<br />
            Model: {guData[0].Model}<br />
            <div className="btnbx" style={{textAlign:"right"}}><button onClick={()=>backList(true)} style={{fontSize:"25px"}}>리스트로 가기</button></div>
        </li>
    </ol>
    )
}///////////////////GoodsDetail컴포넌트//////////



// 메인 컴포넌트 출력하기/////////리액트에서는 코드 리턴구역에 코드 쓰고, ReactDOM.render로 출력해야함
//ReactDOM.render(어쩌구, 저쩌구); -> 어쩌구를 저쩌구에 출력해라
ReactDOM.render(<MainComponent />, document.querySelector("#root"));
