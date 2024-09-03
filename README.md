![wordscript](https://github.com/user-attachments/assets/aa391c52-9b39-4237-a5e8-94f612d66fde)


WordEdit es una aplicación construida con Vite y React que permite generar archivos de Word (.docx) a partir de archivos CSV. Esta herramienta es ideal para automatizar la creación de documentos personalizados basados en datos estructurados.

## Características

- **Importación de CSV**: Carga tus archivos CSV para comenzar.
- **Generación de Documentos Word**: Crea archivos `.docx` personalizados basados en los datos del CSV importado.
- **Interfaz de Usuario Intuitiva**: Diseñada con React para una experiencia de usuario amigable y rápida.
  
## Requisitos

- **Node.js** (v14 o superior)
- **Bun** (v0.5 o superior)

## Instalación

Sigue estos pasos para instalar y ejecutar la aplicación localmente.

1. **Clona este repositorio:**

   ```bash
   git clone https://github.com/twulfz/wordedit.git
   cd wordedit
   ```

2. **Instala las dependencias utilizando Bun:**

   ```bash
   bun install
   ```

## Ejecución de la Aplicación

Para iniciar la aplicación en modo de desarrollo, ejecuta el siguiente comando:

```bash
bun run dev
```

Esto abrirá la aplicación en `http://localhost:3000` por defecto.

## Construcción para Producción

Para construir la aplicación para producción, ejecuta:

```bash
bun run build
```

Los archivos generados estarán en la carpeta `dist`.

## Uso

1. **Carga un archivo CSV** utilizando el botón de carga de archivos.
2. **Configura las opciones de exportación** según tus necesidades.
3. **Genera y descarga el archivo Word** directamente desde la aplicación.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, crea un *fork* del repositorio y envía tus *pull requests*.

## Licencia

Este proyecto está bajo la Licencia MIT. Para más detalles, consulta el archivo [LICENSE](LICENSE).
