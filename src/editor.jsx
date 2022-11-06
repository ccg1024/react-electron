import React, { useCallback, useEffect } from 'react'
import useCodeMirror from './use_codemirror'
import './editor.css'


const Editor = ({ initialDoc, onChange }) => {
  // const { onChange } = props.onChange
  const handleChange = useCallback(
    state => onChange(state.doc.toString()),
    [onChange]
  )
  const [refContainer, editorView] = useCodeMirror({
    initialDoc: initialDoc,
    onChange: handleChange
  })

  useEffect(() => {
    if (editorView) {
      // do othing
    }
  }, [editorView])

  return <div className='editor-wrapper' ref={refContainer}></div>
}

export default Editor
