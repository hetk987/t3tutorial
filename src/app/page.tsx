import { SignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();
  return (<div className="flex flex-wrap justify-center gap-4 p-4">
    {images.map((image) => (
      <div key={image.id} className="flex w-48 h-48 flex-col">
        <Link href={`/img/${image.id}`}>
          <Image
            className="hover:bg-sky-500/50"
            src={image.url}
            style={{ objectFit: "contain" }}
            width={192}
            height={192}
            alt={image.name} />
        </Link>
        <div>{image.name}</div>
      </div>
    ))}
  </div>);
}
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
  return (
    <main className="">
      <SignedOut>
        <div className="w-full h-full text-2xl text-center">Please sign in above</div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
