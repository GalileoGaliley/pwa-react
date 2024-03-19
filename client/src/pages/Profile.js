import React from 'react';
import {useGetUser} from "../store/user/user.selectors";
import {useDispatch} from "react-redux";
import {logOut} from "../store/user/user.slice";

const Profile = () => {
  const user = useGetUser();
  const dispatch = useDispatch();

  const click = () => {
    dispatch(logOut());
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
