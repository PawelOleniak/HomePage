import React from 'react';
import { createPortal } from 'react-dom';
import { useHistory } from 'react-router-dom';
import { Wrapper, Content, CloseIcon } from './ModalCss';

export default function Modal({ children, isStatic }) {
  const history = useHistory();
  const handleClose = (e) => {
    history.goBack();
  };
  return createPortal(
    <Wrapper onClick={handleClose}>
      <Content isStatic={isStatic} onClick={(e) => e.stopPropagation()}>
        <CloseIcon onClick={handleClose}>&times;</CloseIcon>
        {children}
      </Content>
    </Wrapper>,
    document.querySelector('#modal')
  );
}
