"use client";

import { useRouter } from "next/navigation";
import { useUploadThing } from "../utils/uploadthing";
import { toast } from "sonner";
import { useEffect } from "react";


// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
    const $ut = useUploadThing(...args);

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const selectedFiles = Array.from(e.target.files);
        const result = await $ut.startUpload(selectedFiles);

        console.log("uploaded files", result);
        // TODO: persist result in state maybe?
    };

    return {
        inputProps: {
            onChange,
            multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
            accept: "image/*",
        },
        isUploading: $ut.isUploading,
    };
};

function UploadSVG() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
        </svg>
    )
}

function UploadSVGSpiner() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white"><circle className="spinner_S1WN" cx="4" cy="12" r="3" /><circle className="spinner_S1WN spinner_Km9P" cx="12" cy="12" r="3" /><circle className="spinner_S1WN spinner_JApP" cx="20" cy="12" r="3" /></svg>
    )
}

export default function SimpleUploadButton() {
    const router = useRouter();

    const { inputProps } = useUploadThingInputProps("imageUploader", {
        onClientUploadComplete() {
            toast.dismiss("upload-begin");
            toast("Upload Complete", { invert: true });
            router.refresh()
        },
        onUploadBegin() {
            toast(
                <div className="flex gap-2 text-white">
                    <UploadSVGSpiner /> Uploading...
                </div>, {
                duration: 100000,
                id: "upload-begin",
                invert: true
            },);
        },
    })
    return (
        <div>
            <label htmlFor="upload-button" className="cursor-pointer"><UploadSVG /></label>
            <input id="upload-button" type="file" className="sr-only" {...inputProps}></input>
        </div>
    )

};

