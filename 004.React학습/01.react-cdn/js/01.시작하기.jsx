// 01.시작하기 리액트 JS

/* 
    html 태그와 JS문법을 따옴표없이 사용하는 JSX문법을 사용한다!
    JSX(Javascript XML) 문법을 쓰는 파일은 .js대신 .jsx확장자사용!
    -> return 키워드 사용은 따옴표없이 바로 소괄호롤 묶어사용
    (소괄호 생략 가능!)

    [[ 주의사항 ]]
    1. 함수를 만들경우 반드시 대문자로 시작해야 호출됨!(정해진규칙)
    2. 홀로태그를 사용할때는 마지막에 스스로 닫기를 꼭 해줌!(/>)
    3. 함수 내부의 리턴값으로 만든 요소는 반드시 최상위요소가 하나여여함!
    ->div와 같은 태그로 최상위를 만들어서 내보내기를 한다
    ->그런데 이런 불필요한 태그 구조를 원치 않은 경우
    <React.Fragment></React.Fragment>를 사용하면
    내보낼때 하나로 묶는 역할만 하고 실제로 태그가 출력안됨!
    (참고: CLI환경에서는 빈 태그를 대신 사용할 수 있다.ex) <> </>)
    */
   
   //생성자 함수를 만들어서 사용한다!
   //대문자로 시작하는 이름을 사용한다!
   function MyFirstReact(){
       // 목적: 코드를 만들어서 리턴한다!
       return(
           <React.Fragment>
        <h1>나는 리액트가 좋아질 것 같다!!!</h1>
        <img src="https://dh.aks.ac.kr/Edu/wiki/images/3/3a/%ED%94%BC%EC%B9%B4.jpg"alt="pica" />
        <iframe src="https://www.youtube.com/embed/lNjv9xZrxJc" title="단 5초, 지금 당신에게 필요한 스트레칭" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <h2>[리액트란 무엇인가???]
        <br />
        <br />
        # 프론트엔드 JS 라이브러리다! # 사용자 UI의 구성요소를 빌드하기 위한도구{" "}
        <br />
        [ 작동원리 ] <br />
        <br />
        # 가상돔(Virtual DOM)을 사용하여 최소의 html리소스를 사용함으로 <br />
        빠르고 쉽게 UI화면의 구성한다! <br />
        # 가상돔은 실제DOM을 변경하기전에 메모리상에서 구성하는 가짜 DOM이다!{" "}
        <br />
        # 변경사항을 한번에 구성하여 반영하기 위한도구다! <br />
        # 리액트는 변경하고자 하는 부분만 업데이트 가능함! <br />
        <ul>
            <li>리액트 라이브러리</li>
            <li>리액트돔 라이브러리</li>
            <li>바벨 라이브러리</li>
            
        </ul>
        
        
        
        </h2>
        
        </React.Fragment>
    );
}//////MyFirstReact생성자 함수////////

// 리액트 html대상요소에 삽입하기
/* 
    가상돔을 셋팅하는 리액트 객체를 호출한다! -> ReactDOM
    render() -> 요소를 변경하는 메서드

    [호출형태]
    ReactDOM.render(
        요소를 리턴하는 함수명으로 된 홀로태그,대상요소)
    __________________________________________

    예컨데 함수명이 MyFirstReact이므로 
    요소를 리턴하는 함수명으로 된 홀로태그는? <MyFirstReact />

    그리고 대상요소는 JS문법으로 요소를 선택함!
    document.querySelector("#root")
*/


ReactDOM.render(<MyFirstReact/>, document.querySelector('#mydiv'));