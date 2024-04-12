import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Assuming only one file is allowed
      const file = acceptedFiles[0];
      if (file) {
        onFileUpload(file);
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={dropzoneStyles}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the file here ...</p>
      ) : (
        <p>Drag 'n' drop a file here, or click to select a file</p>
      )}
    </div>
  );
};

const dropzoneStyles: React.CSSProperties = {
  border: "2px dashed #ddd",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

export default FileUpload;
