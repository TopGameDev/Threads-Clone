import React from 'react'
import { useState } from 'react';
import useShowToast from './useShowToast';

const usePreviewImage = () => {
    const [imgUrl, setImageUrl] = useState(null);
    const showToast = useShowToast()

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file && file.type.startsWith("image/")){
            const reader = new FileReader();

            reader.onloadend = () => {
                setImageUrl(reader.result);
            }

            reader.readAsDataURL(file);
        } else {
            showToast("Invalid file type", "Please select an immage file", "error");
            setImageUrl(null);
        }
    };
  return { handleImageChange, imgUrl, setImageUrl }
}

export default usePreviewImage