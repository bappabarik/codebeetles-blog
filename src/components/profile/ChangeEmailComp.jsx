import React, { useState } from 'react';
import Input from '../Input';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';

const ChangeEmailComp = ({email}) => {
    const [editEmail, setEditEmail] = useState(true)
    const [newEmail, setNewEmail] = useState(email)
    const [passCard, setPassCard] = useState(false)
    const [password, setPassword] = useState('')
    const [active, setActive] = useState(false)
    const dispatch = useDispatch()

    const handleChange = () => {
        setEditEmail(!editEmail)
        if (!editEmail && email !== newEmail.trim()) {
            console.log('running...');
            setPassCard(true)
        }
    }

    const updateEmail = () => {
        if (password) {
            setActive(true)
            authService.updateEmail({newEmail, password}).then(userData => {
                if (userData) {
                    setPassCard(false)
                    setActive(false)
                    alert('User email changed successfully')
                    dispatch(login(userData))
                }
            })
            .catch(error => {
                setActive(false)
                console.log("its an error", error);
                // alert(error)
            }) 
        }
    }

    return (
            <div className="flex gap-3 mt-5 p-5 relative">
                <div className="flex items-end justify-center gap-4">
                    <Input label='email:' type='email' value={newEmail} disabled={editEmail} className={editEmail ? 'bg-opacity-0 border-[1px] border-green-500 dark:text-white' : 'text-black'} onChange={(e) => setNewEmail(e.target.value)} />
                    
                    <button onClick={handleChange}>
                        {
                            editEmail ? <i className="fa-solid fa-pen-to-square"></i> : <i className="fa-solid fa-check text-green-500"></i>
                        } 
                    </button>
                    {
                        !editEmail && <button onClick={() => {
                            setEditEmail(true)
                            setNewEmail(email)
                        }}><i className="fa-solid fa-xmark"></i></button> 
                    }

                </div>
                <form className={`${passCard ? 'flex' : 'hidden'} rounded-md h-52 p-6 dark:bg-white bg-slate-800 absolute inset-0 m-auto items-center justify-center flex-col gap-4 shadow-md`}>
                {
                        passCard && <button className='absolute top-0 m-2 right-0' onClick={() => {
                            setPassCard(false)
                        }}><i className="fa-solid fa-xmark dark:text-black"></i></button> 
                    }
                    <h2 className='dark:text-black'>Enter Your Password</h2>
                    <input type="password" required={true}  className='border-2 border-gray-600 text-black px-2 py-2 rounded-md w-full' onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={updateEmail} disabled={active} className='bg-green-700 px-4 py-2 w-full rounded-md'>Update</button>
                </form>
            </div>
    );
}

export default ChangeEmailComp;
