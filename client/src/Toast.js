import React, {useState, useEffect, useRef, useCallback} from 'react'

import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";

import {useGetToastText} from './store/toast/toast.selectors'
import {clearToast} from './store/toast/toast.slice'

export function Toast () {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showToast, setShowToast] = useState(false);

  const text = useGetToastText();

  useEffect(() => {
    if (text) {
        setShowToast(true);
        setTimeout(() => {
            setShowToast(true);
            dispatch(clearToast());
        }, 5000);
    } else {
        setShowToast(false);
    }
  }, [text]);
  
  return (
    <div className={`toast-custom ${showToast ? 'toast-active': ''}`}>
      {text}
    </div>
  )
}
