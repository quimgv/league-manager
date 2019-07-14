import React from "react";
import { Button, Modal } from "semantic-ui-react";

// Redux
import { connect } from "react-redux";
import { handleModal } from "../../redux/actions/modal";

const ModalComponent = ({ modal, handleModal }) => {
  const {
    actions = false,
    body,
    closeIcon = true,
    confirmButtonContent = "Yes",
    confirmButtonIcon = "checkmark",
    confirmButtonLabelPosition = "right",
    dimmer = true,
    header,
    open,
    size = "small"
  } = modal;
  return (
    <Modal dimmer={dimmer} size={size} open={open} onClose={handleModal} closeIcon={closeIcon}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>{body}</Modal.Content>
      {actions && (
        <Modal.Actions>
          <Button negative>Cancel</Button>
          <Button
            positive
            icon={confirmButtonIcon}
            labelPosition={confirmButtonLabelPosition}
            content={confirmButtonContent}
          />
        </Modal.Actions>
      )}
    </Modal>
  );
};

const mapStateToProps = state => ({
  modal: state.modal
});

export default connect(
  mapStateToProps,
  { handleModal }
)(ModalComponent);
