import {Component} from 'react';
import MarvelService from "../../services/MarvelService";
import Spinner from "../spiner/spiner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import './charList.scss';





class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false
        if (newCharList.length > 9) {
            ended = true
        }

        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }



    renderChars = (arr) => {
        return arr.map((item) => {
            const {thumbnail, name, id} = item;

            let styleImg = {'objectFit' : 'cover'};

            if (thumbnail ==='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
               styleImg = {'objectFit' : 'contain'};
            }
            return (
                <li className="char__item"
                    key={id}
                    onClick={() => this.props.onCharSelected(id)}>
                    <img src={thumbnail} alt={name} style={styleImg}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    render() {
        const {charList, loading, error, newItemLoading, offset, charEnded} = this.state;
        const charAll = this.renderChars(charList);

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
                    onClick={() => this.onRequest(offset)}
                    style={{"display" : charEnded ? 'none' : 'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;