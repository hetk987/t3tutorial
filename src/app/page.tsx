import Link from "next/link";
import { db } from "~/server/db";


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
  const posts = await db.query.posts.findMany();
  console.log(posts);
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
        {[...mockImages, ...mockImages, ...mockImages].map((image, index) => (
          <div key={image.id + "-" + index} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
    </main>
  );
}
