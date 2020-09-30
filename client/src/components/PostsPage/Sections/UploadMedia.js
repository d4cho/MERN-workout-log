import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Button } from 'reactstrap';

const ProfilePicUpload = (props) => {
  const [Files, setFiles] = useState([]);

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' }
    };
    formData.append('file', files[0]);

    axios.post('/api/users/uploadFile', formData, config).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setFiles([...Files, response.data.file]);
        props.refreshFunction([...Files, response.data.file]);
      } else {
        alert('Failed to save the file on the server');
      }
    });
  };

  const onDelete = (file) => {
    const currentIndex = Files.indexOf(file);

    let newFiles = [...Files];
    newFiles.splice(currentIndex, 1);

    setFiles(newFiles);
  };

  const onDeleteVideo = () => {
    setFiles([]);
  };

  console.log(Files);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column'
      }}>
      <Dropzone onDrop={onDrop} multiple={false} maxsize={100}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: '100%',
              height: '180px',
              border: '1px solid lightgray',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              cursor: 'pointer'
            }}
            {...getRootProps()}>
            <input {...getInputProps()} />
            {props.image ? <h2>Upload Pictures</h2> : <h2>Upload a Video</h2>}
            Click or Drag and Drop
          </div>
        )}
      </Dropzone>
      {Files.length > 0 && props.image && (
        <div
          style={{
            display: 'flex',
            width: '700px',
            height: '300px',
            overflowX: 'scroll'
          }}>
          {Files.map((file, index) => (
            <div onClick={() => onDelete(file)}>
              <img
                style={{ minWidth: '300px', width: '300px', height: '240px' }}
                src={`http://localhost:5000/${file}`}
                alt={`productImg-${index}`}
              />
            </div>
          ))}
        </div>
      )}

      {Files.length > 0 && props.video && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={onDeleteVideo}>Remove video</Button>
          </div>
          <video
            style={{ width: '100%' }}
            src={`http://localhost:5000/${Files[0]}`}
            controls></video>
        </div>
      )}
    </div>
  );
};

export default ProfilePicUpload;
