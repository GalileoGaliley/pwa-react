import React from 'react';
import {useGetUser} from "../store/user/user.selectors";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logOut} from "../store/user/user.slice";


const Profile = () => {
  const user = useGetUser();
  const history = useHistory();
  const dispatch = useDispatch();

  const click = () => {
    dispatch(logOut());
    history.push('/main');
  }

  return (
    <div>
      <div>
        {user.user.name}
      </div>
      <div>
        {user.user.email}
      </div>
      <div onClick={click} className={'link'}>
        Выйти
      </div>
    </div>
  );
};

export default Profile;
