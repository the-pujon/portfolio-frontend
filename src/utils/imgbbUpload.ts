//const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

//export async function uploadToImgBB(file: File): Promise<string> {
//  const formData = new FormData();
//  formData.append("image", file);

//  const response = await fetch(
//    `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
//    {
//      method: "POST",
//      body: formData,
//    }
//  );

//  if (!response.ok) {
//    throw new Error("Failed to upload image to ImgBB");
//  }

//  const data = await response.json();
//  return data.data.url;
//}

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

if (!IMGBB_API_KEY) {
  throw new Error(
    "ImgBB API key is not set. Please define NEXT_PUBLIC_IMGBB_API_KEY in your environment variables."
  );
}

export async function uploadToImgBB(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to upload image to ImgBB: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const data: { data: { url: string }; success: boolean } =
      await response.json();

    if (!data.success || !data.data?.url) {
      throw new Error("Unexpected response from ImgBB API.");
    }

    return data.data.url;
  } catch (error) {
    console.error("Error uploading image to ImgBB:", error);
    throw new Error("An error occurred while uploading the image.");
  }
}
