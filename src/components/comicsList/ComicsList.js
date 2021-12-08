import {useState, useEffect} from 'react';
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spiner/spiner";
import ErrorMessage from "../errorMessage/ErrorMessage";


import './comicsList.scss';


const ComicsList = () => {

    const [comicsList, setComics] = useState([]);
    const [offset, setOffset] = useState(210);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {
        console.log(newComicsList)
        let ended = false
        if (newComicsList.length < 8) {
            ended = true
        }

        setComics(comicsList => [...comicsList, ...newComicsList]);
        setOffset(offset => offset + 8);
        setNewItemLoading(newItemLoading => false);
        setComicsEnded(comicsEnded => ended);

    }

    function renderComics (arr) {
        return arr.map((item) => {
            const {title, thumbnail, price, id} = item;
            return (
                <li
                    className="comics__item"
                    key={id}>
                    <a href="#">
                        <img src={thumbnail} alt={title} className="comics__item-img"/>
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price}</div>
                    </a>
                </li>
            )
        })
    }

    const comics = renderComics(comicsList)

    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {comics}
                {spinner}
                {errorMessage}
            </ul>
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}
                style={{"display" : comicsEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;