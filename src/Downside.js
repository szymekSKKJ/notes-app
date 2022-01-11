import './downside.css';
import { useEffect, useState } from 'react';

const Downside = () => {
    const [value, setValue] = useState(0);

    const getNotesFromLocalstorage = () => {

        const values = []
        const keys = Object.keys(localStorage)
        keys.forEach((key, index) => {
            values.push(JSON.parse(localStorage.getItem(keys[index])));
        });

        return values;
    }

    const sortNotes = (_case) => {
        const notesFromLocalstorage = getNotesFromLocalstorage();
        const NoteElements = document.querySelectorAll('#Note');
        notesFromLocalstorage.forEach((note, index) => {
            const { isFavourite } = note;
            NoteElements[index + 1].style.opacity = '0';     
            setTimeout(() => {
                NoteElements[index + 1].style.display = 'none';
            }, 250);
            if (_case === 'favourite' && isFavourite === 'true') {
                setTimeout(() => {
                    NoteElements[index + 1].style.display = 'flex';
                    setTimeout(() => {
                        NoteElements[index + 1].style.opacity = '1';
                    }, 10);
                }, 250);
            }
            else if (_case === 'all') {
                setTimeout(() => {
                    NoteElements[index + 1].style.display = 'flex';
                    setTimeout(() => {
                        NoteElements[index + 1].style.opacity = '1';
                    }, 10);
                }, 250);
            }
            else {
                NoteElements[index + 1].style.opacity = '0';     
                setTimeout(() => {
                    NoteElements[index + 1].style.display = 'none';
                }, 250);
            }
        });
    }

    const sortNotesBySelectedOption = (option) => {
        const title = option.querySelector('#title').innerHTML;
        const _case = title.toLowerCase();
        switch (title.toLowerCase()) {
            case 'all':
                sortNotes(_case);
            break;
            case 'favourite':
                sortNotes(_case);
            break;
          }
    }

    const addClickEventToOptions = () => {
        const options = document.querySelectorAll('#Downside .option');

        options.forEach((option) => {
            option.addEventListener('click', () => {
                setValue(value + 1);
                options.forEach((option) => {
                    option.style.filter = ' brightness(0.5)';
                });
                option.style.filter = 'unset';
                sortNotesBySelectedOption(option);
            });
        });
    }

    useEffect(() => {
        addClickEventToOptions();
    }, []);

    return (
        <div id="Downside">
            <div className="option checked">
                <i className="fas fa-th-large"></i>
                <p id="title">All</p>
            </div>
            <div className="option">
                <i className="fas fa-star"></i>
                <p id="title">Favourite</p>
            </div>
        </div>
    );
}

export default Downside;