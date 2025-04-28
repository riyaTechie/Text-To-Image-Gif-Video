import { GoogleGenAI, Modality } from "@google/genai";
import { toast } from "react-toastify";

const ai = new GoogleGenAI({
    // apiKey: "AIzaSyAtDgjzMB3ch6dPTa6_emWYGeENT_ARqi8", //anya its me
    apiKey: "AIzaSyB4pnuraxzjDCzocb_9Ycn1dX6K8qBpDEc", // mohit bunty
    // apiKey :"AIzaSyCToaDCG11UpgD8oyP7_gloKGZm3Ck5_cA", // samruddhi
    // apiKey :"AIzaSyBWrXGsMM2G_1cT_bdLtwXM1EAxZLX5x-k", //anya 2nd gojo
});
export async function generateImage(prompt) {
    try {

        console.log("Generating images...");

        const imagePromises = Array.from({ length: 4 }, () =>
            ai.models.generateContent({
                model: "gemini-2.0-flash-exp-image-generation",
                contents: [{ role: "user", parts: [{ text: prompt }] }],
                config: {
                    responseModalities: [Modality.TEXT, Modality.IMAGE],
                },
            })
        );

        const responses = await Promise.all(imagePromises);

        const imageUrls = [];
        const finishReasons = new Set();

        for (const response of responses) {
            const candidate = response?.candidates?.[0];
            const reason = candidate?.finishReason;
            finishReasons.add(reason);

            if (reason !== "STOP") continue;

            const parts = candidate?.content?.parts;
            if (!Array.isArray(parts)) continue;

            for (const part of parts) {
                if (part?.inlineData?.data) {
                    const imageData = part.inlineData.data;
                    const byteCharacters = atob(imageData);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], { type: "image/png" });
                    const imageUrl = URL.createObjectURL(blob);
                    imageUrls.push(imageUrl);
                }
            }
        }

        for (const reason of finishReasons) {
            switch (reason) {
                case "MAX_TOKENS":
                    console.log("⚠️ Generation stopped due to reaching max tokens.");
                    toast.warn("Generation stopped due to reaching max tokens.");
                    break;
                case "SAFETY":
                    console.log("🚫 Generation blocked due to safety filters (text safety).");
                    toast.error(" Generation blocked due to safety filters (text safety).");
                    break;
                case "IMAGE_SAFETY":
                    console.log("🚫 Image generation blocked due to image safety filters.");
                    toast.error(" Image generation blocked due to image safety filters.");
                    break;
                case "OTHER":
                    console.log("❓ Generation stopped for an unspecified reason (OTHER).");
                    toast.error(" Generation stopped for an unspecified reason.");
                    break;
                case "ERROR":
                    console.log("❌ Generation failed due to an error.");
                    toast.error("❌ Generation failed due to an error.");
                    break;
                case undefined:
                    console.log("⚠️ No finish reason returned.");
                    toast.warn("⚠️Generation stopped due to unknown reason.");
                    break;
            }
        }

        return imageUrls;
    } catch (error) {
        console.log("error generating the image due to API call");

    }
}
