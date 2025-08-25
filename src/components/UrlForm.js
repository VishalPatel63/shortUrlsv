import React, { useState } from "react";
import axios from "axios";

function UrlForm() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/shorten`,
      { longUrl }
    );
    setShortUrl(
      `${process.env.REACT_APP_BASE_URL}/api/${res.data.shortCode}`
    );
  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
         Shorten Your Link
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center gap-3"
      >
        <input
          type="text"
          placeholder="Paste long URL here..."
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="w-full flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
        />
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Shorten
        </button>
      </form>

      {shortUrl && (
        <div className="mt-6 text-center bg-indigo-50 p-4 rounded-lg">
          <p className="text-gray-700 font-medium">Your Short URL:</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noreferrer"
            className="block text-indigo-600 font-semibold hover:underline break-all mt-1"
          >
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default UrlForm;
