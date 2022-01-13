import { useEffect, useRef, useState } from 'react';
import './note.css';
import EditOrCreateNote from './EditOrCreateNote';
import { setupPopupWindow, openPopupWindow, hidePopupWindow} from './PopupWindow.js';

const Note = ({children, addNew, isLocked, isAnotherNoteOpen, setIsAnotherNoteOpen, openComponent, setOpenComponent, password, id, content}) => {
    const NoteComponent = useRef(null);
    const isLockedTrue = isLocked === 'true';
    let noteContentElement; 
    let noteTitleElement;

    const changeNoteStylesToAddNewNote = () => {
        if (addNew) {
            NoteComponent.current.style.filter = 'opacity(0.4)';
        }
    }

    const checkNotePassword = (input) => {
        const PopupWindow = document.querySelector('#PopupWindow');
        const title = PopupWindow.querySelector('#title');

        if (input.value === password) {
            setIsAnotherNoteOpen({isOpen: true, noteContentElement: noteContentElement, noteTitleElement: noteTitleElement, isNew: false, id: id});
            setOpenComponent({componentToOpen: undefined, componentToClose: undefined});
            input.value = '';
            title.innerHTML = 'Type password'; 
            return true;
        }
        else {
            title.innerHTML = 'Password is incorrect!'; 
            title.style.animation = 'wrongPassword 500ms ease-in-out both';

            setTimeout(() => {
                title.style.animation = 'unset';
                title.style.color = 'red';
            }, 500);

            setTimeout(() => {
                title.innerHTML = 'Type password'; 
                title.style.color = '#f2f2f2';
            }, 5000);
        }
    }

    const displayPopupWindowForPassword = () => {
        const PopupWindow = document.querySelector('#PopupWindow');
        const { createdInputs } = setupPopupWindow('Type password', 1, false, () => checkNotePassword(createdInputs[0]))
        createdInputs[0].placeholder = 'Password';
        createdInputs[0].type = 'password';
        openPopupWindow();
        setOpenComponent({componentToOpen: undefined, componentToClose: PopupWindow})
    }

    const editCurrentNote = (event) => {
        if (!isLockedTrue) {
            setIsAnotherNoteOpen({isOpen: true, noteContentElement: noteContentElement, noteTitleElement: noteTitleElement, isNew: false, id: id});
        }
        else {
            displayPopupWindowForPassword();
        }
        
    }

    const createNewNote = (event) => {
        setIsAnotherNoteOpen({isOpen: true, noteContentElement: undefined, noteTitleElement: undefined, isNew: true});
    }

    const changeNoteContent = () => {
        if (document.querySelector('#Note #content')) {
            const noteContentElement = document.querySelector('#Note #content');
            noteContentElement.innerHTML = content;
            noteContentElement.style.opacity = '1'
        } 
    }

    useEffect(() => {
        changeNoteStylesToAddNewNote();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            changeNoteContent();
        }, 100);
    }, [content]);


    return (
        <div 
        id="Note" 
        ref={NoteComponent} 
        onClick={(event) => {
            addNew ? createNewNote(event) : editCurrentNote(event);
        }
            
            }>
            {
            children.map((childrenNode, index, array) => {
                if (childrenNode.props.id === 'content') {
                    noteContentElement = childrenNode;
                }
                if (childrenNode.props.id === 'title') {
                    noteTitleElement = childrenNode;
                }
                if (isLockedTrue && childrenNode.props.id === 'content') {
                    return (
                        <div id="content" className="content-hidden" key={null}>
                            <i className="fas fa-lock-alt"></i>
                            <p>Content hidden</p>
                        </div>
                    );
                }
                else if (isLockedTrue && childrenNode.props.id === 'date') {
                    return;
                }
                else {
                    return childrenNode;
                }
            })}
        </div>
    );
}

Note.defaultProps = {
    addNew: false,
    isLockedTrue: false 
}

export default Note;