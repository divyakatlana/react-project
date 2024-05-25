import SkeletonLoader from '../Skeleton/Skeleton';
import './MovieDetails.scss';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getcharacterDetails } from '../../services/axiosService';
import { getIdfromUrl } from '../../services/helperService';
import { Carousel } from 'primereact/carousel';
import { forkJoin } from 'rxjs';
import { useNavigate } from 'react-router-dom';

const MovieDetails = () => {
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const [charactersList, setCharactersList] = useState([]);
    const navigate = useNavigate();


    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    useEffect(() => {
        if (location.state === null) {
            navigate(`/`);
        }
        else {
            fetchCharactersList();
        }
    }, []);

    const fetchCharactersList = () => {
        setIsLoading(true);
        const charactersDetailsApiCall = location.state.movie?.characters?.filter(item => {
            if (getIdfromUrl(item) <= 0)
                return false;
            else
                return true;
        }).map(item => {
            const id = getIdfromUrl(item);
            return getcharacterDetails(id);
        });
        if (charactersDetailsApiCall.length !== 0) {
            setIsLoading(true);
            forkJoin(charactersDetailsApiCall).subscribe({
                next: (response) => {
                    setIsLoading(false);
                    let charactersList = response || [];
                    if (charactersList?.length > 0) {
                        location.state.movie.characters = charactersList?.map((item, index) => {
                            return { ...item, id: (index + 1), profile_path: `/assets/images/characters/${index + 1}.jpg` }
                        });
                    }
                    setCharactersList(location.state.movie.characters)
                },
                error: (err) => {
                    setIsLoading(false);
                    console.error('characters DetailsApi error response ->', err);
                }
            });
        }
        setCharactersList(location.state.movie.characters);
        setIsLoading(false);
    }

    const characterTemplate = (character) => {
        return (
            <div className="listing-item-style" onClick={() => redirectTocharacters(character)}>
                <div className="overlay">
                    <div className="hover">Details</div>
                </div>
                {character.profile_path ? (
                    <img src={character.profile_path} />
                ) : (
                    <img src='/assets/images/movies/poster/default-movie.png' alt="default" />
                )}
                <h6>{character.name}</h6>
            </div>
        );
    };

    const redirectTocharacters = (item) => {
        navigate(`/character/${item?.id}`, { state: { movie: location.state.movie, filmResultDTOList: location.state.filmResultDTOList, starWarCharacterDetails: item } });
    }

    return (
        <>
            {isLoading && (<SkeletonLoader></SkeletonLoader>)}
            {!isLoading && (<div className="hero">
                <div className="backdrop">
                    <div className="lazyloaded">
                        <img className="lazyload image" src={location?.state?.movie?.backdrop_path} />
                    </div>
                </div>
                <div className="pane">
                    <div>
                        <div className="name">{location?.state?.movie?.title}</div>
                        <div className="meta">
                            <div className="info">
                                <span>Episode {location?.state?.movie?.episode_id}</span>
                            </div>
                        </div>
                        <div className="desc">{location?.state?.movie?.opening_crawl}</div>
                    </div>
                </div>
            </div >)}

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        <div className="listing__head overview-top-margin">
                            <h2 className="listing__title">Overview</h2>
                        </div>
                        {isLoading && (<SkeletonLoader></SkeletonLoader>)}
                        {!isLoading && (<div className="listing-space info__movies">
                            <div className="left">
                                <div className="poster">
                                    <img src={location?.state?.movie?.imgPath} />
                                </div>
                            </div>
                            <div className="right">
                                <div className="overview">
                                    <h2 className="title">Storyline</h2>
                                    <div>{location?.state?.movie?.opening_crawl}</div>
                                </div>
                                <div className="stats">
                                    <ul className="nolist">
                                        <li>
                                            <div className="label">
                                                Released
                                            </div>
                                            <div className="value">
                                            </div>
                                        </li>
                                        <li>
                                            <div className="label">
                                                Producer
                                            </div>
                                            <div className="value">
                                                {location?.state?.movie?.producer}
                                            </div>
                                        </li>
                                        {location?.state?.movie?.director && (<li>
                                            <div className="label">
                                                Director
                                            </div>
                                            <div className="value">
                                                ${location?.state?.movie?.director}
                                            </div>
                                        </li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>


            <div className="listing-space">
                <div className="listing__head">
                    <h2 className="listing__title">Cast</h2>
                </div>
                {isLoading && (<SkeletonLoader></SkeletonLoader>)}


                {!isLoading && (
                    <Carousel
                        value={charactersList}
                        numVisible={6}
                        numScroll={4}
                        circular={false}
                        responsiveOptions={responsiveOptions}
                        itemTemplate={characterTemplate}
                    />
                )}
            </div>
        </>
    );
};

export default MovieDetails;