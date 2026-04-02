import prisma from "../prisma/client.js";

export const getStats = async () => {
  const totalDirectors = await prisma.director.count();
  const totalMovies = await prisma.movie.count();

  const avgMoviesPerDirector = totalDirectors > 0 
    ? totalMovies / totalDirectors 
    : 0;

  return {
    totalDirectors,
    totalMovies,
    avgMoviesPerDirector
  };
};