import {useHttp} from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, error, request, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=7abfe4fc277dde4e4f91f5a65d36d33b';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res =  await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

     const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?&${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
        }
    }

    return {getComics, getAllCharacters, getCharacter, loading, error, clearError}
}

export default useMarvelService;