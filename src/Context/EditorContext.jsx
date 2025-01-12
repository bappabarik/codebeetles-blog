import React, { createContext, useContext, useState } from "react";

const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
  const [editorInstance, setEditorInstance] = useState(null);
  const [isActive, setIsActive] = useState(false)

  return (
    <EditorContext.Provider value={{ editorInstance, setEditorInstance, isActive, setIsActive }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => useContext(EditorContext);
