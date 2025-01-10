import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { addProgress } from '../../store/progressBarSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(addProgress(20))
        authService.logout()
        .then(() => {
          dispatch(logout())
          dispatch(addProgress(700))
        })
        .catch((error) => {
          console.log(error);
          dispatch(addProgress(100))
        })
        .finally(() => {
          dispatch(addProgress(100))
        })
        navigate('/')
    }
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-opacity-30 border border-orange-500 bg-orange-500 bg-opacity-20 text-orange-400 font-mono text-lg'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn
