import { getImage } from "~/server/queries";
import { Modal } from "./modal";
import FullPageImageView from "~/components/full-image-page";

export default function PhotoModal({
    params: { id: photoId },
}: {
    params: { id: string };
}) {
    if (Number.isNaN(Number(photoId))) { throw new Error("Invalid Photo Id"); }
    return (
        < Modal >
            <FullPageImageView id={Number(photoId)} />
        </Modal >);
}