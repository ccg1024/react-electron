import React, { useState, useCallback, useEffect } from 'react';
import Editor from './editor'
import Preview from './preview';
import './App.css';

// const fs = window.require('fs')
const fs = window.electronAPI.require('fs')

// const saveClick = (doc) => {
//   window.electronAPI.saveText(doc)
//   console.log('click save button')
// }

// async function openFile(setFilePath) {
//   const filePath = await window.electronAPI.openFile()
//   console.log(filePath)
//   setFilePath(filePath)
// }

const App = () => {

  const [doc, setDoc] = useState('# hello word')
  const [filePath, setFilePath] = useState('')

  const handleDocChange = useCallback(newDoc => {
    setDoc(newDoc)
  }, [])

  useEffect(() => {
    window.electronAPI.openFile(async (_event, value) => {
      console.log("App.js got new file path: " + value)
      // setDoc(value)
      // setDoc('change file')
      fs.readFile(value, 'utf-8', (err, data) => {
        if (err) throw err
        else {
          // console.log(data)
          setDoc(data)
          setFilePath(value)
        }
      })
    })
  }, [])


  return (
    <>
      <div className='app'>
        <Editor initialDoc={doc} onChange={handleDocChange} filePath={filePath} />
        <Preview doc={doc} />
      </div>
    </>
  )
}

export default App;
