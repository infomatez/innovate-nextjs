import React, { useEffect, useState } from 'react';

function uploadImageCallBack(file:File) {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.imgur.com/3/image');
        xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }

const EditorImage = ({ editorState, onEditorStateChange, wrapperClassName, editorClassName, toolbarClassName, placeholder }:any) => {
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('react-draft-wysiwyg').then((module) => {
        setIsEditorLoaded(true);
      });
    }
  }, []);

  if (!isEditorLoaded) {
    return <div>Loading editor...</div>;
  }


  const { Editor } = require('react-draft-wysiwyg');

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      wrapperClassName={wrapperClassName}
      editorClassName={editorClassName}
      toolbarClassName={toolbarClassName}
      placeholder={placeholder}
      toolbar={{
        inline: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        history: { inDropdown: true },
        image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
      }}
    />
  );
};

export default EditorImage;


