import React, {useState, useEffect, useRef, useCallback} from 'react'

import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";


export default function Auth () {
  const dispatch = useDispatch();
  const history = useHistory();

  const text = useGetText();

  useEffect(() => {
    
  }, []);
  return (
    <div className={'toast'}>
      
    </div>
  )
}
