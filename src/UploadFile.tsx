import React, {useEffect, useState} from 'react';

const UploadFile = () => {
  const [data, setData] = useState([]);
  const [mode, setMode] = useState('');

  useEffect(() => {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    fetch(url).then((response) => {
      response.json().then((result) => {
        setData(result)
        localStorage.setItem('users', JSON.stringify(result));
        console.log(result);
      })
    }).catch(e => {
      const collection = localStorage.getItem('users');
      setMode('offline');
      if (collection)
        setData(JSON.parse(collection));
    })
  }, []);
  return (
    <div>
      <h1>UploadFile Test</h1>
      {
        mode === 'offline' ? <h2>Вы не в сети</h2>
          : null
      }
      <div>

      </div>
      {data.length
        ? data.map((item: any) => {
          return (<div>{item.title}</div>)
        })
        : <></>}
    </div>
  );
};

export default UploadFile;
