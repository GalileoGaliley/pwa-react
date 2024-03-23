import React, {useEffect, useState} from 'react'
import {usePosition} from "../store/hooks/usePosition";
import {Map, YMaps, Placemark, ZoomControl} from "@pbe/react-yandex-maps";
import {useDispatch} from "react-redux";

export default function Home() {
  const pos = usePosition();

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
      {pos.data ? (
        <YMaps>
          <div>Это карта</div>
          <Map width={'100%'} height={'600px'} defaultState={{ center: [pos.data.lat, pos.data.lon], zoom: 15 }}>
            <Placemark geometry={[pos.data.lat, pos.data.lon]}/>
            <ZoomControl  />
          </Map>

        </YMaps>
      ) : (
        <div className={'map-error'}>
          {pos.error}
        </div>
      )}

    </div>
  )
}
