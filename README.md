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


## Screenshot

