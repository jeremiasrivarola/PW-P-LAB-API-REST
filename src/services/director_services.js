import prisma from "../prisma/client.js";

export const getAllDirectors = async () => {
  return prisma.director.findMany();
};

export const getDirectorById = async (id) => {
  return prisma.director.findUnique({
    where: { id: Number(id) },
  });
};

export const createDirector = async (data) => {
  return prisma.director.create({ data });
};

export const updateDirector = async (id, data) => {
  return prisma.director.update({
    where: { id: Number(id) },
    data,
  });
};

export const deleteDirector = async (id) => {
  return prisma.director.delete({
    where: { id: Number(id) },
  });
};

export const getMoviesByDirector = async (directorId) => {
  const director = await prisma.director.findUnique({
    where: { id: Number(directorId) },
  });
  if (!director) throw new Error("Director não encontrado");

  return prisma.movie.findMany({
    where: { directorId: Number(directorId) },
  });
};