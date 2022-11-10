import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react'
import Editor from './editor'
import Preview from './preview';
import { SimpleGrid } from '@chakra-ui/react'
import './css/App.css';
import './css/css2.css'

// const fs = window.require('fs')
const fs = window.electronAPI.require('fs')

const App = () => {

  const [doc, setDoc] = useState('# In development...')
  const [filePath, setFilePath] = useState('')

  const handleDocChange = useCallback(newDoc => {
    setDoc(newDoc)
  }, [])

  useEffect(() => {
    window.electronAPI.openFile(async (_event, value) => {
      console.log("App.js got new file path: " + value)
      fs.readFile(value, 'utf-8', (err, data) => {
        if (err) throw err
        else {
          setDoc(data)
          setFilePath(value)
        }
      })
    })
  }, [])

  // const firstDivRef = useRef();
  const secondDivRef = useRef();

  const handleScrollFirst = (scroll) => {

    let currentPercent = (scroll.target.scrollTop + scroll.target.clientHeight) / scroll.target.scrollHeight
    if (currentPercent >= 0.95) {
      secondDivRef.current.scrollTop = secondDivRef.current.scrollHeight
    } else {
      secondDivRef.current.scrollTop = secondDivRef.current.scrollHeight * currentPercent - secondDivRef.current.clientHeight
    }
  }

  // const handleScrollSecond = (scroll) => {
  //   firstDivRef.current.scrollTop = scroll.target.scrollTop;
  // }

  return (
    <>
      <SimpleGrid columns={2} height="100%">
        <Box
          overflow='auto'
          height='100%'
          onScrollCapture={handleScrollFirst}
        >
          <Editor initialDoc={doc} onChange={handleDocChange} filePath={filePath} />
        </Box>

        <Box
          className='preview_parent'
          overflow='auto'
          backgroundColor='#000000'
          height='100%'
          ref={secondDivRef}
        >
          <Preview doc={doc} />
        </Box>
      </SimpleGrid>
    </>
  )
}

export default App;
