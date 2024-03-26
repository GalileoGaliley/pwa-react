import React, {useState, useEffect, useRef, useCallback} from 'react'
import {useGetToken, useGetUser} from "../store/user/user.selectors";
import {useDispatch} from "react-redux";
import {fetchSignInAction, fetchSignUpAction} from "../store/user/user.actions";
import {useHistory} from "react-router-dom";
import {useDomain} from "../store/hooks/useDomain";

export default function Auth () {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useGetUser();
  const domainName = useDomain();
  const [authReg, setAuthReg] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [duplicatePassword, setDuplicatePassword] = useState('');

  const clickAuth = async() => {
    await dispatch(fetchSignInAction({email: email, password: password}));
  }

  const clickReg = async() => {
    await dispatch(fetchSignUpAction({email: email, password: password, duplicatePassword: duplicatePassword, name: name}));
  }

  useEffect(() => {
    console.log(user);
    if (user.name) {
      history.push('/');
    }
  }, [user]);

  return (
    <div className={`${domainName}-auth-block`}>
      {authReg ? (
        <>
          <h1>Вход</h1>
          <div className={`${domainName}-auth-block`}>
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
            <button className={`${domainName}-button`} onClick={clickAuth}>Отправить</button>
          </div>
        </>
      ) : (
        <>
          <h1>Регистрация</h1>
          <div className={`${domainName}-auth-block`}>
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
            <button className={`${domainName}-button`} onClick={clickReg}>Отправить</button>
          </div>
        </>
      )}

      <div onClick={() => setAuthReg(state => !state)} className={'link'}>
        {authReg ? 'Регистрация' : 'Войти (если есть аккаунт)'}
      </div>
    </div>
  )
}
