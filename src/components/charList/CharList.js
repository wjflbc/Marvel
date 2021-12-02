import {useState, useEffect, useRef} from 'react';
import MarvelService from "../../services/MarvelService";
import Spinner from "../spiner/spiner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import PropTypes from 'prop-types';

import './charList.scss';





const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);


   const  marvelService = new MarvelService();

   useEffect(() => {
       onRequest();
   }, [])


    const onRequest = (offset) => {
        onCharListLoading();
        marvelService
            .getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    const onCharListLoading = () => {
       setNewItemLoading(true);
    }

   const onCharListLoaded = (newCharList) => {
        let ended = false
        if (newCharList.length > 9) {
            ended = true
        }

       setCharList(charList => [...charList, ...newCharList]);
       setLoading(loading => false);
       setNewItemLoading(newItemLoading => false);
       setOffset(offset => offset + 9);
       setCharEnded(charEnded => ended);

    }
    const onError = () => {
        setLoading(false);
        setError(true);

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

        const spiner = loading ? <Spinner/> : null;
        const errorMeessage = error ? <ErrorMessage/> : null;
        const content = !(loading || error) ? charAll : null;



    return (
        <div className="char__list">

            <ul className="char__grid">
                {spiner}
                {errorMeessage}
                {content}
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