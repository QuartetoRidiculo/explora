import { Heart, MapPin, Settings, Star } from "lucide-react";
import DestinationCard from "../components/DestinationCard";
import { destinations } from "../lib/mockData";
import { useAuth } from "../contexts/AuthContext";

export default function ProfilePage() {
  const {user} = useAuth();

  return (
    <>
      <div className="p-6 mt">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <div className=" h-20 w-20 bg-emerald-500 rounded-full"></div>
            <div>
              <h1 className="text-xl font-bold ">{user?.firstName + " " + user?.lastName}</h1>
            </div>
          </div>
          <div className="flex shadow-md px-2 rounded-2xl items-center hover:bg-white">
            <Settings className="text-emerald-500" />
            <button className="px-4 py-1 w-35 cursor-pointer ">
              Editar perfil
            </button>
          </div>
        </div>
        <div className="flex gap-4 justify-center mt-8">
          <div className="flex  w-50 h-30 bg-white flex-col items-center gap-3 shadow-md p-4 rounded-xl">
            <MapPin className="text-emerald-500" />
            <h2>23</h2>
            <p>Locais visitados</p>
          </div>

          <div className="flex w-50 h-30  bg-white flex-col items-center gap-3 shadow-md p-4 rounded-xl">
            <Heart className="text-emerald-500" />
            <h2>4</h2>
            <p>Favoritos</p>
          </div>

          <div className="flex w-50 h-30  bg-white flex-col items-center gap-3 shadow-md p-4 rounded-xl">
            <Star className="text-emerald-500" />
            <h2>8</h2>
            <h2>Avaliações</h2>
          </div>
        </div>

        <div className="flex w-min p-2 mt-8 gap-4 shadow bg-gray-100 rounded-xl items-center">
          <div className="flex items-center gap-4 p-2 w-45 h-8 rounded-xl cursor-pointer hover:bg-white">
            <Heart />
            <h2>Favoritos</h2>
          </div>

          <div className="flex items-center gap-4 p-2 w-45  h-8 rounded-xl cursor-pointer hover:bg-white">
            <Star />
            <h2>Avaliações</h2>
          </div>
        </div>

        <div className="flex gap-4 pt-8 mt-6">
          {destinations.slice(0, 4).map((destination) => (
            <DestinationCard destination={destination} />
          ))}
        </div>
      </div>
    </>
  );
}
