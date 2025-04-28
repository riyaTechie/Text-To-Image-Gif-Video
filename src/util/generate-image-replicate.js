import Replicate from "replicate";

// Utility function to generate an image from text using Replicate API
export const generateImage = async (prompt) => {
  try {
    const replicate = new Replicate({
      auth: 'YOUR_REPLICATE_API_TOKEN', // Replace with your actual token
    });

    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: { prompt },
      }
    );
    console.log("output", output)

    const imageUrl = output[0]; // Get image URL
    console.log("imageUrl", imageUrl)

    return imageUrl;

  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};
