import React from "react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import 'katex/dist/katex.min.css'
import './preview.css'


const Preview = ({ doc }) => {
  return (
    <ReactMarkdown
      className="preview"
      children={doc}
      components={{

        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, '')}
              style={docco}
              language={match[1]}
              showLineNumbers='true'
              PreTag="div"
              customStyle={{ marginTop: '10px', marginBottom: '10px', borderRadius: '5px' }}
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        }
      }}
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
    />
  )
}


export default Preview
