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
        <div style={{ width: 'auto' }}>
          <UncontrolledCarousel items={items} />
        </div>
      )}
      <br />
      {props.video && (
        <div>
          <video
            style={{ width: '100%' }}
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
