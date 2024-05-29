import logo from './logo.svg';
import './App.css';
import $ from "jquery";
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    $(".App-header span").hover(
      (e) => { // 오버시
        $(e.currentTarget)
        .stop().animate(
          {
            scale: 1.4,
          },
          500
        );
      },
      (e) => { // 아웃시
        $(e.currentTarget)
        .stop().animate(
          {
            scale: 1,
          },
          500
        );
      }
    );
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F5686%2F2024%2F05%2F24%2F0000127840_001_20240524151002641.jpg&type=sc960_832" className="App-logo" alt="logo" />
        <p>
         이제 리액트는 내껍니다~
        </p>
        <span>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
