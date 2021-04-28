import React, { Component } from 'react';
import { Upload } from 'antd';

import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';


const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

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

  const handleChange = info => {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, imageUrl => setImageUrl(imageUrl));
  };
  
  const UploadButton = (
    <div>
      <UploadOutlined /><div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload 
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : UploadButton}
    </Upload>
  )
}

export default ImageUpload;