import { createContext, useState, useContext } from 'react';

const FileContext = createContext();

export function useFileContext() {
  return useContext(FileContext);
}

export function FileProvider({ children }) {
  const [fileInfo, setFile] = useState({object: '', base64data: ''});

  const value = {
    fileInfo,
    setFile,
  };

  return (
    <FileContext.Provider value={value}>{children}</FileContext.Provider>
  );
}