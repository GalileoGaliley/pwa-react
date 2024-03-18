import React, {useState, useEffect, useRef, useCallback} from 'react'
import {useGetUser} from "../store/user/user.selectors";
import {useDispatch} from "react-redux";
import {fetchSignInAction, fetchSignUpAction} from "../store/user/user.actions";
import {useHistory} from "react-router-dom";

export default function Auth () {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useGetUser();
  const [authReg, setAuthReg] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [duplicatePassword, setDuplicatePassword] = useState('');

  const clickAuth = () => {
    dispatch(fetchSignInAction({email: email, password: password}));
    history.push('/');
  }

  const clickReg = () => {
    dispatch(fetchSignUpAction({email: email, password: password, duplicatePassword: duplicatePassword, name: name}));
    history.push('/');
  }

  return (
    <div className={'auth-block'}>
      {authReg ? (
        <>
          <h1>Вход</h1>
          <div className={'auth-block'}>
            <input
              className={'input'}
              placeholder={'Почта'}
              value={email}
              type={'text'}
              onChange={(event) => {setEmail(event.target.value)}}
            />
            <input
              className={'input'}
              placeholder={'Пароль'}
              value={password}
              type={'password'}
              onChange={(event) => {setPassword(event.target.value)}}
            />
            <button className={'button'} onClick={clickAuth}>Отправить</button>
          </div>
        </>
      ) : (
        <>
          <h1>Регистрация</h1>
          <div className={'auth-block'}>
            <input
              className={'input'}
              placeholder={'Почта'}
              value={email}
              type={'text'}
              onChange={(event) => {setEmail(event.target.value)}}
            />
            <input
              className={'input'}
              placeholder={'Имя'}
              value={name}
              type={'text'}
              onChange={(event) => {setName(event.target.value)}}
            />
            <input
              className={'input'}
              placeholder={'Пароль'}
              value={password}
              type={'password'}
              onChange={(event) => {setPassword(event.target.value)}}
            />
            <input
              className={'input'}
              placeholder={'Повтор пароля'}
              value={duplicatePassword}
              type={'password'}
              onChange={(event) => {setDuplicatePassword(event.target.value)}}
            />
            <button className={'button'} onClick={clickReg}>Отправить</button>
          </div>
        </>
      )}

      {user.user.email}
      {user.user.name}
      {user.token}
      <div onClick={() => setAuthReg(state => !state)} className={'link'}>
        {authReg ? 'Регистрация' : 'Войти (если есть аккаунт)'}
      </div>
    </div>
  )
}
