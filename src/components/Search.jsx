import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'

const Search = ({posts}) => {
    const [searchResult, setSearchResult] = useState([])
    // console.log("Post title:", posts.posts[0].title);
    
    const handleSearch = (e) => {
        if (e.target.value.trim() !== '') {
            console.log(e.target.value);
            const found = posts.filter((element) => element.title.toLowerCase().includes(e.target.value.toLowerCase()) || element.content.toLowerCase().includes(e.target.value.toLowerCase()));
            console.log(found);
            setSearchResult(found)
        } else {
            setSearchResult([])
        }
    }

    useEffect(() => {
            searchResult.map(item => console.log(item.title)
            )
    }, [handleSearch])

    

    return (
        <>
            <div className="max-w-md mx-auto mb-4 rounded-full dark:shadow-2xl dark:shadow-green-300/20 shadow">   
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input
                    onChange={handleSearch}
                    type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border outline-none border-gray-300 rounded-full bg-gray-50 dark:bg-transparent  focus:border-green-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-green-500" placeholder="Search Mockups, Logos..." required />
                </div>
            </div>
            {
                    searchResult.length !== 0  &&  (
                        <ul className='dark:text-slate-100 text-slate-700 backdrop-blur-2xl  bg-gray-200 dark:bg-transparent border-[1px] dark:border-slate-400 border-slate-400 w-full rounded-lg shadow-md absolute z-20 max-w-96 right-0 left-0 m-auto'>
                            {
                                searchResult.map(item => (
                                    <Link to={`/post/${item.$id}`}>
                                    <li className='border-b-[1px] p-4 cursor-pointer rounded-lg dark:border-slate-200 border-slate-400 hover:bg-gray-500 hover:text-white' key ={item.$id}>
                                        {
                                            item.title
                                        }
                                    </li>
                                    </Link>
                                ))
                            }
                        </ul>
                    ) 
                }
        </>
    );
}

export default Search;
