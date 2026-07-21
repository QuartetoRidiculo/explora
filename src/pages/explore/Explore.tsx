import { Search } from "lucide-react";
import DestinationCard from "../../components/DestinationCard";
import { useEffect, useState } from "react";

interface Address {
  id: number;
  street: string;
  number: string;
  district: string;
  zipCode: string;
  state: string;
}

interface Category {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
  state: string;
  description: string;
  address: Address;
}

export interface Destination {
  id: number;
  name: string;
  description: string;
  openingHours: string;
  averageRating: number;
  imgUrl: string;
  latitude: number;
  longitude: number;
  category: Category;
  city: City;
  address: Address;
}

export default function Explore() {
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch("http://localhost:8080/touristspot");

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        setDestinations(data);
        console.log(data);
      } catch (err) {
        console.error("Erro ao buscar destinos:", err);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <>
      <div className="px-32 py-16">
        <div className="p-6 rounded-2xl flex flex-col gap-2 font-playfair font-bold">
          <h1 className="text-4xl">Explorar Destinos</h1>

          <p className="text-gray-500">{destinations.length} destinos encontrados</p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 border rounded-xl border-gray-300 shadow-sm transition-all duration-300 focus-within:ring-2 focus-within:ring-gray-300">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 w-5 h-5" />

            <input
              className="w-full pl-10 p-2.5 rounded-xl text-gray-800"
              type="text"
              placeholder="Cidades, trilhas, praias..."
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className={`
              border border-gray-300 px-5 py-2.5 rounded-xl text-sm font-medium
              transition-all duration-300 hover:shadow-md hover:-translate-y-0.5
              ${
                mostrarFiltros
                  ? " text-white bg-emerald-500"
                  : "bg-white text-gray-700"
              }
            `}
            >
              Filtros
            </button>

            <select
              className="
              border border-gray-300 px-5 py-2.5 rounded-xl text-sm font-medium
              transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            >
              <option>Mais procurados</option>
              <option>Mais popular</option>
              <option>A-Z</option>
            </select>
          </div>
        </div>

        <div
          className={`
          overflow-hidden
          transition-all duration-500 ease-in-out
          ${mostrarFiltros ? "max-h-96 opacity-100 mt-6" : "max-h-0 opacity-0"}
        `}
        >
          <div className="p-5 border border-gray-200 rounded-2xl bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-5">Categorias</h2>

            <div className="flex flex-wrap gap-3">
              {[
                "Praias",
                "Cultura",
                "Gastronomia",
                "Aventura",
                "Ecoturismo",
                "Trilhas",
                "Histórico",
              ].map((categoria) => (
                <button
                  key={categoria}
                  className="bg-gray-100
                hover:bg-emerald-600
                hover:text-white
                  px-4 py-2
                  rounded-xl
                  text-m font-medium
                  transition-all duration-300
                  hover:-translate-y-0.5"
                >
                  {categoria}
                </button>
              ))}
            </div>
          </div>
        </div>

        {destinations.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-10">
            <p className="text-gray-500 text-lg">Nenhum destino encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
            {destinations.map((card) => (
              <DestinationCard key={card.id} destination={card as any} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
