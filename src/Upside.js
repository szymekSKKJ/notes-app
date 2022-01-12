import './upside.css';

import { useEffect, useState } from 'react';

const Upside = (props) => {

    const [value, setValue] = useState(0);

    const searchNotesByTitle = (event) => {
        event.stopPropagation();
        const NotesElement = document.querySelector('#Notes');
        const notes = NotesElement.querySelectorAll('#Note');
        const searchInputElement = document.querySelector('#Upside #search-input');
        const searchInput = document.querySelector('#Upside #search-input input');
        searchInput.focus();

        const getNotesFromLocalstorage = () => {
            const values = []
            const keys = Object.keys(localStorage)
            keys.forEach((key, index) => {
                values.push(JSON.parse(localStorage.getItem(keys[index])));
            });
    
            return values;
        }

        const notesFromLocalstorage = getNotesFromLocalstorage();

        searchInputElement.addEventListener('click', (event) => {
            event.stopPropagation();
        });

        NotesElement.style.transform = 'translateY(50px)';
        searchInputElement.style.top = '75px';
        searchInputElement.style.opacity = '1';

        const isEmpty = str => !str.trim().length;

        searchInput.addEventListener('input', () => {
            const inputValue = searchInput.value;

            notesFromLocalstorage.forEach((note, index) => {
                const { title } = note;
                
                if (title.toLowerCase().includes(inputValue.toLowerCase())) {
                    setTimeout(() => {
                        notes[index + 1].style.display = 'flex';
                        setTimeout(() => {
                            notes[index + 1].style.opacity = '1';
                        }, 10);
                    }, 250);
                }
                else if (!isEmpty(inputValue)) {
                    notes[index + 1].style.opacity = '0';
                    setTimeout(() => {
                        notes[index + 1].style.display = 'none';
                    }, 250);
                }
                else if (isEmpty(inputValue)) {
                    setTimeout(() => {
                        notes[index + 1].style.display = 'flex';
                        setTimeout(() => {
                            notes[index + 1].style.opacity = '1';
                        }, 10);
                    }, 250);
                }
            });
        });
    }

    useEffect(() => {
        document.addEventListener('click', () => {
            const NotesElement = document.querySelector('#Notes');
            const searchInputElement = document.querySelector('#Upside #search-input');
            NotesElement.style.transform = 'translateY(0px)';
            searchInputElement.style.top = '-33px';
            searchInputElement.style.opacity = '0';
            searchInputElement.querySelector('input').value = '';
        });
        const BackButton = document.querySelector('#BackButton');
        BackButton.addEventListener('click', () => {
            setValue(value + 1); 
        });
    }, []);

    return ( 
        <div id="Upside">
            <div id="title">
                <p>Notes</p>
            </div>
            <div id="serach-button" onClick={(event) => searchNotesByTitle(event)}>
                <i className="fas fa-search"></i>
            </div>
            <div id="search-input">
                <input type="text" placeholder="Search note"></input>
            </div>
        </div>
    );
}

export default Upside;