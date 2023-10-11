import React, { useEffect, useState } from 'react';

const EditorImage = ({ editorState,contentStateUpdate, onEditorStateChange,onContentStateChange, wrapperClassName, editorClassName, toolbarClassName, placeholder }:any) => {
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
        history: { inDropdown: false },
        
      }}
    />
  );
};

export default EditorImage;


