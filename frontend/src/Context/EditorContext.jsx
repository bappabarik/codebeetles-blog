import React, { createContext, useContext, useState } from "react";

const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
  const [editorInstance, setEditorInstance] = useState(null);

  return (
    <EditorContext.Provider value={{ editorInstance, setEditorInstance }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => useContext(EditorContext);
