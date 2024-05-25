import SkeletonLoader from '../Skeleton/Skeleton';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Carousel } from 'primereact/carousel';
import { removeDuplicates } from '../../services/helperService';
import { useNavigate } from 'react-router-dom';

export const CharacterDetails = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [filmsList, setFilmsList] = useState([]);
    const location = useLocation();
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
        if(location.state === null){
            navigate(`/`);
        }
        else{ 
            getMovieList();
        }
    }, []);

    const getMovieList = () => {
        if (location.state.filmResultDTOList?.length > 0) {
            let filmList = location.state.filmResultDTOList?.filter((ele) => {
            return location.state.starWarCharacterDetails?.films?.includes(ele?.url);
            });
            const finalList = removeDuplicates(filmList);
            if (finalList && finalList?.length > 0) {
                setFilmsList(finalList);
            }
        }
    }
          

    const characterDetailsTemplate = (movie) => {
        return(
        <div className="listing-item-style" onClick={() => redirectToMovie(movie)}>
            {movie?.imgPath ? (
                <img src={movie?.imgPath} />
            ) : (
                <img src='/assets/images/movies/poster/default-movie.png' alt="default" />
            )}
            <h6>{movie?.title}</h6>
        </div>)
    }

    const redirectToMovie =(movie) => {
        navigate(`/movie/${movie.id}`, {state:{movie: movie, filmResultDTOList: location.state.filmResultDTOList}});
      }
    return(
        <>
            {isLoading && (<SkeletonLoader></SkeletonLoader>)}
            {!isLoading && (<div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="spacing info">
                            <div className="left">
                                <div className="poster lazyloaded">
                                    <img className="lazyload" src={ location?.state?.starWarCharacterDetails.profile_path } />
                                </div>
                            </div>
                            <div className="right">
                                <div className="overview">
                                    <h2 className="title">{location?.state?.starWarCharacterDetails.name}</h2>
                                </div>
                                <div className="stats">
                                    <ul className="nolist">
                                        {location?.state?.starWarCharacterDetails.height && (<li>
                                            <div className="label">
                                                Height
                                            </div>
                                            <div className="value">
                                                {location?.state?.starWarCharacterDetails.height}
                                            </div>
                                        </li>)}
                                        {location?.state?.starWarCharacterDetails.height && (<li>
                                            <div className="label">
                                                Mass
                                            </div>
                                            <div className="value">
                                                {location?.state?.starWarCharacterDetails.mass}
                                            </div>
                                        </li>)}
                                        {location?.state?.starWarCharacterDetails.hair_color && (<li>
                                            <div className="label">
                                                Hair Color
                                            </div>
                                            <div className="value">
                                                {location?.state?.starWarCharacterDetails.hair_color}
                                            </div>
                                        </li>)}
                                        {location?.state?.starWarCharacterDetails.birth_year && (<li>
                                            <div className="label">
                                                Birth Year
                                            </div>
                                            <div className="value">
                                                {location?.state?.starWarCharacterDetails.birth_year}
                                            </div>
                                        </li>)}
                                        {location?.state?.starWarCharacterDetails.gender && (<li>
                                            <div className="label">
                                                Gender
                                            </div>
                                            <div className="value">
                                                {location?.state?.starWarCharacterDetails.gender}
                                            </div>
                                        </li>)}
                                        {location?.state?.starWarCharacterDetails.eye_color && (<li>
                                            <div className="label">
                                                Eye Color
                                            </div>
                                            <div className="value">
                                                {location?.state?.starWarCharacterDetails.eye_color}
                                            </div>
                                        </li>)}
                                    </ul>
                                </div >
                            </div >
                        </div >
                    </div>
                </div>
            </div>)}
            <div className="listing-space mb-20">
                <div className="listing__head">
                    <h2 className="listing__title">Movies</h2>
                </div>
                <Carousel
                            value={filmsList}
                            numVisible={6}
                            numScroll={4}
                            circular={false}
                            responsiveOptions={responsiveOptions}
                            itemTemplate={characterDetailsTemplate}
                        />
            </div>
        </>
     );
}