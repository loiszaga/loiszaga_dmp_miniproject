import React from "react";
import Modal from 'react-native-modal';

export const ModalContents = ({ content, show, onClose, animationIn, animationOut }) => {
    
    return (
        <Modal 
            animationIn={animationIn? animationIn : "zoomIn"}
            animationOut={animationOut? animationOut : "bounceOut"}
            backdropColor="#888"
            onBackdropPress={onClose}
            isVisible={show}
            useNativeDriver={true}
            hideModalContentWhileAnimating={true}
        >
            {content}
        </Modal>
    )
} 