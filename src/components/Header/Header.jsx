import React from 'react'
import "./Header.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config.js"
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { setUser, selectUsers } from '../../store/usersSlice.js';

export default function Header() {
  
  const dispatch = useDispatch();
  const user = useSelector(selectUsers);

  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      signOut(auth).then(() => {
        dispatch(setUser(null));
      }).catch((error) => {
        console.log(error)
      });
    }
  }

  return (
    <div className='header-container'>
      <div>Header Will go here.</div>
      {user.currentUser && <button onClick={handleSignOut}>Log Out</button>}
    </div>
  )
}
