import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import ProfilePic from '../utils/ProfilePic';

const ProfilePicUpload = (props) => {
  const [image, setImage] = useState(props.image);

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' }
    };
    formData.append('file', files[0]);

    axios.post('/api/users/uploadFile', formData, config).then((response) => {
      if (response.data.success) {
        setImage([response.data.file]);
        props.refreshFunction(response.data.file);
      } else {
        alert('Failed to save the image on the server');
      }
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone onDrop={onDrop} multiple={false} maxsize={100}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: '300px',
              height: '240px',
              border: '1px solid lightgray',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              cursor: 'pointer'
            }}
            {...getRootProps()}>
            <input {...getInputProps()} />
            <img
              style={{ width: '240px', height: '240px', borderRadius: '50%' }}
              src={`http://localhost:5000/${image}`}
            />
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default ProfilePicUpload;
