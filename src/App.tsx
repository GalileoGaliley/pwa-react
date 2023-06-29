import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link, Route, HashRouter} from "react-router-dom";
import Home from "./Home";
import UploadFile from "./UploadFile";
import PushNotification from "./PushNotification";

function App() {
  return (
    <div className="App">
      <HashRouter basename={'/'}>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand>PWA</Navbar.Brand>
            <Nav className="me-auto">
              <Link className={'m-1 color-dark text-decoration-none'} to="/home">Главная</Link>
              <Link className={'m-1 color-dark text-decoration-none'} to="/upload">Всякое</Link>
              <Link className={'m-1 color-dark text-decoration-none'} to="/push">Тест пуш</Link>
            </Nav>
          </Container>
        </Navbar>
        <Route path={'/home'} component={() => <Home />}></Route>
        <Route path={'/upload'} component={() => <UploadFile />}></Route>
        <Route path={'/push'} component={() => <PushNotification />}></Route>
      </HashRouter>
    </div>
  );
}

export default App;
