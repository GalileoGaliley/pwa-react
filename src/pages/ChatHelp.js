import React, {useState, useEffect, useRef, useCallback} from 'react'
import {useGetUser} from "../store/user/user.selectors";
import {useGetHistoryId, useGetMessages} from "../store/help/help.selectors";
import {useDispatch} from "react-redux";
import {fetchSendMessageAction} from "../store/help/help.actions";
import {pushMessage} from "../store/help/help.slice";

export default function ChatHelp () {
  const messages = useGetMessages();
  const historyId = useGetHistoryId();
  const dispatch = useDispatch();
  const [historyActive, setHistoryActive] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {

  }, []);

  const sendMessage = async () => {
    setMessage('');
    await dispatch(pushMessage({content: message, role: 'user'}));
    await dispatch(fetchSendMessageAction({message: message, historyId: historyId ? historyId : undefined}));
  }

  return (
    <div>
      <h1>Поддержка</h1>
      <div className={'info-block'}>
        <h3>
          Поддержка
        </h3>
        <p>
          <b>
            Нужна для:
          </b>
          <ul>
            <li>
              Поддержки пользователей
            </li>
          </ul>
        </p>
        <p>
          В данном случае реализована с помощью GPT
        </p>
      </div>
      <div className={'help-block'}>
        <div
          onClick={() => {setHistoryActive(!historyActive)}}
          className={`help-history ${historyActive ? 'help-active' : ''}`}>

        </div>
        <div className={`help-messages ${historyActive ? '' : 'help-active'}`}>
          <div className={'help-message-list'}>
            {messages ? (
              messages.map((item) => {
                return (
                  <div className={'message-container'}>
                    <div className={`message ${item.role}`}>
                      {item.content}
                    </div>
                  </div>
                )
              })
            ) : ('пока нет обращений')}
          </div>
          <div className={'help-input-block'}>
            <textarea className={'help-input'} value={message} onChange={(e) => {setMessage(e.target.value)}} />
            <button onClick={sendMessage} className={'help-send-button'}>
              Отправить
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
