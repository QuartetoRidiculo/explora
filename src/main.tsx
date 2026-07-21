import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ProfilePage from "./pages/ProfilePage.tsx";
import RootLayout from "./components/layout/RootLayout.tsx";
import FavoritesPage from "./pages/FavoritesPage.tsx";
import DestinationDetailPage from "./pages/DestinationDetailPage.tsx";
import AdminDestinationsPage from "./pages/admin/AdminDestinationsPage.tsx";
import AdminRootLayout from "./components/layout/AdminRootLayout.tsx";
import AdminCitiesPage from "./pages/admin/AdminCitiesPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import AdminBusinessPage from "./pages/admin/AdminBusinessPage.tsx";
import AdminCategoriesPage from "./pages/admin/AdminCategoriesPage.tsx";
import Cities from "./pages/cities/Cities.tsx";
import CitiesInfo from "./pages/cities/CitiesInfo.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import Explore from "./pages/explore/Explore.tsx";
import About from "./pages/About.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ProtectedRoute } from "./routes/ProtectedRoute.tsx";
import { AdminRoute } from "./routes/AdminRoute.tsx";
import { UserRoute } from "./routes/UserRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthPage />,
  },
  {
    element: <AdminRoute />,
    children: [
      {
        path: "/admin",
        element: <AdminRootLayout />,
        children: [
          {
            path: "",
            element: <AdminCitiesPage />,
          },
          {
            path: "destinos",
            element: <AdminDestinationsPage />,
          },
          {
            path: "comercios",
            element: <AdminBusinessPage />,
          },
          {
            path: "categorias",
            element: <AdminCategoriesPage />,
          },
        ],
      },
    ],
  },
  {
    element: <UserRoute />,
    children: [
      {
        path: "/",
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <App />,
          },
          {
            path: "sobre",
            element: <About />,
          },
          {
            path: "cidades",
            element: <Cities />,
          },
          {
            path: "cidades/:id",
            element: <CitiesInfo />,
          },
          {
            path: "perfil",
            element: (
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            ),
          },
          {
            path: "favoritos",
            element: (
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "destinos",
            element: <Explore />,
          },
          {
            path: "destino/:id",
            element: <DestinationDetailPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
