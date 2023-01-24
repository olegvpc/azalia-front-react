import { useEffect, useState } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom'

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './App.css';
import Preloader from '../Preloader/Preloader';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Messages from '../Messages/Messages';

import PageNotFound from'../PageNotFound/PageNotFound';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {
  getUserInfo,
  saveNewMessage,
  register,
  login,
  verifyToken
} from '../../utils/MainApi';
import { getUsersMessages } from '../../utils/MainApi'


function App() {
  const history = useHistory();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

   // состояния фильмов пользователя
  const [messages, setMessages] = useState([]);
  const [isError, setIsError] = useState(false);

  // проверка наличия токена юзера в localStorage - если есть, то провести аутентификация юзера
  useEffect(() => {
      console.count("RENDER - TOKEN") // пустой массив зависимостей - Render только при монтировании
      checkToken();
      setIsLoading(false)
  }, [])

  // если пользователь уже авторизован, загрузить его данные и корточки с сервера
  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true)
      Promise.all([getUserInfo(), getUsersMessages()])
        .then(([userData, messagesData]) => {
          setCurrentUser(userData);
          setMessages(messagesData);
          localStorage.setItem('savedMessages', JSON.stringify(messagesData)); // для тестирования
          setIsError(false);
        })
        .then(()=> {
                    if (messages.length === 0) {
              handleSaveMessage("Вдохновение - это умение приводить себя в рабочее состояние", "А.С. Пушкин")
            }
        })
        .catch((err) => {
          setIsError(true);
          console.log(`ошибка получения данных по API при первичном обращении за карточками и юзером ${err}`);
        })
      .finally(() => setIsLoading(false))
    }
  }, [loggedIn])

  // обработчик добавления сообщения в базу )
  function handleSaveMessage(message, author){
    saveNewMessage(message, author)
      .then(newMessage => {
        setMessages(prev => [newMessage, ...prev]);
      })
      .catch(err => console.log(`Запись сообщения не выполнена ${err}`))
  }

  // обработчик регистрации пользователя
  function handleRegister(name, password){
    register(name, password)
      .then(data => {
        if(data){
          // console.log(data); // {email: 'ol7-server@ya.ru', name: 'Ol-second', _id: '63802aea5e9d371a9785df5a'}
          handleLogin(data.name, password);
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // обработчик авторизации пользователя
  function handleLogin(name, password) {
    login(name, password)
      .then(res => {
        setLoggedIn(true)
        localStorage.setItem('jwt', res.jwt);
        history.push('/');
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function checkToken() {
    const token = localStorage.getItem('jwt');
    if(token) {
      verifyToken(token)
      .then((res) => {
        setLoggedIn(true);
        history.push(location.pathname);
      })
      .catch((err) => {
        handleSignOut()
        console.log(err);
      });
    }
  }

  function handleSignOut() {
    localStorage.clear();
    setLoggedIn(false);
    setIsLoading(false)
    setCurrentUser({});
    history.push('/');
  }

  return (

    <CurrentUserContext.Provider value={currentUser}>

      <div className='app'>
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <Route exact path={["/", "/messages", "/counts", "/profile"]}>
              <Header loggedIn={loggedIn} />
            </Route>

            <Switch>
              <ProtectedRoute
                exact path='/messages'
                loggedIn={loggedIn}
                component={Messages}
                onSubmit={handleSaveMessage}
                allCurrentMessages={messages}
              />
              <ProtectedRoute
                exact path='/profile'
                loggedIn={loggedIn}
                component={Profile}
                onSignOut={handleSignOut}
              />

              <Route exact path='/' >
                <Main />
              </Route>

              <Route path='/signup'>
                {loggedIn ?
                  <Redirect to='/' /> :
                  <Register
                    onRegister={handleRegister}
                  />}
              </Route>

              <Route path='/signin'>
                {loggedIn ? <Redirect to='/' /> :
                  <Login onLogin={handleLogin}
                  />}
              </Route>

              <Route path="*">
                <PageNotFound />
              </Route>

            </Switch>
            <Route exact path={['/', '/messages', '/counts']}>
              <Footer />
            </Route>
          </>
        )}
      </div>

    </CurrentUserContext.Provider>
  );
}
export default App;
