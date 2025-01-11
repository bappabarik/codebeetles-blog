import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Input from "../Input";
import { useSelector } from "react-redux";
import {
  connectWithUserId,
  socket,
} from "../../websocket/getAutocompleteSuggestion";
import Button from "../Button";
import ReactMarkdown from "react-markdown";
import { useEditor } from "../../Context/EditorContext";

const AiHelper = ({ setIsActive }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm();
  const [suggestion, setSuggestion] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [abortBtnDisable, setAbortButtonDisable] = useState(true);
  const [currentPrompt, setCurrentPrompt] = useState({});
  const [loading, setLoading] = useState(false)
  const userData = useSelector((state) => state.auth.userData);
  const suggestionContainer = useRef(null);
  const { editorInstance } = useEditor();

  const submit = (data) => {
    setLoading(true)
    // console.log("received data", data);
    setCurrentPrompt(data);
    socket.emit("prompt", data.prompt);
    setSuggestion("");
    setValue("prompt", "");
  };

  const handleAbort = () => {
    socket.emit("abort", true);
  };

  const handleTryAgain = () => {
    console.log("currentPrompt ", currentPrompt);
    submit(currentPrompt);
  };

  const handleInsert = () => {
    const data = document.querySelector(".suggestion").innerHTML;
    console.log(data);
    if (editorInstance) {
      editorInstance.insertContent(data);
    }
    setIsActive(false);
  };

  useEffect(() => {
    connectWithUserId(userData.$id);
  }, [userData]);

  useEffect(() => {
    socket.on("suggestion", (data) => {
      // console.log(suggestion);
      setLoading(false)
      setSuggestion((prev) => prev + data);
      setDisabled(true);
      setAbortButtonDisable(false);
    });
    socket.on("complete", (data) => {
      if (data) {
        setDisabled(false);
        setAbortButtonDisable(true);
      }
    });
    const container = suggestionContainer.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
    return () => {
      socket.off("suggestion");
      socket.off("complete");
    };
  }, [suggestion]);

  return (
    <div className="w-full bg-white rounded-lg px-4 py-2 absolute z-10 md:bottom-10 bottom-72 md:left-28 space-y-2 drop-shadow-[0_0_24px_rgba(8,23,53,0.16)]">
      {
        loading && <div className="absolute w-full h-full bg-gray-300 opacity-80 flex justify-center items-center rounded-lg left-0 top-0 overflow-hidden space-x-1">
        <span className="block w-2 h-2 bg-black rounded-full animate-bounce	 "></span>
        <span className="block w-2 h-2 bg-black rounded-full animate-bounce	 delay-200"></span>
        <span className="block w-2 h-2 bg-black rounded-full animate-bounce	 delay-500"></span>
      </div>
      }

      <div className="flex flex-col justify-between">
        <div className="flex justify-between rounded-md">
          <h1 className="text-xl">AI Assistant</h1>
          <Button
            className="w-8 rounded-md py-1 bg-transparent hover:bg-slate-200"
            onClick={(e) => {
              e.preventDefault();
              setIsActive(false);
            }}
          >
            ✖
          </Button>
        </div>
        {suggestion && (
          <>
            <div
              ref={suggestionContainer}
              className=" bg-white mt-2 p-4 max-h-60 overflow-y-scroll border border-gray-200 rounded-md "
            >
              <ReactMarkdown className="prose text-left suggestion">
                {suggestion}
              </ReactMarkdown>
            </div>
            <div className=" flex gap-2 mt-2">
              <Button
                className={`px-4 py-2 font-bold rounded-md text-sm ${
                  disabled
                    ? "bg-blue-700 text-opacity-40 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
                disabled={disabled}
                onClick={handleInsert}
              >
                Insert
              </Button>
              <Button
                className={`px-4 py-2 font-bold rounded-md hover:bg-gray-200 text-sm ${
                  disabled ? "cursor-not-allowed bg-gray-200" : "bg-gray-300"
                }`}
                textColor={disabled ? "text-gray-400" : "text-slate-800"}
                disabled={disabled}
                onClick={handleTryAgain}
              >
                Try again
              </Button>
              <Button
                className={`px-4 py-2 font-bold rounded-md hover:bg-gray-200 text-sm ${
                  abortBtnDisable
                    ? "cursor-not-allowed bg-gray-200"
                    : "bg-gray-300"
                }`}
                textColor={abortBtnDisable ? "text-gray-400" : "text-slate-800"}
                onClick={handleAbort}
                disabled={abortBtnDisable}
              >
                Stop
              </Button>
            </div>
          </>
        )}
      </div>
      <form className="w-full flex gap-2" onSubmit={handleSubmit(submit)}>
        <Input
          placeholder="Ask AI"
          {...register("prompt", {
            required: { value: true },
            minLength: { value: 4 },
          })}
          className={`focus:border-blue-500 ${
            disabled && "cursor-not-allowed"
          }`}
          disabled={disabled}
        />
        <Button
          className={`w-10 rounded-md text-2xl ${
            disabled && "cursor-not-allowed"
          }`}
          type="submit"
          disabled={isSubmitting || disabled}
        >
          ➤
        </Button>
      </form>
    </div>
  );
};

export default AiHelper;
