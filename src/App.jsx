import { useState, useEffect } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import {Header, Footer, Loader} from './components/index'
import { Outlet } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import { addProgress } from './store/progressBarSlice'
import { setInitialTheme } from './store/themeSlice'

function App() {
  const [loading, setLoading] = useState(true)
  const progress = useSelector(state => state.progressBar.progress)
  const status = useSelector(state => state.auth.status)
  const dispatch = useDispatch()

  useEffect(() => {
      authService.getPreferences()
      .then(theme => {
      if (theme) {
        document.querySelector('body').classList.add("dark")
      } else {
        document.querySelector('body').classList.add("light")
      }
      dispatch(setInitialTheme(theme))
      })
  })

  useEffect(() => {
    dispatch(addProgress(0))
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login(userData))
      } else {
        dispatch(logout())
      }
    })
    .catch((error) => {
      console.log(error);
      setLoading(false)
    })
    .finally(() => {
      setLoading(false)
    })
  }, [])

  return !loading ? (
    <div className='space-x-4 min-h-screen min-w-[100%] flex flex-wrap content-between dark:bg-slate-900 bg-slate-50'>
      <div className=" w-full block">
        <Header />
        <LoadingBar color="#5AFF00" progress={progress}  />
        <main className="p-5 md:mt-20 mt-10">
          <Outlet />
        </main>
        <Footer />
      </div>

    </div>
  ) : (
    <div className=" h-screen w-full flex items-center justify-center">
      <Loader />
    </div>
    
  )
}

export default App
