import { useRef, useEffect } from 'react';
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import { setupPopupWindow, openPopupWindow, hidePopupWindow} from './PopupWindow.js';
import './EditOrCreateNote.css';

const EditOrCreateNote = ({isAnotherNoteOpen, setIsAnotherNoteOpen, openComponent, setOpenComponent}) => {
    const textareaElement = useRef(undefined);
    const titleIpnutElement = useRef(undefined);
    const EditOrCreateNoteRef = useRef(undefined);
    const { isOpen, noteContentElement, noteTitleElement, isNew, id: noteId } = isAnotherNoteOpen;
    const FAClasses = ['fa-lock','fa-star','fa-trash'];
    let isNoteCreateNowId = undefined;

    const autoHeightTextarea = () => {
        textareaElement.current.style.height = `auto`;
        textareaElement.current.style.height = `${textareaElement.current.scrollHeight}px`;
    }

    const createOrEditNote = (title, content) => {
        if (isNew) {
            const createdDate = new Date();
            const randomNoteId = () => {
                const S4 = () => {
                   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
                };
                return (S4()+S4()+S4()+S4());
            }

            const randomizedId = randomNoteId();
            isNoteCreateNowId = randomizedId;

            localStorage.setItem(randomizedId, `
                {
                    "id": "${randomizedId}", 
                    "title": "${title}", 
                    "content": "${content}", 
                    "date": "${createdDate}",
                    "isLocked": "false",
                    "password": "undefind",
                    "isFavourite": "false"
                }
            `);
        }
        else {
            const { id, isLocked, password, isFavourite } = JSON.parse(localStorage.getItem(noteId));
            const createdDate = new Date();

            localStorage.setItem(noteId, `
                {
                    "id": "${noteId}", 
                    "title": "${title}", 
                    "content": "${content}", 
                    "date": "${createdDate}",
                    "isLocked": "${isLocked}",
                    "password": "${password}",
                    "isFavourite": "${isFavourite}"
                }
            `); 
        }
    }

    const ifAnotherContentIsOpen = () => {
        if (isOpen) {
            EditOrCreateNoteRef.current.style.display = 'flex';
            setTimeout(() => {
                EditOrCreateNoteRef.current.style.transform = 'translateX(0px)';
            }, 100);
        }
        else {
            EditOrCreateNoteRef.current.style.transform = 'translateX(100vw)';
            setTimeout(() => {
                EditOrCreateNoteRef.current.style.display = 'none';
            }, 250);
        }
    }

    const getNoteTitleToTitileElement = () => {
        if (noteTitleElement) {
            const dummyDiv = document.createElement('div');
            ReactDOM.render(noteTitleElement, dummyDiv);
            setTimeout(() => {
                const noteTitle = dummyDiv.querySelector('#title p').innerHTML;
                titleIpnutElement.current.value = noteTitle;
            }, 1);
        }
        else {
            titleIpnutElement.current.value = '';
        }
    }

    const getNoteContentToTextArea = () => {
        if (noteContentElement) {
            const dummyDiv = document.createElement('div');
            ReactDOM.render(noteContentElement, dummyDiv);
            setTimeout(() => {
                const noteContent = dummyDiv.querySelector('#content p').innerHTML;
                textareaElement.current.value = noteContent;
                autoHeightTextarea();
            }, 1);
        }
        else {
            textareaElement.current.value = '';
        }
    }

    const checkInputsValues = (firstInput, secondInput) => {
        const PopupWindow = document.querySelector('#PopupWindow');
        const title = PopupWindow.querySelector('#title');
        if (firstInput.value === secondInput.value) {
            hidePopupWindow();
            setOpenComponent({componentToOpen: undefined, componentToClose: undefined});
            const { id, isLocked, password, title, content, isFavourite } = isNoteCreateNowId === undefined ? JSON.parse(localStorage.getItem(noteId)) : JSON.parse(localStorage.getItem(isNoteCreateNowId));
            const createdDate = new Date();
            if (firstInput.value.length === 0) {
                localStorage.setItem(id, `
                {
                    "id": "${id}", 
                    "title": "${title}", 
                    "content": "${content}", 
                    "date": "${createdDate}",
                    "isLocked": "${false}",
                    "password": "${undefined}",
                    "isFavourite": "${isFavourite}"
                }
            `);
            }
            else {
                localStorage.setItem(id, `
                    {
                        "id": "${id}", 
                        "title": "${title}", 
                        "content": "${content}", 
                        "date": "${createdDate}",
                        "isLocked": "${true}",
                        "password": "${firstInput.value}",
                        "isFavourite": "${isFavourite}"
                    }
                `); 
            }
            return true;
        } else {
            title.innerHTML = 'Passwords are difrent!'; 
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

    const setNotePassword = () => {
        const {createdInputs} = setupPopupWindow('Create password <p style="font-size:14px">Tip: leave this values empty to remove password</p>', 2, false, () => checkInputsValues(createdInputs[0], createdInputs[1]));
        openPopupWindow();
        const PopupWindow = document.querySelector('#PopupWindow');
        createdInputs[0].placeholder = 'Password';
        createdInputs[1].placeholder = 'Repeat password';
        createdInputs[0].type = 'password';
        createdInputs[1].type = 'password';
        setOpenComponent({componentToOpen: undefined, componentToClose: PopupWindow});
    }

    const addToFavourite = () => {
        const { id, isLocked, password, title, content, isFavourite } = isNoteCreateNowId === undefined ? JSON.parse(localStorage.getItem(noteId)) : JSON.parse(localStorage.getItem(isNoteCreateNowId));
        const createdDate = new Date();

        localStorage.setItem(id, `
            {
                "id": "${id}", 
                "title": "${title}", 
                "content": "${content}", 
                "date": "${createdDate}",
                "isLocked": "${isLocked}",
                "password": "${password}",
                "isFavourite": "${isFavourite === 'false' ? true : false}"
            }
        `);
    }

    const removeNote = () => {
        openPopupWindow();
        const PopupWindow = document.querySelector('#PopupWindow');
        setOpenComponent({componentToOpen: undefined, componentToClose: PopupWindow});

        const removeThatNote = (createdButtons) => {
            const { id } = isNoteCreateNowId === undefined ? JSON.parse(localStorage.getItem(noteId)) : JSON.parse(localStorage.getItem(isNoteCreateNowId));
            localStorage.removeItem(id);
            setIsAnotherNoteOpen({isOpen: false, noteContentElement: undefined, noteTitleElement: undefined, isNew: false}); 
        }

        const { createdButtons } = setupPopupWindow('Do you want to remove this note?', 0, true, () => removeThatNote(createdButtons));
    }

    const optionsOfClickedOption = (FAClass) => {
        switch (FAClass) {
            case 'fa-trash':
                removeNote();
            break;
            case 'fa-lock':
                setNotePassword();
            break;
            case 'fa-star':
                addToFavourite();
            break;
          }
    }

    const changeStatus = (event, FAClass) => {
        const tool = event.target;
        const iElement = tool.querySelector('i');
        optionsOfClickedOption(FAClass);
        if (iElement.className.includes('far')) {
            iElement.className = 'fas ' + FAClass;
            tool.style.animation = 'toggle-state 500ms ease both';
            setTimeout(() => {
                tool.style.animation = 'unset';
            }, 500);
        }
        else {
            iElement.className = 'far ' + FAClass;
            tool.style.animation = 'toggle-state 500ms ease both';
            setTimeout(() => {
                tool.style.animation = 'unset';
            }, 500);
        }
    }

    //dodaj usunecie zawartosci gdy uzytkownik wyjdzie z notatki podczas jej tworzenia  ! !

    let isEditing = false;

    const displaySaveButtonWhenEditingIsStarted = () => {
        const textareaElement = document.querySelector('#EditOrCreateNote textarea');
        const saveButton = document.querySelector('#EditOrCreateNote #save-button');
        const toolsElements = document.querySelectorAll('#EditOrCreateNote #tools .tool');
        const titleInputElement = document.querySelector('#title input');
        const BackButton = document.querySelector('#BackButton');
        
        if (!isEditing) {
            saveButton.style.animation = 'unset';
            saveButton.style.transform = 'translateY(-250px)';
            saveButton.style.display = 'block';
            setTimeout(() => {
                saveButton.style.animation = 'slide 1000ms ease-in-out both';
            }, 100);
            toolsElements.forEach((tool) => {
                tool.style.opacity = '0';
                tool.style.pointerEvents = 'none';
            });

            const saveNote = () => {
                const textareaElementValue = textareaElement.value;
                const titleInputElementValue = titleInputElement.value;
                createOrEditNote(titleInputElementValue, textareaElementValue);
                saveButton.style.transform = 'translate(-50%, 0px)';
                saveButton.style.animation = 'unset';
                setTimeout(() => {
                    saveButton.style.animation = 'slide 1000ms ease-in-out both reverse';
                    setTimeout(() => {
                        saveButton.style.animation = 'unset';
                        saveButton.style.display = 'none'; 
                        isEditing = false;  
                    }, 1500);
                }, 100);
                setTimeout(() => {
                    toolsElements.forEach((tool) => {
                        tool.style.opacity = '1';
                        tool.style.pointerEvents = 'all';
                    });
                }, 750);
                saveButton.removeEventListener('click', saveNote);
            }

            saveButton.addEventListener('click', saveNote);

            BackButton.addEventListener('click', () => {
                const textareaElementValue = textareaElement.value;
                const titleInputElementValue = titleInputElement.value;
                isEditing = false; 
                saveButton.style.transform = 'translate(-50%, -250px)';
                saveButton.style.animation = 'unset';
                setTimeout(() => {
                    toolsElements.forEach((tool) => {
                        tool.style.opacity = '1';
                        tool.style.pointerEvents = 'all';
                    });
                }, 750);
                saveButton.removeEventListener('click', saveNote);
            });  
        }
        isEditing = true;
    }

    const setCorrectFAClassForToolButtons = () => {
        if (isOpen && noteId !== undefined) {
            const { id, isFavourite, isLocked } = isNoteCreateNowId === undefined ? JSON.parse(localStorage.getItem(noteId)) : JSON.parse(localStorage.getItem(isNoteCreateNowId));
            const toolsElements = document.querySelectorAll('#EditOrCreateNote .tool');
            toolsElements.forEach((tool) => {
                const iElement = tool.querySelector('i');
                const iElementFAClass = iElement.classList[1];
                if (iElement.className.includes('fa-lock') && isLocked === 'true') {
                    iElement.className = 'fas ' + iElementFAClass;
                }
                else if (iElement.className.includes('fa-star') && isFavourite === 'true') {
                    iElement.className = 'fas ' + iElementFAClass;
                }
                else if (iElement.className.includes('fa-trash')) {
                    //That's trash
                }
                else {
                    iElement.className = 'far ' + iElementFAClass;
                }
            });
        }
        else {
            const toolsElements = document.querySelectorAll('#EditOrCreateNote .tool');
            toolsElements.forEach((tool) => {
                const iElement = tool.querySelector('i');
                const iElementFAClass = iElement.classList[1];
                iElement.className = 'far ' + iElementFAClass;
            });
        }
    }

    useEffect(() => {
        ifAnotherContentIsOpen();
        getNoteContentToTextArea();
        getNoteTitleToTitileElement();
        setCorrectFAClassForToolButtons();
    }, [isOpen]);

    return (
        <div id="EditOrCreateNote" ref={EditOrCreateNoteRef}>
            <div id="tools">
                <div id="save-button">
                    <p>Save</p>
                </div>
                {
                FAClasses.map((FAClass, index) => {
                    return (
                        <div className="tool" onClick={(event) => changeStatus(event, FAClass)} key={FAClass + `${index}`}>
                            <i className={"far " + FAClass}></i>
                        </div>
                    );
                })
                }
            </div>
            <div id="title">
                <input type="text" placeholder="Title" ref={titleIpnutElement} spellCheck="false" onInput={() => displaySaveButtonWhenEditingIsStarted()}></input>
            </div>
            <div id="textarea-wrapper">
                <textarea 
                    id="content" 
                    ref={textareaElement} 
                    placeholder="Write something..." 
                    spellCheck="false"
                    onInput={() => {
                        autoHeightTextarea();
                        displaySaveButtonWhenEditingIsStarted();
                    }}
                ></textarea>
            </div>
        </div>
    );
}

export default EditOrCreateNote;