# Series Tracker — Frontend

Cliente web para el Series Tracker, construido con HTML, CSS y JavaScript vanilla.

## Links
- Frontend en producción: https://bespoke-sherbet-009345.netlify.app
- Repositorio del backend: https://github.com/Gotkissss/series-tracker-backend.git

## Stack
- HTML5, CSS3, JavaScript ES6+ (módulos nativos)
- Sin frameworks ni librerías externas
- Consume la API con fetch()

## Correr localmente

1. Clonar el repositorio
2. Desde la carpeta del proyecto:

```bash
npx serve .
```

3. Abrir `http://localhost:3000`

**Nota:** No abrir index.html directo en el navegador — los módulos JS requieren servidor HTTP.

## Funcionalidades

- Listado de series en grid estilo Netflix
- Crear, editar y eliminar series
- Subir imagen de portada por serie
- Búsqueda en tiempo real por nombre
- Ordenamiento por título, rating, fecha, episodios
- Paginación
- Exportar lista a CSV (generado manualmente en JavaScript sin librerías)

## Challenges implementados

- Exportar a CSV generado desde JavaScript puro con Blob
- Diseño visual de calidad con tema oscuro morado

## Reflexión 
Trabajar con JavaScript vanilla fue más complicado de lo que esperaba, sobre todo si lo comparo con usar un framework. Tener que manejar el estado, el DOM y las llamadas a la API por mi cuenta me ayudó a entender mejor qué está pasando en cada momento.
Separar el código en tres archivos (api.js, ui.js y app.js) hizo que todo fuera más ordenado y fácil de mantener.
Lo que más aprendí fue sobre CORS. Hay que entender por qué el navegador bloquea cosas al venir de ciertos orígenes. 
Para proyectos pequeños sí volvería a usar fetch() así, pero si el proyecto crece, probablemente optaría por un framework.

## Screenshot
<img width="1866" height="912" alt="image" src="https://github.com/user-attachments/assets/acc9eabb-1161-4fab-8abb-3c92ec1f4a26" />

