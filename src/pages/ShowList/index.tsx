import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router';
import { HashLoader } from 'react-spinners';
import lists from '../../assets/data/lists.json';
import { VideoListing } from '../../components/molecules/VideoListing';
import { VideoListingCard } from '../../components/molecules/VideoListing/components/Card';
import BaseLayout from '../../components/organisms/BaseLayout';
import { MoviesAPI } from '../../services/api/MoviesAPI';
import { ImageService } from '../../services/image/ImageService';
import { Movie } from '../../services/movie/IMovieService';
import { MovieService } from '../../services/movie/MovieService';
import { generateRandomArray } from '../../services/utils/generateRandomArray';
import { TVService } from '../../services/tv/TVService';
import { TVShow } from '../../services/tv/ITVService';

export const ShowListPage = () => {
  const api = new MoviesAPI();
  const showService = new TVService(api);
  const imageService = new ImageService();
  const [listMovies, setListMovies] = useState<
    {
      category: string;
      genres: number[];
      shows: TVShow[];
    }[]
  >([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    console.log('fetching data');

    const randomArray = generateRandomArray(10, 0, lists.categories.length - 1);
    const randomDefs = randomArray.map((index) => lists.categories[index]);

    const promises = randomDefs.map(async (list) => {
      const genres = list.genres.map((genre) => genre.id);

      return showService
        .discover({
          genres,
        })
        .then(({ results }) => {
          console.log(results);
          return { category: list.category, shows: results, genres };
        });
    });

    Promise.all(promises).then((results) => {
      setTimeout(
        () =>
          setListMovies((prev) => [
            ...prev,
            ...results.filter((result) => {
              return result.shows.length > 8;
            }),
          ]),
        2000
      );
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
            <VideoListing key={id} title={list.category} className="my-2">
              {list.shows.map((show) => (
                <VideoListingCard key={show.id} onClick={() => navigate(`/shows/${show.id}/season/1`)}>
                  <img
                    src={imageService.getImageSrc(show.poster_path, {
                      size: 'original',
                    })}
                    alt={show.name}
                    className="w-full h-full object-cover"
                  />
                </VideoListingCard>
              ))}
            </VideoListing>
          ))}
        </div>
      </InfiniteScroll>
    </BaseLayout>
  );
};
