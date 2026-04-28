// src/utils/api.js
// La URL base de la API se lee desde la variable de entorno.
// En local:      http://localhost:8000   (definida en .env.local)
// En producción: https://api.tudominio.com  (definida en .env.prod)

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export default BASE_URL;
