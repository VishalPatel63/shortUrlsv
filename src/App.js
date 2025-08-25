import React from "react";
import UrlForm from "./components/UrlForm";
import UrlList from "./components/UrlList";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex flex-col items-center py-12 px-4">
    
      <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-10 text-center flex items-center gap-2">
         URL Shortener    
          
      </h1>

   
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6 md:p-10 space-y-10 border border-gray-100">
        <UrlForm />
        <UrlList />
      </div>
    </div>
  );
}

export default App;
