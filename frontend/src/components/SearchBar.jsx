import React, { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SearchBar({ onSearch, loading = false }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) onSearch(city.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center">
      <div className="flex items-center w-full max-w-2xl bg-white/20 rounded-full backdrop-blur-md border border-white/30 shadow-md overflow-hidden transition hover:shadow-xl">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for a city..."
          className="flex-1 px-6 py-4 bg-transparent text-white placeholder-white/60 outline-none text-lg font-medium"
          disabled={loading}
        />
        <Button
          type="submit"
          disabled={loading || !city.trim()}
          variant="ghost"
          size="lg"
          className="text-white hover:bg-white/20 disabled:opacity-50 px-6"
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Search className="w-6 h-6" />}
        </Button>
      </div>
    </form>
  );
}
