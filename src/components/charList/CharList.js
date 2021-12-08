import {useState, useEffect, useRef} from 'react';
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spiner/spiner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import PropTypes from 'prop-types';

import './charList.scss';





const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);


   const {loading, error, getAllCharacters} = useMarvelService();

   useEffect(() => {
       onRequest(offset, true);
   }, [])


    const onRequest = (offset, initial) => {
       initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)

    }


   const onCharListLoaded = (newCharList) => {
        let ended = false
        if (newCharList.length < 9) {
            ended = true
        }

       setCharList(charList => [...charList, ...newCharList]);
       setNewItemLoading(newItemLoading => false);
       setOffset(offset => offset + 9);
       setCharEnded(charEnded => ended);

    }

    const itemsRef = useRef([]);

    const onItemFocus = (id) => {
        itemsRef.current.forEach(item => item.classList.remove('char__item_selected'));
        itemsRef.current[id].classList.add('char__item_selected');
        itemsRef.current[id].focus();
    }


    function renderChars (arr) {

        return arr.map((item, i) => {
            const {thumbnail, name, id} = item;

            let styleImg = {'objectFit' : 'cover'};

            if (thumbnail ==='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
               styleImg = {'objectFit' : 'contain'};
            }

            return (
                <li className='char__item'
                    key={id}
                    onClick={() => {
                        props.onCharSelected(id);
                        onItemFocus(i);
                        }
                    }
                    ref={el => itemsRef.current[i] = el}

                    onKeyPress={(e) => {
                            if (e.key === "" || e.key === 'Enter') {
                                props.onCharSelected(id);
                                onItemFocus(i);
                            }
                        }
                    }>
                    <img
                        src={thumbnail}
                        alt={name}
                        style={styleImg}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })
    }




        const charAll = renderChars(charList);
        const spiner = loading && !newItemLoading ? <Spinner/> : null;
        const errorMeessage = error ? <ErrorMessage/> : null;




    return (
        <div className="char__list">

            <ul className="char__grid">
                {spiner}
                {errorMeessage}
                {charAll}
            </ul>
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}
                style={{"display" : charEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )

}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;