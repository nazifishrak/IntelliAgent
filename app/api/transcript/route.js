import { YoutubeTranscript } from "youtube-transcript";

import { decode } from "he";

export async function POST(req) {
  try {
    const body = await req.json();

    const { videoUrl } = body;

    if (!videoUrl) {
      return new Response(
        JSON.stringify({ error: "Missing videoUrl in request body" }),
        { status: 400 }
      );
    }

    const videoId = extractVideoId(videoUrl);

    if (!videoId) {
      return new Response(JSON.stringify({ error: "Invalid YouTube URL" }), {
        status: 400,
      });
    }

    console.log(`Fetching transcript for video ID: ${videoId}`);

    const transcript = await YoutubeTranscript.fetchTranscript(videoId);

    const transcriptText = transcript
      .map((item) => decode(item.text))
      .join(" ");

    console.log("Transcript fetched and decoded successfully");

    return new Response(JSON.stringify({ transcript: transcriptText }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in getTranscript API:", error);

    return new Response(
      JSON.stringify({
        error: `Failed to fetch transcript: ${error.message}`,

        details: error.response ? error.response.data : null,
      }),
      { status: 500 }
    );
  }
}

function extractVideoId(url) {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}
