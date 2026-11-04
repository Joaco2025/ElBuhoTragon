import { StrictMode, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PASAPORTE_ACTIVO } from "./config";
import AppShell from "./components/layout/AppShell";
import Home from "./pages/Home.jsx";
import "./index.css";

// El inicio va en el bundle principal; el resto se descarga al visitarlo
const PlantillaCafeteria = lazy(() => import("./pages/PlantillaCafeteria.jsx"));
const Facultad = lazy(() => import("./pages/Facultad.jsx"));
const Cafeterias = lazy(() => import("./pages/Cafeterias.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Registro = lazy(() => import("./pages/Registro.jsx"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard.jsx"));
const Terminos = lazy(() => import("./pages/Terminos.jsx"));
const Privacidad = lazy(() => import("./pages/Privacidad.jsx"));
const Contacto = lazy(() => import("./pages/Contacto.jsx"));
const NoEncontrada = lazy(() => import("./pages/NoEncontrada.jsx"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Home />} />
          {/* Pasaporte Tragón: función experimental (ver PASAPORTE_ACTIVO en config.js) */}
          <Route path="/cafeterias" element={PASAPORTE_ACTIVO ? <Cafeterias /> : <Navigate to="/" replace />} />
          <Route path="/cafeterias/:id" element={<PlantillaCafeteria />} />
          <Route path="/facultad" element={<Facultad />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<NoEncontrada />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
