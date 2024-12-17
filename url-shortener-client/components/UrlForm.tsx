
"use client"
import { useState } from "react";
import axios from "axios";

export default function UrlForm() {
  const [inputUrlOriginal, setInputUrlOriginal] = useState<string>("");
  const [inputUrlShort, setInputUrlShort] = useState<string>("");
  const [resultUrlOriginal, setResultUrlOriginal] = useState<string>("");
  const [resultUrlShort , setResultUrlShort] = useState<string>("");
  const handleShorten = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/shorten", {
        url: inputUrlOriginal,
      });
      setResultUrlOriginal(response.data.shortUrl);
    } catch (error: any) {
      if (error.response) {
     
        alert(`Error shortening URL: ${error.response.data.message} (Status: ${error.response.status})`);
      } else if (error.request) {
    
        alert("No response from the server. Please try again later.");
      } else {

        alert("An unexpected error occurred: " + error.message);
      }
    }
  };
  

  const handleExpand = async () => {
    try {
      const shortId = resultUrlOriginal.split("/").pop();
      const response = await axios.post("http://localhost:3001/api/expand", {
        shortUrl:resultUrlOriginal
      });
      setResultUrlShort(response.data.originalUrl);
    } catch (error) {
      alert("Error expanding URL: " + (error as Error).message);
    }
  };

  const handleBrowse = () => {
    if (resultUrlOriginal) {
      window.open(resultUrlOriginal, "_blank");
    } else {
      alert("No URL to browse.");
    }
  };

  return (
    <div className="flex flex-col mx-auto justify-center items-center gap-3 w-1/3">
      <h1>URL Shortener</h1>
      <input
      className="bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        type="text"
        value={inputUrlOriginal}
        onChange={(e) => setInputUrlOriginal(e.target.value)}
        placeholder="Enter URL Original"
      />
      <button  type="button"  className="w-36  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"onClick={handleShorten}>Shorten</button>
  
      <input
      className="bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        type="text"
        value={inputUrlShort}
        onChange={(e) => setInputUrlShort(e.target.value)}
        placeholder="Enter URL Short"
      />
          <button className="w-36  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleExpand}>Expand</button>
      <button className="w-36  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleBrowse}>Browse</button>
      {resultUrlOriginal && (
        <p>
          Result url short: <a href={resultUrlOriginal} target="_blank" rel="noopener noreferrer">{resultUrlOriginal}</a>
        </p>
      )}
            {resultUrlShort && (
        <p>
           Result url original: <a href={resultUrlShort} target="_blank" rel="noopener noreferrer">{resultUrlShort}</a>
        </p>
      )}
    </div>
  );
}
