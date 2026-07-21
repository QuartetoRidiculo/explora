import { Heart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Title from "../Title";
import { useAuth } from "../../contexts/AuthContext";

export default function Navbar() {
  const isHome = useLocation().pathname === "/";

  const { isAuthenticated, logout } = useAuth();

  return (
    <nav
      className={`${isHome ? "fixed bg-transparent" : "sticky bg-white/80 shadow-sm"} top-0 left-0 right-0 z-50 backdrop-blur-xl h-20 flex items-center justify-around`}
    >
      <Title color={`${isHome ? "white" : "black"}`} />

      <ul
        className={`${isHome ? "text-white" : "text-gray-500"} flex items-center gap-6`}
      >
        <li>
          <Link
            to="/destinos"
            className="px-4 py-2 hover:bg-gray-200/50 rounded-2xl hover:text-black"
          >
            Explorar
          </Link>
        </li>
        <li>
          <Link
            to="/cidades"
            className="px-4 py-2 hover:bg-gray-200/50 rounded-2xl hover:text-black"
          >
            Cidades
          </Link>
        </li>
        <li>
          <Link
            to="/sobre"
            className="px-4 py-2 hover:bg-gray-200/50 rounded-2xl hover:text-black"
          >
            Sobre
          </Link>
        </li>
      </ul>

      <ul
        className={`${isHome ? "text-white" : "text-gray-500"} flex items-center gap-2`}
      >
        {isAuthenticated && (
          <>
            <li
              className={`${isHome ? "hover:bg-gray-100/40" : "hover:bg-gray-200/50"} p-2 rounded-full`}
            >
              <Link to="/favoritos">
                <Heart />
              </Link>
            </li>
            <li
              className={`${isHome ? "hover:bg-gray-100/40" : "hover:bg-gray-200/50"} p-2 rounded-full`}
            >
              <Link to="/perfil">
                <User />
              </Link>
            </li>
          </>
        )}

        {isAuthenticated ? (
          <li>
            <button
              onClick={async () => await logout()}
              className="px-5 py-3 bg-emerald-500 text-white hover:bg-emerald-500/90 rounded-4xl"
            >
              Sair
            </button>
          </li>
        ) : (
          <li>
            <Link
              to="/login"
              className="px-5 py-3 bg-emerald-500 text-white hover:bg-emerald-500/90 rounded-4xl"
            >
              Entrar
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
