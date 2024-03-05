import { Navbar, Nav } from 'react-bootstrap';
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './Home';
import Pushes from './Pushes';
import FilesAndCamera from './FilesAndCamera';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <div className="App">
      <Router basename={'/main'}>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">P.W.A.</Navbar.Brand>
          <Navbar.Toggle className={'mr-3'} aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className={'justify-content-start'} id="responsive-navbar-nav">
            <Nav>
              <Nav.Link href={'#'}><Link className={'text-light text-decoration-none'} to="/main">На главную</Link></Nav.Link>
              <Nav.Link href={'#'}><Link className={'text-light text-decoration-none'} to="/pushes" >Push-уведомления</Link></Nav.Link>
              <Nav.Link href={'#'}><Link className={'text-light text-decoration-none'} to="/files-and-camera">Загрузка файлов и камера</Link></Nav.Link>
            </Nav>
          </Navbar.Collapse>

        </Navbar>
        <Switch>
          <Route path="/pushes" component={Pushes}></Route>
          <Route path="/files-and-camera" component={FilesAndCamera}></Route>
          <Route path="/" component={Home} ></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
