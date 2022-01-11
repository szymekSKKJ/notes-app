import { useState } from 'react';
import MainContent from './MainContent';
import EditOrCreateNote from './EditOrCreateNote';
import BackButton from './BackButton';
import {PopupWindow} from './PopupWindow';

const App = () => {
  
  const [isAnotherNoteOpen, setIsAnotherNoteOpen] = useState({isOpen: false, noteContentElement: undefined, noteTitleElement: undefined, isNew: false});
  const [openComponent, setOpenComponent] = useState({componentToOpen: undefined, componentToClose: undefined});

  return (
    <div id="app">
      <PopupWindow
        isAnotherNoteOpen={isAnotherNoteOpen} 
        setIsAnotherNoteOpen={setIsAnotherNoteOpen}
        openComponent={openComponent}
        setOpenComponent={setOpenComponent}
      >
      </PopupWindow>
      <BackButton 
        isAnotherNoteOpen={isAnotherNoteOpen} 
        setIsAnotherNoteOpen={setIsAnotherNoteOpen}
        openComponent={openComponent}
        setOpenComponent={setOpenComponent}
      ></BackButton>
      <MainContent 
        isAnotherNoteOpen={isAnotherNoteOpen} 
        setIsAnotherNoteOpen={setIsAnotherNoteOpen}
        openComponent={openComponent}
        setOpenComponent={setOpenComponent}
      ></MainContent>
      <EditOrCreateNote 
        isAnotherNoteOpen={isAnotherNoteOpen} 
        setIsAnotherNoteOpen={setIsAnotherNoteOpen}
        openComponent={openComponent}
        setOpenComponent={setOpenComponent}
      ></EditOrCreateNote>
    </div>
  );
}

export default App;