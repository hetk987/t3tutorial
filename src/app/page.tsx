import { db } from "~/server/db";

export const dynamic = "force-dynamic";
const mcokURLs = [
  "https://utfs.io/f/b7eb508b-b2dc-452d-bcfe-135a8a986680-ueb5b5.jpg",
  "https://utfs.io/f/18ae7e45-520f-40b7-8be2-19ac124f6065-9mlv9c.webp",
  "https://utfs.io/f/73e45415-3d24-43db-bd12-bf9c3612676e-bz8spu.jpg",
  "https://utfs.io/f/7916b9a7-77ba-4956-b905-54250999f574-kp8oao.jpg"
];

const mockImages = mcokURLs.map((url, index) => ({
  id: index + 1,
  url,
}));
export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...images, ...images, ...images].map((image, index) => (
          <div key={image.id + "-" + index} className="flex w-48 flex-col">
            <img src={image.url} />
            <div>{image.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
