import prisma from "../prisma/client.js";

export const getAllMovies = async ({ page = 1, limit = 10, sort }) => {
  const take = Number(limit);
  const skip = (Number(page) - 1) * take;

  const orderBy = sort ? { [sort]: 'asc' } : undefined;

  return await prisma.movie.findMany({
    skip,
    take,
    orderBy,
    include: { director: true }
  });
};

export const searchMoviesByTitle = async (title) => {
  return await prisma.movie.findMany({
    where: {
      title: {
        contains: title,
        mode: 'insensitive'
      }
    },
    include: { director: true }
  });
};

export const getMovieById = async (id) => {
  return await prisma.movie.findUnique({
    where: { id: Number(id) },
    include: { director: true }
  });
};

export const createMovie = async (data) => {
  // Valida campos obrigatórios
  const { title, releaseYear, directorId } = data;
  if (!title || !releaseYear || !directorId) {
    throw new Error("Campos obrigatórios: title, releaseYear, directorId");
  }

  // Valida existência do director
  const director = await prisma.director.findUnique({ where: { id: Number(directorId) } });
  if (!director) throw new Error("Director não encontrado");

  return await prisma.movie.create({ data });
};

export const updateMovie = async (id, data) => {
  // Se vier directorId, validar existência
  if (data.directorId) {
    const director = await prisma.director.findUnique({ where: { id: Number(data.directorId) } });
    if (!director) throw new Error("Director não encontrado");
  }

  return await prisma.movie.update({
    where: { id: Number(id) },
    data
  });
};

export const deleteMovie = async (id) => {
  return await prisma.movie.delete({
    where: { id: Number(id) }
  });
};