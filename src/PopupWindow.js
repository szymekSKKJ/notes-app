import './PopupWindow.css';

const openPopupWindow = () => {
    const PopupWindow = document.querySelector('#PopupWindow');
    PopupWindow.style.display = 'flex';
    setTimeout(() => {
        PopupWindow.style.opacity = '1';
    }, 10);
}

const hidePopupWindow = () => {
    const PopupWindow = document.querySelector('#PopupWindow');
    PopupWindow.style.opacity = '0';
    setTimeout(() => {
        PopupWindow.style.display = 'none';
    }, 250);
}

const setupPopupWindow = (title, numberOfInputs = 0, isDeciding = false, functionToExecuteOnSubmit) => {
    const PopupWindow = document.querySelector('#PopupWindow');
    const titleElement = document.querySelector('#PopupWindow #title');
    const BackButton = document.querySelector('#BackButton');
    titleElement.innerHTML = title;
    if (isDeciding) {
        const confirmButton = document.createElement('div');
        const denyButton = document.createElement('div');
        const buttonsWrapperElement = document.createElement('div');
        buttonsWrapperElement.id = 'buttons-wrapper';
        PopupWindow.appendChild(buttonsWrapperElement);
        confirmButton.classList.add('button');
        denyButton.classList.add('button');
        confirmButton.innerHTML = '<p>Yes</p>';
        denyButton.innerHTML = '<p>No</p>';
        buttonsWrapperElement.appendChild(confirmButton);
        buttonsWrapperElement.appendChild(denyButton);
        const createdButtons = buttonsWrapperElement.querySelectorAll('.button');

        denyButton.addEventListener('click', () => {
            hidePopupWindow();
            buttonsWrapperElement.remove();
            confirmButton.remove();
            denyButton.remove();
        });

        confirmButton.addEventListener('click', () => {
            functionToExecuteOnSubmit();
            BackButton.click();
        });

        BackButton.addEventListener('click', () => {
            hidePopupWindow();
            buttonsWrapperElement.remove();
            confirmButton.remove();
            denyButton.remove();
        }, {once: true});

        return { createdButtons };
    }
    else {
        const inputsElement = document.createElement('div');
        const submitButton = document.createElement('div');
        inputsElement.id = 'inputs';
        PopupWindow.appendChild(inputsElement);
        submitButton.id = 'submit-button';
        submitButton.innerHTML = '<p>submit</p>'
        PopupWindow.appendChild(submitButton);
        for (let i = 0; i < numberOfInputs; i++) {
            const inputElement = document.createElement('input');
            inputsElement.appendChild(inputElement);
        }
        const createdInputs = document.querySelectorAll('#PopupWindow #inputs input');
    
        BackButton.addEventListener('click', () => {
            submitButton.remove();
            inputsElement.remove();
        }, {once: true});
    
        submitButton.addEventListener('click', () => { 
            const ifPassed = functionToExecuteOnSubmit();
            if (ifPassed) {
                hidePopupWindow();
                //Preventing multiply events fired
                inputsElement.remove();
                submitButton.remove();
            }
        });
        return { createdInputs };
    }
}

const PopupWindow = ({isAnotherNoteOpen, setIsAnotherNoteOpen, openComponent, setOpenComponent}) => {

    return (
        <div id="PopupWindow">
            <p id="title"></p>
        </div>
    );
}

export {PopupWindow, setupPopupWindow, openPopupWindow, hidePopupWindow};