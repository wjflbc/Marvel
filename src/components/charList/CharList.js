import {Component} from 'react'
import MarvelService from "../../services/MarvelService";

import './charList.scss';



class CharList extends Component {

    state = {
        charList: []
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
            charList
        })
    }

    renderChars = (arr) => {
        return arr.map((item) => {
            return (
                <li className="char__item"
                    key={item.id}>
                    <img src={item.thumbnail} alt={item.name}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
    }




    render() {
        const {charList} = this.state;


        const charAll = this.renderChars(charList);

        return (
            <div className="char__list">
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