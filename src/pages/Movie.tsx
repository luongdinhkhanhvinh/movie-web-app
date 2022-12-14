import React from "react";
import { useParams } from "react-router-dom";
// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config/config";
// Components
import BreadCrumb from "../components/BreadCrump";

// Hook
import { useMovieFetch } from "../hooks/useMovieFetch";
// Image
import NoImage from "../images/no_image.jpg";
import Actor from "../components/Actor";
import Grid from "../components/Grid";
import MovieInfo from "../components/MovieInfo";
import Spinner from "../components/Spinner";

const Movie: React.FC = () => {
  const { movieId } = useParams();

  const { state: movie, loading, error } = useMovieFetch(movieId);

  if (loading) return <Spinner />;
  if (error) return <div>Something went wrong...</div>;

  return (
    <>
      <BreadCrumb movieTitle={movie.original_title} />
      <MovieInfo movie={movie} />

      <Grid header="Actors">
        {movie.actors.map((actor) => (
          <Actor
            key={actor.credit_id}
            name={actor.name}
            character={actor.character}
            imageURL={
              actor.profile_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                : NoImage
            }
          />
        ))}
      </Grid>
    </>
  );
};

export default Movie;
