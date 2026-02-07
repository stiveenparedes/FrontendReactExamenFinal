# Examen Final – Frontend Web de Películas (React + Vite + Material UI)
### Datos personales: 
    - Nombres: Stiveen Paredes y Mateo Rodríguez
    - Carrera: Ingenieria en Software
## Objetivo
Desarrollar el frontend de una aplicación web de películas utilizando React, Vite y Material UI, consumiendo una API REST creada en Django.  
La aplicación permite gestionar películas y directores, con autenticación, rutas protegidas y manejo de formularios.

---

## Requisitos previos
- Node.js y npm instalados  
- Editor de código (recomendado: VS Code)  
- Navegador actualizado (recomendado: Chrome)  
- React usando Vite  

---

## Requisitos técnicos
- React + Vite  
- Material UI (`@mui/material`, `@emotion/react`, `@emotion/styled`)  
- Axios para peticiones HTTP  
- React Router para navegación  
- Autenticación OAuth con Django  

---

## Estructura del proyecto

```
/public
  logo.png
  pelis.jpg
  vite.svg

/src
  /components
    header.css
    Header.jsx
    MovieCard.jsx
    Spinner.jsx

  /data
    movies.js

  /pages
    DirectorCard.jsx
    DirectorDetail.jsx
    DirectorForm.jsx
    DirectorList.jsx
    LoginPage.jsx
    MovieDetail.jsx
    MovieForm.jsx
    MovieList.jsx

  /services
    api.js
    authService.js
    directorService.js
    movieService.js

  App.jsx
  main.jsx

.env
index.html
package.json
vite.config.js
README.md
```

### Variables de entorno (.env)
```
VITE_API_BASE_URL=http://localhost:8000
VITE_API_MEDIA_URL=${VITE_API_BASE_URL}/media/
VITE_API_CLIENT_ID=tu_client_id
VITE_API_CLIENT_SECRET=tu_client_secret
```

## Instalación del proyecto

1. **Clonar el repositorio**
2. Abrir en VS Code la carpeta de tu repositorio clonado
3. Instalar las dependencias base:
   ```bash
   npm install
   ```
4. Instalar Material UI y sus dependencias:
   ```bash
   npm install @mui/material @emotion/react @emotion/styled
   ```
5. Instalar Axios (necesario desde Laboratorio 10):
   ```bash
   npm install axios
   ```
6. Instalar React Router (necesario desde Laboratorio 11):
   ```bash
   npm install react-router-dom
   ```
### Comandos útiles
- Ejecutar el servidor de desarrollo
    ```bash
    npm run dev
    ```
- Comprobar versión de dependencias
    ```bash
    npm list
    ```
- Limpiar dependencias
    ```bash
    rm -rf node_modules
    npm install
    ```

### Comandos git
- Verificar los archivos modificados
    ```bash
    git status
    ```
- Agregar archivos al área de preparación
    ```bash
    git add .
    ```
- Realizar un commit
    ```bash
    git commit -m "Examen Final Frontend Finalizado"
    ```
- Enviar los cambios a github
    ```bash
    git push
    ```