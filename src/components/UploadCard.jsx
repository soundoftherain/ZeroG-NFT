import React, { useRef, useState } from "react";

export default function UploadCard() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setFile(files[0]);
      setProgress(100);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setProgress(100);
    }
  };

  const handleCardClick = () => fileInputRef.current.click();

  // Simulates upload & mint (replace with backend/contract integration)
  const handleMint = async () => {
    setUploading(true);
    setProgress(20);
    await new Promise((r) => setTimeout(r, 700));
    setProgress(60);
    await new Promise((r) => setTimeout(r, 700));
    setProgress(100);
    await new Promise((r) => setTimeout(r, 500));
    setUploading(false);
    alert("🎵 Music file minted as NFT!\n\n(Wire with blockchain next.)");
  };

  return (
    <div className="w-full max-w-sm bg-white border rounded-xl shadow-xl p-6 flex flex-col items-center">
      <div
        className="w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center mb-4 cursor-pointer transition hover:border-blue-400"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={handleCardClick}
        tabIndex={0}
        role="button"
      >
        <input
          type="file"
          accept="audio/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleChange}
        />
        <span className="text-gray-400 text-center">
          {file ? (
            <span>
              <b>{file.name}</b>
              <br />
              {Math.round(file.size / 1000)} KB
            </span>
          ) : (
            "Drag & drop music file here\nor tap to select"
          )}
        </span>
      </div>
      <div className="w-full flex flex-col items-center">
        <div
          className="w-full h-2 mb-2 rounded-full bg-gray-100 overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="h-2 bg-blue-500 transition-all duration-300"
            style={{
              width: `${progress}%`,
              opacity: uploading || file ? 1 : 0,
            }}
          />
        </div>
        <button
          className="w-full py-3 mt-3 text-lg font-bold rounded-lg bg-blue-600 text-white shadow hover:bg-blue-700 active:bg-blue-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={!file || uploading}
          onClick={handleMint}
        >
          {uploading ? "Minting..." : "Mint as NFT"}
        </button>
      </div>
    </div>
  );
}