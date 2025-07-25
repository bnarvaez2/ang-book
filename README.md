# Instrucciones de Instalación y Uso del Proyecto AngBooks

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu sistema:

- **Node.js** (versión 16 o superior): [Descargar Node.js](https://nodejs.org/)
- **Angular CLI** (versión 20.1.2 o superior): Instálalo globalmente con el siguiente comando:
  ```bash
  npm install -g @angular/cli
  ```

## Instalación

Sigue estos pasos para instalar el proyecto:

1. **Clona el repositorio**:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd ang-books
   ```

2. **Instala las dependencias**:
   Ejecuta el siguiente comando dentro del directorio del proyecto:
   ```bash
   npm install
   ```

## Uso

### Servidor de Desarrollo

Para iniciar el servidor de desarrollo, ejecuta:

```bash
ng serve
```

Luego, abre tu navegador y navega a `http://localhost:4200/`. La aplicación se recargará automáticamente cada vez que modifiques los archivos fuente.

### Pruebas Unitarias

Para ejecutar las pruebas unitarias con Karma, usa el siguiente comando:

```bash
ng test
```
