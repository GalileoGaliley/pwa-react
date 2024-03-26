import React from 'react'
import {useDomain} from "../store/hooks/useDomain";

export default function Home() {
  const domainName = useDomain();

  return(
    <div>
      <h1>Домашняя страница</h1>
      <div className={`${domainName}-info-block info-block`}>
        <h3>
          Это приложение создано для демонстрации
        </h3>
        <p>
          В нем представлены реализации функций push-уведомлений, доступа к файловой системе и камере
        </p>
      </div>
    </div>
  )
}
