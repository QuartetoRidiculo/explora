import { Link, useLocation } from "react-router-dom";
import { Building2, Compass, MapPin, Store, Tag } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export const adminLinks = [
  {
    name: "Cidades",
    path: "",
    icon: Building2,
  },
  {
    name: "Pontos Turísticos",
    path: "destinos",
    icon: MapPin,
  },
  {
    name: "Comércios",
    path: "comercios",
    icon: Store,
  },
  {
    name: "Categorias",
    path: "categorias",
    icon: Tag,
  },
];

export default function AdminNavbar() {
  const pathname = useLocation().pathname.split("/")[2];
  const { logout } = useAuth();

  return (
    <header className="px-16 py-4 space-y-8">
      <div className="flex items-baseline gap-1">
        <div className="flex items-baseline gap-2">
          <div className="w-9 h-9 bg-linear-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-heading font-bold font-playfair text-black">
            Explora<span className="uppercase text-emerald-500">pb</span>
          </h1>
        </div>
        <span className="text-gray-500 text-sm">Admin</span>
      </div>
      <nav>
        <ul className="flex items-center gap-16">
          {adminLinks.map((link) => (
            <li>
              <Link
                to={link.path}
                className={`${pathname === link.path ? "border-b-2 border-emerald-500 text-emerald-500" : "text-gray-500"} flex items-center gap-2 hover:text-emerald-500 duration-150 pb-4`}
              >
                <link.icon />
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <button onClick={() => logout()} className="cursor-pointer">Sair</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
