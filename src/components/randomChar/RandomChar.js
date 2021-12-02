import {useState, useEffect} from 'react'
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from "../../services/MarvelService";
import Spinner from "../spiner/spiner";
import ErrorMessage  from "../errorMessage/ErrorMessage";

const RandomChar = () =>  {


    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
        console.log('try')

        // let timerId = setInterval(updateChar, 70000);
        //
        // return () => {
        //     clearInterval(timerId);
        // }

    }, [])


    const onCharLoaded = (char) => {
        setChar(char);
        setLoading (false);
    }

    const onCharLoading = () => {
        setLoading (true)
    }

     const updateChar = () => {
         const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
         onCharLoading();
         marvelService
             .getCharacter(id)
             .then(onCharLoaded)
             .catch(onError)

     }

     const onError = () => {
         setLoading( false);
         setError(true);
     }


    const errorMeessage = error ? <ErrorMessage/> : null;
    const spiner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char}/> : null;

    return (
        <div className="randomchar">
            {errorMeessage}
            {spiner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )

}

const View = ({char}) => {

    const {name, description, thumbnail, homepage, wiki} = char;

    const message = !description ? "Not found description" : (description.substring(0, 150) + '...');

    let imgStyle = {'objectFit' : 'cover'};

    if ( thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"){
        imgStyle = {'objectFit' : 'contain'};
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {message}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;