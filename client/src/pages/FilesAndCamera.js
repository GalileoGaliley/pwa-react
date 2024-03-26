import React, {useState, useEffect, useRef, useCallback} from 'react'
import {Button} from 'react-bootstrap';
import Webcam from "react-webcam";
import {BsCamera} from "react-icons/bs";
import {useDomain} from "../store/hooks/useDomain";

export default function FilesAndCamera() {
  const storageName = 'imageList';
  const domainName = useDomain();
  const [image, setImage] = useState();
  const [imgSrc, setImgSrc] = useState();
  const [images, setImages] = useState([]);
  const [cameraActive, setCameraActive] = useState(false);

  useEffect(() => {
    const imageList = JSON.parse(localStorage.getItem(storageName));
    if (imageList && imageList[0]) {
      setImages(imageList);
    } else {
      localStorage.setItem(storageName, JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      try {
        localStorage.setItem(storageName, JSON.stringify(images));
      } catch (e) {
        return alert('Локальное хранилище заполнено! Прекратите его заполнять')
      }
    }
  }, [images.length]);

  const clear = () => {
    setImages([]);
    localStorage.setItem(storageName, JSON.stringify([]));
  }

  const deleteOne = (index) => {
    const arr = images;
    arr.splice(index, 1)
    setImages(arr);
  }

  const saveImage = () => {
    if (image && image[0]) {
      const reader = new FileReader();
      console.log(image);
      reader.onload = function (event) {
        const base64Image = event.target.result;
        setImages([...images, {data: base64Image, name: new Date().getTime()}])
      }
      reader.readAsDataURL(image[0]);
    }
  }

  const openCamera = () => {
    setCameraActive(true);
  }

  return (
    <div>
      <h1>Загрузка изображений и доступ к камере</h1>
      <div className={`${domainName}-info-block info-block`}>
        <h3>
          Загрузка изображений
        </h3>
        <p>
          <b>
            Нужно для
          </b>
          <ul>
            <li>
              Сохранения изображений пользователя
            </li>
            <li>
              И в принципе все
            </li>
          </ul>
        </p>
      </div>
      <div className={`${domainName}-action-container action-container`}>
        <div className={'form-control-plaintext'}>
          <p>
            выбрать файл
          </p>
          <input className={'text-input'} type={'file'} onChange={(e) => setImage(e.target.files)}/>
        </div>
        <Button onClick={saveImage}>Подтвердить</Button>
        {images.length ? <Button className={'mt-3'} onClick={clear}>Очистить</Button> : null}
        <Button className={'mt-3'} onClick={openCamera}>Камера</Button>
      </div>
      {images.length ? (
        <div className={'d-flex justify-content-around flex-wrap images-container'}>
          {images.map((item, index) => {
            return <div key={item.name} onClick={() => deleteOne(index)} className={'image-item m-3'}>
              <img className={'mw-100'} src={item.data}/>
            </div>
          })}
        </div>
      ) : null}
      {cameraActive ? (
        <div className={'camera-window'}>
          <div className={'camera-body'}>
            <Webcam
              audio={false}
              screenshotFormat="image/jpeg"
              className={'camera-data'}
              onUserMediaError={() => setCameraActive(false)}
            >
              {({getScreenshot}) => (
                <div className={'position-absolute screen-button'} onClick={() => {
                  const imageSrc = getScreenshot();
                  setImages([...images, {data: imageSrc, name: new Date().getTime()}]);
                  setCameraActive(false);
                }}>
                  <BsCamera className={'camera-icon'} />
                </div>
              )}
            </Webcam>
          </div>
        </div>
      ) : null}

    </div>
  )
}
