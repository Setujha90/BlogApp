import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function Blog() {
  
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState('')

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  
  
  
  return (
    <div className='py-3 mx-auto w-[80%]'>
      <form onSubmit={(e) => {
        e.preventDefault()
        console.log('Title :- ', title)
        console.log('Description :- ', description)
        log()
      }} >
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className='w-full p-2 border-2 border-gray-300 rounded-lg mb-2'
          type="text" id='Title' placeholder='Title...'
        />
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className='w-full p-2 border-2 border-gray-300 rounded-lg mb-2'
          type="text" id='Description' placeholder='Description...'
        />
        <Editor
          apiKey='8neuuq3iq3wr5ph47gk5s2giqwx919yvy51ikmh82znw9oom'
          onInit={(evt, editor) => editorRef.current = editor}
          initialValue="<p>Write your content here...</p>"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        />
      <button>Submit</button>
      </form>
    </div>
  );
}