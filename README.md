Ilarri - Plataforma de Acompañamiento Emocional y Psicología Clínica
Descripción
Ilarri es una plataforma web diseñada para ofrecer acompañamiento emocional y servicios de psicología clínica. El objetivo es proporcionar herramientas para el bienestar emocional, incluyendo tests interactivos que evalúan niveles de riesgo o estados emocionales, y almacenan resultados de manera segura en una base de datos.
La aplicación consta de un frontend desarrollado en React para una interfaz intuitiva y atractiva, y un backend en Python con Flask para manejar la lógica de negocio, almacenamiento de datos y API RESTful. Utiliza PostgreSQL como base de datos para persistir los resultados de los tests.
Funcionalidades Principales

Tests Interactivos: Un chatbot o formulario guiado para realizar evaluaciones emocionales (ej. cálculo de promedios, niveles de riesgo con colores y mensajes personalizados).
Almacenamiento de Resultados: Registra resultados en la base de datos con IDs únicos y timestamps.
Páginas Principales: Inicio, Sobre Nosotros, Servicios, Contacto, Consentimiento y Resultados.
Protección de Rutas: Requiere consentimiento para acceder a ciertas secciones sensibles.
Efectos Visuales: Fondo dinámico con auras y gradientes para una experiencia calming.

Tecnologías Usadas
Frontend (React)

React v19.1.1
React Router para navegación
Framer Motion para animaciones
Lucide React para iconos
Tailwind CSS para estilos
Axios para llamadas API
Librerías adicionales: React Icons, Web Vitals

Backend (Flask)

Python 3.9+ con Flask
SQLAlchemy para ORM y manejo de DB
Psycopg2 para conexión con PostgreSQL
FastAPI-like structure (aunque usa Flask, incluye Pydantic para schemas)
CORS para integración con frontend
Dotenv para variables de entorno

Base de Datos

PostgreSQL (configurada vía DATABASE\_URL en .env)

Otras Herramientas

Venv para entornos virtuales en Python
NPM para manejo de dependencias en frontend
Tailwind CSS con PostCSS y Autoprefixer

Requisitos Previos
Frontend

Node.js v18.x (recomendado usar NVM)
NPM o Yarn

Backend

Python 3.9+
Pip
Venv (entorno virtual)
PostgreSQL instalado y corriendo (con una base de datos creada)

Instalación

1. Clonar el Repositorio
   https://github.com/tonykantunchi/ILARRI\_WEB.git
   cd ILARRI\_WEB
2. Configurar el Backend
   cd backend
   python3 -m venv .venv
   source .venv/bin/activate  # En Linux/Mac, o .venv\\Scripts\\activate en Windows
   pip install -r requirements.txt

Crea un archivo .env en backend/ con:

DATABASE\_URL=postgresql://usuario:password@localhost/nombre\_db

Inicia el servidor backend:

python main.py

3\. Configurar el Frontend

cd ../frontend

npm install

Inicia el servidor de desarrollo:

npm start

El frontend estará disponible en http://localhost:3000.

4\. Scripts Útiles (desde frontend/)



npm start: Inicia el servidor de desarrollo.

npm run build: Compila para producción.

npm test: Ejecuta pruebas unitarias.

npm run eject: Expone configuraciones avanzadas (irreversible).



Uso



Abre el navegador y visita http://localhost:3000.

Navega a las páginas: Inicio (/), Sobre (/about), Servicios (/services), Contacto (/contact).

Para el test: Accede a /consent para dar consentimiento, luego serás redirigido a /real-test.

El test interactúa vía un chatbot, calcula promedios y envía resultados al backend vía API.

Los resultados se almacenan y pueden listarse vía GET /resultados.



Endpoints API (Backend)



POST /resultados: Crea un nuevo resultado (requiere body con promedio, nivel, color, mensaje).

GET /resultados: Lista los últimos 20 resultados.

Ilarri/

├── backend/

│   ├── database.py      # Configuración de DB

│   ├── main.py          # App Flask principal

│   ├── models.py        # Modelos SQLAlchemy

│   ├── requirements.txt # Dependencias Python

│   └── schemas.py       # Schemas Pydantic

├── frontend/

│   ├── public/          # Archivos estáticos (index.html, manifest.json, etc.)

│   ├── src/

│   │   ├── components/  # Componentes reutilizables (Header, Footer, Chatbot, etc.)

│   │   ├── data/        # Datos estáticos (ej. questions.js)

│   │   ├── pages/       # Páginas principales (Home, About, Test, etc.)

│   │   ├── utils/       # Utilidades (ej. risk.js)

│   │   ├── App.js       # Ruta principal y enrutamiento

│   │   ├── index.js     # Entry point

│   │   └── styles.css   # Estilos globales

│   └── package.json     # Dependencias NPM

├── package.json         # (Raíz, si aplica)

├── postcss.config.js    # Config PostCSS

├── README.md            # Este archivo

└── tailwind.config.js   # Config Tailwind

Autores

Luis Angel Haas Aguayo

Angel Antonio Kantun Chi

Licencia

Derechos reservados. Este proyecto no puede ser copiado ni distribuido sin el permiso explícito de los autores.

