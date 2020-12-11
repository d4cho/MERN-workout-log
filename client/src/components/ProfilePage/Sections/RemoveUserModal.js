/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import axios from 'axios';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PulseLoader from 'react-spinners/PulseLoader';

const RemoveUserModal = (props) => {
  const { myUserId, profileUserId, profileUserFollowingList } = props;

  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggle = () => setModal(!modal);

  const onConfirmRemove = () => {
    setIsLoading(true);

    let variables = {
      profileUserId,
      newFollowingList: profileUserFollowingList.filter(
        (userId) => userId !== myUserId
      )
    };

    axios.put('/api/users/removeFollower', variables).then((response) => {
      if (response.data.success) {
        setIsLoading(false);
        toggle();
        props.refreshFunction();
      } else {
        alert('Failed to remove user from your followers');
      }
    });
  };

  return (
    <div>
      <Button color='danger' size='lg' onClick={toggle}>
        Remove
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {`Remove ${props.profileUsername} from your followers?`}
        </ModalHeader>
        <ModalBody>
          {`${props.profileUsername} will no longer receive notifications of your new posts or
          activities.`}
          {isLoading && <PulseLoader size={25} color={'#0000FF'} />}
        </ModalBody>
        <ModalFooter>
          {isLoading ? (
            <Button color='secondary' disabled>
              Loading...
            </Button>
          ) : (
            <>
              <Button color='danger' onClick={onConfirmRemove}>
                CONFIRM
              </Button>{' '}
              <Button color='secondary' onClick={toggle}>
                CANCEL
              </Button>
            </>
          )}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RemoveUserModal;
