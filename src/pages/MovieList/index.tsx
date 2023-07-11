import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router';
import { HashLoader } from 'react-spinners';
import lists from '../../assets/data/lists.json';
import BaseLayout from '../../components/organisms/BaseLayout';
import { MoviesAPI } from '../../services/api/MoviesAPI';
import { ImageService } from '../../services/image/ImageService';
import { Movie } from '../../services/movie/IMovieService';
import { MovieService } from '../../services/movie/MovieService';
import { generateRandomArray } from '../../services/utils/generateRandomArray';
import { HorizontalList } from '../../components/atoms/HorizontalScroll';
import { Image } from '../../components/atoms/Image';
import { TitleList } from '../../components/molecules/TitleList';

export const MovieListPage = () => {
  const api = new MoviesAPI();
  const movieService = new MovieService(api);
  const imageService = new ImageService();
  const [listMovies, setListMovies] = useState<
    {
      category: string;
      genres: number[];
      movies: Movie[];
    }[]
  >([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    console.log('fetching data');

    const randomArray = generateRandomArray(5, 0, lists.categories.length - 1);
    const randomDefs = randomArray.map((index) => lists.categories[index]);

    const promises = randomDefs.map(async (list) => {
      const genres = list.genres.map((genre) => genre.id);

      return movieService
        .discover({
          genres,
        })
        .then(({ results }) => {
          console.log(results);
          return { category: list.category, movies: results, genres };
        });
    });

    Promise.all(promises).then((results) => {
      setTimeout(() => setListMovies((prev) => [...prev, ...results]), 2000);
    });
  };

  return (
    <BaseLayout onSearchChange={(query) => navigate(`/search/${query}`)}>
      <InfiniteScroll
        height={window.innerHeight}
        next={() => fetchData()}
        hasMore={true}
        dataLength={listMovies.length}
        loader={
          <div className="w-full h-40 flex items-center justify-center">
            <HashLoader size={50} color="white" />
          </div>
        }
        className="absolute top-0 left-0 right-0 bottom-0 overflow-y-scroll scrollbar-hide">
        <div className="mt-20 flex flex-col gap-2">
          {listMovies.map((list, id) => (
            <TitleList
              key={id}
              title={list.category}
              titles={list.movies}
              onClick={(movie) => navigate(`/movies/${movie.id}`)}
            />
          ))}
        </div>
      </InfiniteScroll>
    </BaseLayout>
  );
};
