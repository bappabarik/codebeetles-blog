import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTheme } from "../store/themeSlice";
import authService from "../appwrite/auth";

const Theme = () => {
//   const [theme, setTheme] = useState(true);
const theme = useSelector(state => state.theme.theme)
  const dispatch = useDispatch()

  const handleTheme = () => {
    // authService.getPreferences().then(res => console.log("theme preference", res))
    console.log(authService.getPreferences());
    // setTheme(!theme);
    dispatch(addTheme(!theme))
    document.querySelector("body").classList.toggle("dark");
  };

  return (
    <div className="m-2">
      <button
        className="h-8 w-8 m-auto border-[1px] border-slate-300 dark:border-slate text-slate-100 rounded-md transition-all duration-300 flex items-center justify-center"
        onClick={handleTheme}
      >
        {theme ? (
          <i className="fa-solid fa-sun transition-opacity duration-300 opacity-100 ease-in"></i>
        ) : (
          <i className="fa-solid fa-moon transition-opacity duration-300 opacity-100 text-slate-800 dark:text-slate-100 ease-in"></i>
        )}
      </button>
    </div>
  );
};

export default Theme;
