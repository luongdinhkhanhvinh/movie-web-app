import React from "react";
import Button from "../components/Button";
import Grid from "../components/Grid";
import HeroImage from "../components/HeroImage";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner";
import Thumbnail from "../components/Thumbnail";

// Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config/config";

// Components

// Hooks
import { useHomeFetch } from "../hooks/useHomeFetch";

// Image: if API fails to render image then the fallback image used this one
import NoImage from "../images/no_image.jpg";

const Home: React.FC = () => {
  const { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore } =
    useHomeFetch();

  if (error) {
    return <h1>Something Went Wrong...</h1>;
  }
  return (
    <React.Fragment>
      {!searchTerm && state.results[0] ? (
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
          title={state.results[0].original_title}
          text={state.results[0].overview}
        />
      ) : null}

      <SearchBar setSearchTerm={setSearchTerm}></SearchBar>

      <Grid header={searchTerm ? "Search Result" : "Popular Movies"}>
        {state.results.map((movie) => (
          <Thumbnail
            key={movie.id}
            clickable
            image={
              movie.poster_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                : NoImage
            }
            movieHeight={false}
            movieId={movie.id}
          />
        ))}
      </Grid>

      {loading && <Spinner />}

      {state.page < state.total_pages && !loading && (
        <Button callback={() => setIsLoadingMore(true)}>Load More</Button>
      )}
    </React.Fragment>
  );
};
export default Home;
