import './notes.css';
import Note from './Note';
const Notes = ({isAnotherNoteOpen, setIsAnotherNoteOpen, openComponent, setOpenComponent}) => {
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    const getNotesFromLocalstorage = () => {

        const values = []
        const keys = Object.keys(localStorage)
        keys.forEach((key, index) => {
            values.push(JSON.parse(localStorage.getItem(keys[index])));
        });

        return values;
    }
    const notesFromLocalstorage = getNotesFromLocalstorage();

    return (
        <div id="Notes">
            <Note 
                addNew={true} 
                isAnotherNoteOpen={isAnotherNoteOpen} 
                setIsAnotherNoteOpen={setIsAnotherNoteOpen}
                openComponent={openComponent}
                setOpenComponent={setOpenComponent}
            >
                <i className="fad fa-plus-circle"></i>
                <></>
            </Note>  
            {
                notesFromLocalstorage.map((note, index) => {
                   return (
                    <Note 
                    isAnotherNoteOpen={isAnotherNoteOpen} 
                    setIsAnotherNoteOpen={setIsAnotherNoteOpen}
                    openComponent={openComponent}
                    setOpenComponent={setOpenComponent}
                    isLocked={note.isLocked} 
                    password={note.password}
                    id={note.id}
                    key={'note' + index}
                    content={note.content}
                >
                    <div id="title">
                        <p>{note.title}</p>
                    </div>
                    <div id="content">
                        <p>{note.content.replaceAll('<br>', '\n')}</p>
                    </div>
                    <div id="date">
                        <p>{new Date(note.date).getDate()} {month[new Date(note.date).getMonth()]} </p>
                    </div>
                </Note> 
                   )
                })
            }          
        </div>
    );
}

export default Notes;