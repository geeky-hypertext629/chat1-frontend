// import logo from './logo.svg';
import socketIO from "socket.io-client"
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from "./components/Join";
import Chat from "./components/Chat/Chat";


// const ENDPOINT = 'http://localhost:4500/'
// const socket = socketIO(ENDPOINT, { transports: ['websocket', 'polling'] });


function App() {
  // socket.on("connect" ,()=>{

  // })
  return (
    <>
       <Router>
        <Routes>
          <Route exact path="/" element={<Join/>} />
          <Route path="/chat" element={<Chat/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
