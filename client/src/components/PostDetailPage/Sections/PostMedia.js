import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

const PostMedia = (props) => {
  // change host for production mode
  let host = 'http://localhost:5000/';
  if (process.env.NODE_ENV === 'production') {
    host = '/';
  }

  let items = [];
  if (props.images) {
    items = props.images.map((image, i) => {
      return {
        src: `${host}${image}`,
        altText: '',
        caption: '',
        header: '',
        key: `${image + i}`
      };
    });
  }

  return (
    <div>
      {props.images.length > 0 && (
        <div style={{ width: '100%', margin: 'auto' }}>
          <UncontrolledCarousel items={items} />
        </div>
      )}
      <br />
      {props.video && (
        <div style={{ width: '70%', margin: 'auto' }}>
          <video
            style={{ width: '100%', margin: 'auto' }}
            src={`${host}${props.video}`}
            controls
          />
        </div>
      )}
      <br />
    </div>
  );
};

export default PostMedia;
