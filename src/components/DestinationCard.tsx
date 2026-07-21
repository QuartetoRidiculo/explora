import { Heart, MapPin, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import type { Destination } from "../pages/explore/Explore";

export default function DestinationCard({
  destination,
}: {
  destination: Destination;
}) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [favorite, setFavorite] = useState(false);

  async function handleFavorite() {
    if (!isAuthenticated) {
      return navigate("/login");
    }

    setFavorite((prev) => !prev);
  }

  return (
    <Link to={`/destino/${destination.id}`}>
      <div className="group rounded-2xl overflow-hidden shadow-md max-w-sm w-full bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <div className="relative overflow-hidden h-64">
          <img
            src={destination.imgUrl}
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <button
            onClick={(e) => {
              e.preventDefault();

              handleFavorite();
            }}
            className="absolute top-4 right-4 bg-white/70 backdrop-blur-sm p-2 rounded-full transition hover:scale-110 cursor-pointer"
          >
            <Heart
              className={`w-5 h-5 ${favorite ? "fill-red-500 text-red-500" : ""}`}
            />
          </button>
        </div>
        <div className="p-5 flex flex-col gap-2">
          <h3 className="font-bold text-lg text-gray-800 group-hover:text-emerald-700 font-playfair">
            {destination.name}
          </h3>

          <p className="text-gray-500 flex items-center gap-1">
            <MapPin className="w-4 h-4" /> {destination.city.name} -{" "}
            {destination.city.state}
          </p>

          <div className="flex gap-4 items-center">
            <span className="flex gap-2 items-center font-bold text-gray-800">
              <Star className="text-yellow-500 fill-yellow-500 w-5 h-5" />
              {destination.averageRating}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
