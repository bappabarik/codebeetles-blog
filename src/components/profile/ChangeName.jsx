import React, { useState } from 'react';
import Input from '../Input';
import authService from '../../appwrite/auth';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';

const ChangeName = ({name}) => {
    const [editName, setEditName] = useState(true)
    const [newName, setNewName] = useState(name)
    const dispatch = useDispatch()

    const handleChange = () => {
        setEditName(!editName)
        if (!editName && name !== newName.trim()) {
            console.log('running...');
            
           authService.updateName(newName).then(userData => {
                if (userData) {
                    dispatch(login(userData))
                    alert('User name changed successfully')
                }
           })
           .catch(error => {
                console.log(error);
                alert(error)
           }) 
        }
    }

    return (
        <>
            <div className="flex gap-3 mt-5 p-5">
                <div className="flex items-end justify-center gap-4">
                    <Input label='name:' type='text' value={newName} disabled={editName} className={editName ? 'bg-opacity-0 border-[1px] border-green-500 dark:text-white' : 'text-black'} onChange={(e) => setNewName(e.target.value)} />
                    
                    <button onClick={handleChange}>
                        {
                            editName ? <i className="fa-solid fa-pen-to-square"></i> : <i className="fa-solid fa-check"></i>
                        }
                    </button>

                    {
                        !editName && <button onClick={() => {
                            setEditName(true)
                            setNewName(name)
                        }}><i className="fa-solid fa-xmark"></i></button> 
                    }
                </div>
            </div>
        </>
    );
}

export default ChangeName;
