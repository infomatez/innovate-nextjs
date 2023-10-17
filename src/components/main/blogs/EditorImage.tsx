import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const DynamicEditor = dynamic(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  { ssr: false }, // Use the ssr: false option to prevent server-side rendering
);

const EditorImage = ({
  editorState,
  onEditorStateChange,
  wrapperClassName,
  editorClassName,
  toolbarClassName,
  placeholder,
}: any) => {
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsEditorLoaded(true);
    }
  }, []);

  if (!isEditorLoaded) {
    return <div>Loading editor...</div>;
  }

  return (
    <DynamicEditor
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
