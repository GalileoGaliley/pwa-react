import { Navbar, Nav } from 'react-bootstrap';
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './pages/Home';
import MapPage from './pages/Map';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Pushes from './pages/Pushes';
import FilesAndCamera from './pages/FilesAndCamera';
import ChatHelp from './pages/ChatHelp';
import Auth from './pages/Auth';
import {useGetToken} from "./store/user/user.selectors";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setUser} from "./store/user/user.slice";
import Profile from "./pages/Profile";
import {useDomain} from "./store/hooks/useDomain";

import logoYellow from './assets/images/logos/yellow-experience.png';
import logoRed from './assets/images/logos/red-experience.png';
import logoBlue from './assets/images/logos/blue-experience.png';
import logoDefault from './assets/images/logos/default-logo.png';

const Router = () => {
  const history = useHistory();
  const token = useGetToken();
  const dispatch = useDispatch();

  const domainName = useDomain();

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        dispatch(setUser(userData));
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const logoObj = {
    'red-experience': logoRed,
    'blue-experience': logoBlue,
    'yellow-experience': logoYellow,
    'default': logoDefault
  }
  return (
    <BrowserRouter basename={'/main'}>
      <Navbar collapseOnSelect className={`${domainName}-navbar`}>
        <Navbar.Brand onClick={() => {history.push('/main')}}>
          <img className={'logo'} src={logoObj[domainName]} alt={'logo'}/>
        </Navbar.Brand>
        <Navbar.Toggle className={'mr-3'} aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className={'justify-content-start'} id="responsive-navbar-nav">
          <Nav>
            <Nav.Link href={'#'}><Link className={'text-light text-decoration-none'} to="/main">На главную</Link></Nav.Link>
            {token ? (
              <>
                <Nav.Link href={'#'}>
                  <Link className={'text-light text-decoration-none'} to="/pushes" >
                    Push-уведомления
                  </Link>
                </Nav.Link>
                <Nav.Link href={'#'}>
                  <Link className={'text-light text-decoration-none'} to="/files-and-camera">
                    Загрузка файлов и камера
                  </Link>
                </Nav.Link>
                <Nav.Link href={'#'}>
                  <Link className={'text-light text-decoration-none'} to="/help-chat">
                    Чат с поддержкой
                  </Link>
                </Nav.Link>
                <Nav.Link href={'#'}>
                  <Link className={'text-light text-decoration-none'} to="/map-page">
                    Отслеживание геолокации
                  </Link>
                </Nav.Link>
                <Nav.Link href={'#'}>
                  <Link className={'text-light text-decoration-none'} to="/profile">
                    Профиль
                  </Link>
                </Nav.Link>
              </>
            ) : (
              <Nav.Link href={'#'}>
                <Link className={'text-light text-decoration-none'} to="/auth">
                  Вход / Регистрация
                </Link>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>

      </Navbar>
      <Switch>
        {
          token ? (
            <>
              <Route path="/main" component={Home} ></Route>
              <Route path="/map-page" component={MapPage} ></Route>
              <Route path="/pushes" component={Pushes}></Route>
              <Route path="/files-and-camera" component={FilesAndCamera}></Route>
              <Route path="/help-chat" component={ChatHelp}></Route>
              <Route path="/profile" component={Profile}></Route>
            </>
          ) : (
            <>
              <Route path="/auth" component={Auth}></Route>
              <Route path="/main" component={Home} ></Route>
            </>
          )
        }
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
