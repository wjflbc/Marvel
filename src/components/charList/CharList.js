import {Component} from 'react'
import MarvelService from "../../services/MarvelService";
import Spinner from "../spiner/spiner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import './charList.scss';





class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharList();
    }

    updateCharList = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharListLoaded)
    }


    onCharListLoaded = (charList) => {
        this.setState({
            charList,
            loading: false
        })
    }



    renderChars = (arr) => {
        return arr.map((item) => {
            const {thumbnail, name, id} = item;
            console.log(thumbnail)

            let styleImg = {'objectFit' : 'cover'};

            if (thumbnail ==='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
               styleImg = {'objectFit' : 'contain'};
            }
            return (
                <li className="char__item"
                    key={id}>
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
        const {charList, loading, error} = this.state;
        const charAll = this.renderChars(charList);

        const spiner = loading ? <Spinner/> : null;
        const errorMeessage = error ? <ErrorMessage/> : null;
        const content = !(loading || error) ? charAll : null;



        return (
            <div className="char__list">
                {spiner}
                {errorMeessage}
                {content}
                <ul className="char__grid">
                    {charAll}

                    {/*<li className="char__item">*/}
                    {/*    <img src={abyss} alt="abyss"/>*/}
                    {/*    <div className="char__name">Abyss</div>*/}
                    {/*</li>*/}
                    {/*<li className="char__item char__item_selected">*/}
                    {/*    <img src={abyss} alt="abyss"/>*/}
                    {/*    <div className="char__name">Abyss</div>*/}
                    {/*</li>*/}
                    {/*<li className="char__item">*/}
                    {/*    <img src={abyss} alt="abyss"/>*/}
                    {/*    <div className="char__name">Abyss</div>*/}
                    {/*</li>*/}
                    {/*<li className="char__item">*/}
                    {/*    <img src={abyss} alt="abyss"/>*/}
                    {/*    <div className="char__name">Abyss</div>*/}
                    {/*</li>*/}
                    {/*<li className="char__item">*/}
                    {/*    <img src={abyss} alt="abyss"/>*/}
                    {/*    <div className="char__name">Abyss</div>*/}
                    {/*</li>*/}
                    {/*<li className="char__item">*/}
                    {/*    <img src={abyss} alt="abyss"/>*/}
                    {/*    <div className="char__name">Abyss</div>*/}
                    {/*</li>*/}
                    {/*<li className="char__item">*/}
                    {/*    <img src={abyss} alt="abyss"/>*/}
                    {/*    <div className="char__name">Abyss</div>*/}
                    {/*</li>*/}
                    {/*<li className="char__item">*/}
                    {/*    <img src={abyss} alt="abyss"/>*/}
                    {/*    <div className="char__name">Abyss</div>*/}
                    {/*</li>*/}
                    {/*<li className="char__item">*/}
                    {/*    <img src={abyss} alt="abyss"/>*/}
                    {/*    <div className="char__name">Abyss</div>*/}
                    {/*</li>*/}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;