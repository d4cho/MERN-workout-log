import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

const PostMedia = (props) => {
  let items = [];
  if (props.images) {
    items = props.images.map((image, i) => {
      return {
        src: `http://localhost:5000/${image}`,
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
        <div style={{ height: '500px', width: '500px' }}>
          <UncontrolledCarousel items={items} />
        </div>
      )}
      <br />
      {props.video && (
        <div>
          <video
            style={{ width: '100%' }}
            src={`http://localhost:5000/${props.video}`}
            controls
          />
        </div>
      )}
      <br />
    </div>
  );
};

export default PostMedia;
