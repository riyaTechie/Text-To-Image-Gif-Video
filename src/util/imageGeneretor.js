import axios from "axios";

export const imageGenerator = async (prompt, setMediaUrl) => {
    const payload = {
        prompt: prompt,
        output_format: "webp"
    };

    try {
        const response = await axios.postForm(
            `https://api.stability.ai/v2beta/stable-image/generate/ultra`,
            axios.toFormData(payload, new FormData()),
            {
                validateStatus: undefined,
                responseType: "arraybuffer",
                headers: {
                    Authorization: `Bearer YOUR_API_KEY`,
                    Accept: "image/*"
                }
            }
        );

        if (response.status === 200) {
            const blob = new Blob([response.data], { type: "image/webp" });
            const imageUrl = URL.createObjectURL(blob);
            setMediaUrl(imageUrl); // send it to MediaDisplay
        } else {
            console.error(`${response.status}: ${new TextDecoder().decode(response.data)}`);
        }
    } catch (error) {
        console.error("API Error:", error);
    }
};
