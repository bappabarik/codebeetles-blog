import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import conf from "../conf/conf";
import { useEditor } from "../Context/EditorContext";

export default function RTE({ name, control, label, defaultValue = "" }) {
  const { setEditorInstance, setIsActive } = useEditor()

  const handleEditorInit = (evt, editor) => {
    setEditorInstance(editor)
    editor.ui.registry.addButton('AI', {
      icon: 'AI',
      tooltip: 'Ask AI',
      onAction: () => setIsActive(true)
    });
  };

  return (
    <div className="w-full text-left flex flex-col gap-1 relative ">
      {label && (
        <label className="inline-block mb-1 pl-1 dark:text-white py-2">
          {label}
        </label>
      )}
      <Controller
        name={name || "content"}
        control={control}
        rules={{
          required: {
            value: true,
            message: "This field is required",
          },
          minLength: {
            value: 100,
            message: "Minimum length of the content should be 100 characters",
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Editor
              apiKey={conf.rteapikey}
              onInit={handleEditorInit}
              value={value || defaultValue}
              init={{
                height: 500,
                menubar: true,
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
                  "AI | bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={onChange}
            />
            {error && <p className="text-red-600 mt-2">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
}
