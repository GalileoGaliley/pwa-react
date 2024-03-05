import React from 'react'
export default function Home()
{
  return(
    <div>
      <h1>Домашняя страница</h1>
      <div className={'info-block'}>
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
