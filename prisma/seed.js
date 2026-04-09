require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { withAccelerate } = require("@prisma/extension-accelerate");

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL
}).$extends(withAccelerate());

async function main() {
  const tarantino = await prisma.director.create({ data: { name: "Quentin Tarantino", birthYear: 1963 } });
  const villeneuve = await prisma.director.create({ data: { name: "Denis Villeneuve", birthYear: 1967 } });
  const nolan = await prisma.director.create({ data: { name: "Christopher Nolan", birthYear: 1970 } });
  const scorsese = await prisma.director.create({ data: { name: "Martin Scorsese", birthYear: 1942 } });

  await prisma.movie.createMany({
    data: [
      { title: "Pulp Fiction", releaseYear: 1994, directorId: tarantino.id },
      { title: "Kill Bill: Vol. 1", releaseYear: 2003, directorId: tarantino.id },
      { title: "Django Unchained", releaseYear: 2012, directorId: tarantino.id },
      { title: "Dune", releaseYear: 2021, directorId: villeneuve.id },
      { title: "Arrival", releaseYear: 2016, directorId: villeneuve.id },
      { title: "Blade Runner 2049", releaseYear: 2017, directorId: villeneuve.id },
      { title: "Inception", releaseYear: 2010, directorId: nolan.id },
      { title: "Interstellar", releaseYear: 2014, directorId: nolan.id },
      { title: "Oppenheimer", releaseYear: 2023, directorId: nolan.id },
      { title: "The Wolf of Wall Street", releaseYear: 2013, directorId: scorsese.id },
      { title: "Goodfellas", releaseYear: 1990, directorId: scorsese.id },
      { title: "Taxi Driver", releaseYear: 1976, directorId: scorsese.id }
    ]
  });

  console.log("🎬 Seed de filmes executada com sucesso!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });