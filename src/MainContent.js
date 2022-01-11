import Upside from './Upside';
import Notes from './Notes';
import Downside from './Downside'

const MainContent = ({isAnotherNoteOpen, setIsAnotherNoteOpen, openComponent, setOpenComponent}) => {
    return (
        <div id="MainContent">
            <Upside></Upside>
            <Notes 
                isAnotherNoteOpen={isAnotherNoteOpen} 
                setIsAnotherNoteOpen={setIsAnotherNoteOpen}
                openComponent={openComponent}
                setOpenComponent={setOpenComponent}
            ></Notes>
            <Downside></Downside>
        </div>
    );
}

export default MainContent;