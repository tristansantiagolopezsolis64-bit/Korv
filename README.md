# Korv (Aether)

Plataforma minimalista que conecta estudiantes y negocios locales en Guadalajara.
Aplicación web de una sola página, sin dependencias ni paso de compilación.

## Estructura

```
korv-export/
  index.html        Estructura de la página (splash, encabezado, carrusel, filas, vistas)
  css/styles.css    Estilos (negro carbon #070908, verde olivo #708238)
  js/app.js         Toda la logica de la aplicacion
  README.md
  .gitignore
```

## Ejecutar en local

Abre `index.html` en el navegador, o sirve la carpeta:

```
python3 -m http.server 8080
```

y visita http://localhost:8080

## Funciones principales

- Pantalla de bienvenida con animacion y acceso por nombre de usuario (sin sesion persistente).
- Cuentas por usuario: si el usuario existe se carga su rol y datos; si no, se ofrece crearlo.
- Cuatro roles: Comprador, Buscador de talentos, Vendedor y Talento, cada uno con su feed filtrado.
- Categorias principales con subcategorias, filas horizontales por categoria y buscador en tiempo real combinado.
- Publicacion de productos con categoria, subcategoria, costo numerico, imagen real (se reduce a 900 px) y descripcion; sin datos autogenerados.
- Tarjetas con la imagen subida y vista de detalle con imagen completa, precio, descripcion y vendedor.
- Aislamiento de cuentas: cada cuenta solo edita o elimina sus propias publicaciones.
- Correo y contrasena solo en acciones criticas (enviar mensaje y publicar), con validacion de correos unicos entre cuentas.
- Carrusel principal con autoplay cada 5 segundos.

## Datos y autenticacion

Por defecto todo se guarda en `localStorage` del navegador (cuentas, publicaciones y
credenciales con hash SHA-256). Esto es un modo de demostracion: los datos no se comparten
entre dispositivos y el aislamiento de cuentas solo se aplica en el cliente.

Para autenticacion real con Supabase, completa en `js/app.js`:

```js
const SB_URL='https://TU-PROYECTO.supabase.co',SB_KEY='TU_ANON_KEY';
```

Con esas claves, el registro y el inicio de sesion por correo usan Supabase Auth. Las
publicaciones y cuentas de usuario aun requieren un backend propio (tablas y reglas de
acceso) para ser compartidas y seguras de verdad.

## Subir a GitHub

```
git init
git add .
git commit -m "Korv: version inicial"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/korv.git
git push -u origin main
```

Para publicarlo, activa GitHub Pages sobre la rama `main`.
