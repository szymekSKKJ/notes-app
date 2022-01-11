import { useEffect, useRef } from "react";

const BackButton = ({isAnotherNoteOpen, setIsAnotherNoteOpen, openComponent, setOpenComponent}) => {

    const BackButtonStyle = {
        width: 'auto',
        height: 'auto',
        backgroundColor: 'transparent',
        zIndex: '100000000000',
        position: 'fixed',
        fontSize: '36px',
        top: '16px',
        display: 'flex',
        alignItems: 'center',
        left: '16px',
        color: 'rgba(255, 255, 255, 0.8)',
        display: 'none',
        transition: 'opacity 250ms',
        cursor: 'pointer'
    }

    const { componentToOpen , componentToClose } = openComponent;
    const BackButtonRef = useRef(undefined);

    const ifAnotherContentIsOpen = () => {
        const { isOpen } = isAnotherNoteOpen;
        if (isOpen || componentToClose !== undefined) {
            BackButtonRef.current.style.display = 'flex';
            setTimeout(() => {
                BackButtonRef.current.style.opacity = '1';
            }, 10);
        }
        else {
            BackButtonRef.current.style.opacity = '0';
            setTimeout(() => {
                BackButtonRef.current.style.display = 'none';
            }, 250);
        }
    }

    const closeOpenedComponent = () => {
        if (componentToClose !== undefined) {
            componentToClose.style.opacity = '0';
            setTimeout(() => {
                componentToClose.style.display = 'none';
            }, 250);
        }
        else {
            setIsAnotherNoteOpen({isOpen: false, noteContentElement: undefined, noteTitleElement: undefined, isNew: false});
        }
        setOpenComponent({componentToOpen: undefined, componentToClose: undefined});
    }

    useEffect(() => {
        ifAnotherContentIsOpen();
    }, [isAnotherNoteOpen, openComponent]);


    return (
        <div id="BackButton" ref={BackButtonRef} style={BackButtonStyle} onClick={() => closeOpenedComponent()}>
            <i className="fad fa-arrow-square-left"></i>
        </div>
    );
}

export default BackButton;