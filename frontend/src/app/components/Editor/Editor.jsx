"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Editor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
          <p>
            Hello World! 🌐
          </p>
        `,
  });

  if (!editor) {
    return null;
  }

  console.log(editor);

  return <EditorContent editor={editor} />;
};

export default Editor;
