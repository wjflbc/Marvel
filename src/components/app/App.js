import {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const App = () => {

    const [selectedChar, setChar] = useState(null)


   const onCharSelected = (id) => {
         setChar(id);
     }

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Route path='/'>
                        <ErrorBoundary>
                            <RandomChar/>
                        </ErrorBoundary>
                        <div className="char__content">
                            <ErrorBoundary>
                                <CharList
                                    onCharSelected={onCharSelected}/>
                            </ErrorBoundary>
                            <ErrorBoundary>
                                <CharInfo charId={selectedChar}/>
                            </ErrorBoundary>
                        </div>
                        <img className="bg-decoration" src={decoration} alt="vision"/>
                    </Route>
                    <Route path='/comics'>
                        <AppBanner/>
                        <ComicsList/>
                    </Route>
                </main>
            </div>
        </Router>
    )

}

export default App;