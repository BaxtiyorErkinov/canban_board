import React from 'react';

export const handleReadFile = (files: any) => {
  const images: string[] = [];
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = (readerEvent) => {
        images.push(readerEvent.target?.result as string);
      };
    }
  }
  return images;
};
