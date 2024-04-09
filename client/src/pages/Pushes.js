import React, {useState} from 'react'
import {BsArrowDown} from 'react-icons/bs';

import {Button} from "react-bootstrap";
import {useDomain} from "../store/hooks/useDomain";

export default function Pushes() {
  const domainName = useDomain();
  const [title, setTitle] = useState('Новое уведомление');
  const [body, setBody] = useState('У вас есть новое сообщение');
  const [showModal, setShowModal] = useState(false);

  const ErrorPush = () => {
    return (
      <div onClick={() => setShowModal(false)} className={'error-modal-back'}>
        <div className={'error-modal-body'}>
          <div>
            Показ уведомлений запрещен пользователем
          </div>
          <div onClick={() => setShowModal(false)} className={'error-modal-button'}>
            ОК
          </div>
        </div>
      </div>
    );
  }

  const pushConfig = {
    icon: '/iconPush.png',
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    tag: 'vibration-sample',
    title: title,
    body: body,
    actions: [
      { action: 'reply', title: 'Ответить', open_url: 'https://zapodarkom-new-dev.msforyou.ru/#/'},
      { action: 'dismiss', title: 'Отклонить', open_url: 'https://solar-wind.site/' }
    ],
    backgroundColor: '#ff4d00',
    badge: '/iconPush.png',
    image: '/imagePush.jpg'
  };
  const message = async () => {
    Notification.requestPermission().then(function() {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification(title, pushConfig);
      });
    });
    if ("Notification" in window) {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          new Notification(title, {
            body: body,
            icon: "/iconPush.png"
          });
        } else {
          setShowModal(true);
        }
      });
    } else {
      alert('К сожалению отправка пуш-уведомлений не поддерживается')
    }
  }
    return(
        <div>
            <h1>Push-уведомления</h1>
            <div className={`${domainName}-info-block info-block`}>
              <h3>
                О Push-уведомлениях
              </h3>
              <p>
                <b>
                  Такие уведомления нужны для:
                </b>
                <ul>
                  <li>
                    Уведомления об изменении статуса обращения в техподдержку.
                  </li>
                  <li>
                    Уведомления об изменении статуса заказа.
                  </li>
                  <li>
                    Уведомления об изменениях на сайте/в приложении.
                  </li>
                  <li>
                    Уведомления об изменениях на сайте/в приложении.
                  </li>
                </ul>
              </p>
              <p>
                <b>
                  Но не обходится без минусов
                </b>
                <ul>
                  <li>
                    Далеко не все браузеры и браузеры поддерживают данную функцию, и как следствие -
                    нет гарантии того что пользователь получит уведомление.
                  </li>
                  <li>
                    Даже при условии поддержки пользователь может отключить уведомления и попросту не увидет их
                  </li>
                </ul>
              </p>
              <p>
                <b>
                  Ниже
                  <BsArrowDown className={'ml-2 mr-2'} />
                </b>
                представлена простая реализация пуш-уведомлений
              </p>
              <p>
                <b>
                  Введите&nbsp;
                </b>
                заголовок, тело уведомления, и нажмите кнопку что-бы увидеть результат
              </p>
            </div>
            <div className={`${domainName}-action-container action-container`}>
              <div className={'form-control-plaintext'}>
                <p>
                  Заголовок
                </p>
                <input className={'text-input'} onChange={(e) => setTitle(e.target.value)}/>
              </div>
              <div className={'form-control-plaintext'}>
                <p>
                  Текст сообщения
                </p>
                <input className={'text-input'} onChange={(e) => setBody(e.target.value)} />
              </div>
              <Button onClick={message}>Подтвердить</Button>
              {showModal ? (<ErrorPush />) : null}
            </div>
        </div>
    )
}
