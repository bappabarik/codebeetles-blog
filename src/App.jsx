import { useState, useEffect } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import {Header, Footer, Loader} from './components/index'
import { Outlet, useNavigate } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import { addProgress } from './store/progressBarSlice'
import { setInitialTheme } from './store/themeSlice'
import { fetchPosts } from './store/postSlice'

function App() {
  const [loading, setLoading] = useState(true)
  const progress = useSelector(state => state.progressBar.progress)
  const status = useSelector(state => state.auth.status)
  const postStatus = useSelector(state => state.post.postStatus)
  const dispatch = useDispatch()
  const [emailVerified, setEmailVerified] = useState(false)
  const navigate = useNavigate()
  const userData = useSelector(state => state.auth.userData)
      
  useEffect(() => {  
    if (postStatus === 'idle' || postStatus === 'succeeded') {
      dispatch(fetchPosts()); // Fetch posts when status is idle or succeeded
    }
}, [dispatch, status, ]);

  useEffect(() => {
      authService.getPreferences()
      .then(theme => {
      if (theme) {
        document.querySelector('body').classList.add("dark")
      } else {
        document.querySelector('body').classList.add("light")
      }
      console.log("status", theme);
      
      dispatch(setInitialTheme(theme))
    })
    
  }, [])

  useEffect(() => {
    dispatch(addProgress(0))
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        setEmailVerified(userData.emailVerification)
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

  const verifyEmail = () => {
    if (!userData.emailVerification) {
      console.log("running...");
      const res = authService.verifyEmail()
      res.then(data => {
        if (data) {
          setEmailVerified(true)
          navigate('/verify-email')
        }
      console.log(data)
    }
    )
    }
  }

  return !loading ? (
    <div className='space-x-4 min-h-screen min-w-[100%] flex flex-wrap content-between dark:bg-slate-900 bg-slate-50'>
      <div className=" w-full block">
        <Header />
        <LoadingBar color="#5AFF00" progress={progress}  />
        <main className="p-5 md:mt-20 mt-10">
          {
            !emailVerified && !userData?.emailVerification && status && <div className='p-3 mb-2 bg-gradient-to-r from-orange-400 to-orange-600 w-full text-white flex justify-between items-center'><span>Your email address is not verified please <button onClick={verifyEmail} className=' underline'>verify</button></span>
            <button onClick={() => setEmailVerified(true)}>X</button>
            </div>
          }
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
