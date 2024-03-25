import React, {useEffect, useState} from 'react'
import {usePosition} from "../store/hooks/usePosition";
import {Map, YMaps, Placemark, ZoomControl} from "@pbe/react-yandex-maps";

const MapPage = () => {
  const pos = usePosition();

  return (
    <div>
      <h1>Это карта</h1>
      {pos.data ? (
        <YMaps>
          <Map width={'100%'} height={'600px'} defaultState={{ center: [pos.data.lat, pos.data.lon], zoom: 18 }}>
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
  );
};

export default MapPage;
