import {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom'
import Spinner from "../spiner/spiner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import './singleComicPage.scss';
import useMarvelService from "../../services/MarvelService";

const SingleComicPage = () => {
    const {comicId} = useParams();

    const [comic, setComic] = useState(null);

    const {loading, error, getComic, clearError} =  useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId])


    const updateComic = () => {
        clearError();
        getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const errorMeessage = error ? <ErrorMessage/> : null;
    const spiner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <div className="single-comic">
            {content}
            {spiner}
            {errorMeessage}
        </div>
    )
}

const View = ({comic}) => {
    const {title, thumbnail, description, pageCount, price, language} = comic

    return (
        <>

            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}$</div>
            </div>
            <Link to="/" className="single-comic__back">Back to all</Link>

        </>
    )
}

export default SingleComicPage;