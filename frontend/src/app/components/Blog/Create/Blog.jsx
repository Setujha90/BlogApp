import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { createBlog } from "@/app/server/blogs";
import { useRouter } from "next/navigation";

export default function Blog() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(""); // [1]
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");

  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
      const response = await createBlog(title, description, content, status, thumbnail);
      router.push(`/blog/${response._id}`);
    }catch(err){
      console.error("Error while posting blog!!")
    }
  };

  return (
    <div className="py-3 mx-auto w-[80%]">
      <form className="flex flex-col gap-1" onSubmit={handleSubmit} enctype='multipart/form-data'>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={`${!title && "border-red-400"} outline-none w-full p-2 border-2 border-gray-300 rounded-lg`}
          type="text"
          id="Title"
          placeholder="Title..."
        />
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className={`${!description && "border-red-400"} outline-none w-full p-2 border-2 border-gray-300 rounded-lg`}
          type="text"
          id="Description"
          placeholder="Description..."
        />
        <input 
          type="file" 
          name="thumbnail" 
          id="thumbnail"
          className="hidden w-full p-2 border-2 border-gray-300 rounded-lg"
          onChange={(e) => {setThumbnail(e.target.files[0])}}
        />
        <label 
          for="thumbnail"
          className={`${thumbnail ? "bg-slate-100 flex justify-center items-center" : "text-red-500 bg-red-200"} w-full p-2 border-2 border-gray-300 rounded-lg hover:cursor-pointer`}
        >
          {thumbnail == "" ? <div>Upload Thumbnail</div> : ""}
          <img
            src={thumbnail ? URL.createObjectURL(thumbnail) : ""} 
            className={`${!thumbnail && 'hidden'} w-[400px] h-[250px] object-cover rounded-md`}
          />
        </label>
        <Editor
          apiKey="8neuuq3iq3wr5ph47gk5s2giqwx919yvy51ikmh82znw9oom"
          initialValue="<p>Write what's in your mind ...</p>"
          init={{
            height: 400,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
          onEditorChange={(newContent, editor) => setContent(newContent)}
        />
        <div className="flex gap-4">
          <button
            disabled={title == "" && description == "" && content == "" && thumbnail == ""}
            onClick={(e) => {
              setStatus("Draft");
            }}
            className="bg-red-400 hover:bg-red-500 transition-all ease-in-out px-4 py-1 rounded-md"
          >
            Save as Draft
          </button>
          <button
            disabled={title == "" && description == "" && content == "" && thumbnail == ""}
            onClick={(e) => {
              setStatus("published");
            }}
            className="bg-green-400 hover:bg-green-500 transition-all ease-in-out px-4 py-1 rounded-md"
          >
            POST
          </button>
        </div>
      </form>
    </div>
  );
}
