import prisma from "../prisma/client.js";

export const getAllDirectors = async () => {
  return await prisma.director.findMany();
};

export const getDirectorById = async (id) => {
  return await prisma.director.findUnique({
    where: { id: Number(id) }
  });
};

export const createDirector = async (data) => {
  return await prisma.director.create({ data });
};

export const updateDirector = async (id, data) => {
  return await prisma.director.update({
    where: { id: Number(id) },
    data
  });
};

export const deleteDirector = async (id) => {
  return await prisma.director.delete({
    where: { id: Number(id) }
  });
};

export const getMoviesByDirector = async (directorId) => {
  const director = await prisma.director.findUnique({
    where: { id: Number(directorId) }
  });
  if (!director) throw new Error("Director não encontrado");

  return await prisma.movie.findMany({
    where: { directorId: Number(directorId) }
  });
};