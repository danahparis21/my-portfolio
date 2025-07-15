import React from "react";

function getYouTubeID(url) {
  const match = url.match(
    /(?:youtube\.com.*(?:\/|v=)|youtu\.be\/)([^"&?\/ ]{11})/
  );
  return match ? match[1] : "";
}

function TestVideo() {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        YouTube Embed Test
      </h2>
      <div className="relative w-full pb-[56.25%]">
        <div className="absolute inset-0">
          <iframe
            src={`https://www.youtube.com/embed/${getYouTubeID(
              "https://www.youtube.com/watch?v=cw_VLfp3KDY"
            )}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="w-full h-full rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default TestVideo;
