import React, { useEffect, useState } from "react";
import axios from "axios";

function UrlList() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/all`);
      setUrls(res.data);
    } catch (err) {
      console.error("Error fetching URLs:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/delete/${id}`);
      setUrls(urls.filter((url) => url._id !== id));
    } catch (err) {
      console.error("Error deleting URL:", err);
    }
  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        All Shortened URLs
      </h2>

      {urls.length === 0 ? (
        <p className="text-center text-gray-500">No URLs found yet.</p>
      ) : (
        <ul className="space-y-4">
          {urls.map((url) => (
            <li
              key={url._id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition flex justify-between items-start"
            >
              <div>
                <a
                  href={`${process.env.REACT_APP_API_URL}/api/${url.shortCode}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 font-medium hover:underline break-all"
                >
                  {`${process.env.REACT_APP_API_URL}/api/${url.shortCode}`}
                </a>

                <p className="text-gray-700 mt-1 break-all">
                  → <span className="text-gray-900">{url.longUrl}</span>
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Visited{" "}
                  <span className="font-semibold text-gray-800">
                    {url.clicks}
                  </span>{" "}
                  times
                </p>
              </div>
              
              <button
                onClick={() => handleDelete(url._id)}
                className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UrlList;
