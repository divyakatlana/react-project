import { useState } from 'react';
import SkeletonLoader from '../Skeleton/Skeleton';
import { Carousel } from 'primereact/carousel';
import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { fetchFilmsList } from '../../services/axiosService';
import  Slider from '../Slider/Slider';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [isLoading, setIsLoading] = useState(false);

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

    const [filmResultDTOList, setFilmResultDTOList] = useState([]);

    useEffect(() => {
        getFilmList()
    }, []);

    const getFilmList = () => {
        setIsLoading(true);
        fetchFilmsList().then(data => {
            setIsLoading(false);
            data.results = data?.results?.map((item, index) => {
                return {
                  ...item, id: (index + 1), imgPath: `/assets/images/movies/poster/${index + 1}.jpg`
                  , backdrop_path: `/assets/images/movies/backdrop/${index + 1}.jpg`
                }
              });
            setFilmResultDTOList(data.results);
        }).catch(error => {
            this.isLoading = false;
            console.error('Film Api error response ->', error);
        });
    }

    const redirectToMovie = (movie) => {
        navigate(`/movie/${movie.id}`, {state:{movie: movie, filmResultDTOList: filmResultDTOList}});
    }

    const filmTemplate = (movie) => {
        return (
          <div className="listing-item-style" onClick={() =>redirectToMovie(movie)}>
            {movie.imgPath ? (
              <img src={movie.imgPath} alt={movie.title} />
            ) : (
              <img src='assets/images/movies/poster/default-movie.png' alt="default" />
            )}
            <h6>{movie.title}</h6>
            <p className="year"><span>{format(new Date(movie.release_date), 'yyyy')}</span></p>
          </div>
        );
      };

    return(
        <>
            <div>
                {isLoading && (<SkeletonLoader></SkeletonLoader>)}
                {!isLoading && (<Slider filmResultDTOList={filmResultDTOList}></Slider>)}
            </div>
            <div className="listing">
                <div className="listing__head">
                    <h3 className="listing__title">Movies</h3>
                </div>

                {isLoading && (<SkeletonLoader></SkeletonLoader>)}

                <div>
                    {!isLoading && (
                        <Carousel
                            value={filmResultDTOList}
                            numVisible={6}
                            numScroll={4}
                            circular={false}
                            responsiveOptions={responsiveOptions}
                            itemTemplate={filmTemplate}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default Home;