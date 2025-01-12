import React, { useState } from "react";

interface FileUploadProps {
  onFileUpload: (url: string) => void; // Change the type to string for URL
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={imageUrl}
        onChange={handleUrlChange}
        placeholder="Enter image URL"
      />
      <button
        onClick={() => {
          if (imageUrl.trim() !== "") {
            onFileUpload(imageUrl.trim()); // Pass the URL to the callback
            setImageUrl(""); // Clear the input after submitting
          }
        }}
      >
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
