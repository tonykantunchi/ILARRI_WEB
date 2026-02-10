
# Ilarri - Plataforma de Acompañamiento Emocional y Psicología Clínica

Ilarri es una plataforma web diseñada para ofrecer acompañamiento emocional y servicios de psicología clínica. El objetivo es proporcionar herramientas para el bienestar emocional, incluyendo tests interactivos que evalúan niveles de riesgo o estados emocionales, y almacenan resultados de manera segura en una base de datos.
La aplicación consta de un frontend desarrollado en React para una interfaz intuitiva y atractiva, y un backend en Python con Flask para manejar la lógica de negocio, almacenamiento de datos y API RESTful. Utiliza PostgreSQL como base de datos para persistir los resultados de los tests.

## Tecnologías Usadas

**Frontend(React):** 
- React v19.1.1
- React Router para navegación
- Framer Motion para animaciones
- Lucide React para iconos
- Tailwind CSS para estilos
- Axios para llamadas API
- Librerías adicionales: React Icons, Web Vitals
**Backend(Flask):**
- Python 3.9+ con Flask
- SQLAlchemy para ORM y manejo de DB
- Psycopg2 para conexión con PostgreSQL
- FastAPI-like structure (aunque usa Flask, incluye Pydantic para schemas)
- CORS para integración con frontend
- Dotenv para variables de entorno
**Base de Datos:**
- PostgreSQL (configurada vía DATABASE_URL en .env)
**Otras Herramientas :**
- Venv para entornos virtuales en Python
- NPM para manejo de dependencias en frontend
- Tailwind CSS con PostCSS y Autoprefixer
## Requisitos Previos
### Frontend(React)
- Node.js v18.x (recomendado usar NVM)
- NPM o Yarn

### Backend(Python, Flask)
- Python 3.9+
- Pip
- Venv (entorno virtual)
- PostgreSQL instalado y corriendo (con una base de datos creada)
## Estructura del proyecto



```bash
Ilarri/

├── backend/

│   ├── database.py      

│   ├── main.py          

│   ├── models.py        

│   ├── requirements.txt 

│   └── schemas.py      

├── frontend/

│   ├── public/          

│   ├── src/

│   │   ├── components/ 

│   │   ├── data/     

│   │   ├── pages/       

│   │   ├── utils/       

│   │   ├── App.js       

│   │   ├── index.js   

│   │   └── styles.css  

│   └── package.json    

├── package.json         

├── postcss.config.js  

├── README.md           

└── tailwind.config.js  
```



## Instalación

### Clonar el Repositorio

```bash
  git clone https://github.com/tonykantunchi/ILARRI_WEB.git
   cd ILARRI\_WEB
```
### Configurar PostgreSQL (crear base de datos y usuario)
- Cambiar al usuario postgres (superusuario por defecto)
```bash
sudo -u postgres psql
```
- Crear el usuario 'soporte' con contraseña
```bash
CREATE USER soporte WITH PASSWORD '1234';
```
- Crear la base de datos 'ilarri' y asignar propietario
```bash
CREATE DATABASE ilarri OWNER soporte;
```
- Dar todos los privilegios al usuario sobre esa base de datos
```bash
GRANT ALL PRIVILEGES ON DATABASE ilarri TO soporte;;
```
## Configurar el Backend
- Crear y activar entorno virtual
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
```
- Instalar dependencias
```bash
cd backend
pip install -r requirements.txt
```
- Crea un archivo .env en la carpeta backend/ con:
```bash
DATABASE_URL=postgresql://soporte:1234@localhost:5432/ilarri
```
- Inicia el servidor backend:
```bash
python main.py
```
La API estará disponible en: http://localhost:8000/
## Configurar el Frontend
- Instalar dependencias
```bash
cd ../frontend
npm install
```
Frontend disponible en: http://localhost:3000
## Scripts útiles (desde la carpeta frontend/)
### Inicia servidor de desarrollo
```bash
npm start
```
### Compila para producción
```bash
npm run build
```
### Ejecuta pruebas (si están configuradas)
```bash
npm test
```
## Autores
- **github:** [Angel Antonio Kantun Chi](https://github.com/tonykantunchi)

- **github:** [Luis Angel Haas Aguayo](https://github.com/LuisHaasAguayo)
## Licencia

- Derechos reservados. Este proyecto no puede ser copiado ni distribuido sin el permiso explícito de los autores.
## Capturas
- **Inicio**
<img width="1259" height="900" alt="Captura de pantalla 2025-12-19 115105" src="https://github.com/user-attachments/assets/f5c80ba7-d87d-47e5-9879-b20021da8de6" />
<img width="567" height="240" alt="Inicio 2" src="https://github.com/user-attachments/assets/4444200c-5029-4f64-820a-2e792d8c8486" />

- **Evaluacion**

<img width="567" height="407" alt="Imagen1" src="https://github.com/user-attachments/assets/ef9cc40f-382a-42e6-878c-71ec3bdcc0c0" />

## Base de datos

- **Tabla rango**

<img width="576" height="240" alt="Rango" src="https://github.com/user-attachments/assets/b05085ef-9132-4572-bd89-776a004b4d65" />

- **Tabla principal**
<img width="576" height="159" alt="Basedatos" src="https://github.com/user-attachments/assets/0c697328-27e3-4d50-996e-4d4abab16e84" />

