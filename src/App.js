import React, { useState, useCallback } from 'react';
import Editor from './editor'
import Preview from './preview';
import './App.css';

const App = () => {

  const [doc, setDoc] = useState('# hello word')

  const handleDocChange = useCallback(newDoc => {
    setDoc(newDoc)
  }, [])

  return (
    <div className='app'>
      <Editor initialDoc={doc} onChange={handleDocChange} />
      <Preview doc={doc} />
    </div>
  )
}

export default App;
