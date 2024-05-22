import { getImage } from "~/server/queries";

export default async function PhotoModal({
    params: { id: photoId },
}: {
    params: { id: string };
}) {
    if (Number.isNaN(Number(photoId))) { throw new Error("Invalid Photo Id"); }
    const image = await getImage(Number(photoId));
    return <div><img src={image.url} className="w-96 h-auto" /></div>;
}