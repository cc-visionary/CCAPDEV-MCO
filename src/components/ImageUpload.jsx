/* 
  This component contains the view and functions for the image upload.
  Used is AddProduct and EditProduct components.
  Used in Profile and Register pages.
*/

import React, { Component } from 'react';
import { Upload } from 'antd';

import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';


const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

/* 
  called before uploading the file and checks the following
    1. makes sure that the file types are only jpg or png.
    2. makes sure that the file is less than 2mb
*/
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const ImageUpload = ({ imageUrl, setImageUrl }) => {
  // whenever an image has been uploaded, it converts that image to its data url.
  const handleChange = info => {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, imageUrl => setImageUrl(imageUrl));
  };

  return (
    <Upload 
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : <div><UploadOutlined /><div style={{ marginTop: 8 }}>Upload</div></div>}
    </Upload>
  )
}

export default ImageUpload;