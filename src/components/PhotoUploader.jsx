import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";

// const MAX_PHOTOS = 20;

const PhotoUploader = ({ photos, onPhotosChange }) => {
  const handleAddPhoto = (event) => {
    const files = Array.from(event.target.files);
    const newPhotos = files.slice(0, 20 - photos.length);
    const photoUrls = newPhotos.map((file) => URL.createObjectURL(file));
    onPhotosChange([...photos, ...photoUrls]);
  };

  return (
    <div className="flex justify-between w-full p-6">
      <div className="grid grid-cols-4 gap-4 max-w-[600px]">
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={index}
            className={`w-24 h-24 border-2 flex items-center justify-center ${
              index === 0 && photos.length < 20
                ? "border-black"
                : "border-gray-300"
            }`}
          >
            {photos[index] ? (
              <img
                src={photos[index]}
                alt={`Uploaded ${index}`}
                className="w-full h-full object-cover"
              />
            ) : index === photos.length ? (
              <label className="cursor-pointer flex flex-col items-center justify-center">
                <FaCamera size={24} />
                <span className="text-sm mt-1">Add Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleAddPhoto}
                />
              </label>
            ) : (
              <FaCamera size={24} className="text-gray-400" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoUploader;
