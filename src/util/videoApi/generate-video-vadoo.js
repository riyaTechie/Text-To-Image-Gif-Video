// generateVideoFromText.js
import axios from 'axios';

const API_KEY = 'pdxzvxiJzQ4zuoXtzbHjlJZuXe-XlWBOVrwVflpvvao'; // Replace with your actual API key

export async function generateVideoFromText({
  topic = 'Explore the beauty of nature',
  voice = 'en_us_001',     // Replace with an available voice ID from the API
  theme = 'nature',        // Replace with a valid theme
  language = 'en',
  duration = 60            // Duration in seconds
}) {
  try {
    console.log("started generating video")

    const response = await axios.post(
      'https://viralapi.vadoo.tv/api/generate_video',
      {
        topic,
        voice,
        theme,
        language,
        duration
      },
      {
        headers: {
          'X-API-KEY': API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log("video response", response)

    if (response.data && response.data.video_url) {
      return response.data.video_url; // ✅ Direct URL to the generated video
    } else {
      console.error('Video creation response:', response.data);
      throw new Error('Video URL not found in the response');
    }
  } catch (error) {
    console.error('Error generating video:', error.message);
    throw error;
  }
}
