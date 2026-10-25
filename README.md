# Sonido Vivo · audio-vivo-team

Tienda online de instrumentos y equipos musicales de **Sonido Vivo** (Viña del Mar, Región de Valparaíso), hecha en React para la Evaluación Parcial 2 de **DSY1104 Desarrollo Fullstack II** (Duoc UC, 2026). Caso: Forma B.

Es el sitio del Parcial 1 pasado a React, ordenado con Atomic Design y con Bootstrap para el diseño responsivo. Los datos son simulados: se cargan desde `src/data` y se guardan en el navegador con `localStorage`. El backend con Spring Boot y la base de datos corresponden al Parcial 3.

## Integrantes

- Santiago Aburto (san.aburto@duocuc.cl)
- Vicente Aninao (vi.aninao@duocuc.cl)
- Martín Pérez (mart.perezr@duocuc.cl)

## Qué hace

**Tienda (parte pública)**

- Inicio con un video promocional y accesos a las 10 categorías.
- Catálogo de 51 productos con filtro por categoría y detalle de cada producto.
- Carrito: agregar, cambiar cantidades, quitar y vaciar. Un producto sin stock no se puede agregar y nunca se agregan más unidades que el stock. El carrito se mantiene al recargar la página.
- Checkout con despacho a domicilio o retiro en tienda, y pantallas de compra exitosa y de compra fallida. Al confirmar, el stock baja.
- Mis pedidos, con el estado de cada pedido (en preparación, despachado o entregado).
- Registro e inicio de sesión con validaciones propias (sin `alert()`) y la sesión en el menú.
- Formulario Contáctanos validado.

**Panel de administración**

- Resumen con productos, stock crítico y unidades en bodega.
- CRUD de productos (crear, editar y eliminar con confirmación).
- Productos con stock crítico (3 unidades o menos).
- Historial de pedidos por cliente y comprobante de cada pedido, que se puede imprimir.

## Tecnologías

| Uso | Herramienta |
| --- | --- |
| Aplicación | React 19 + Vite 8 |
| Navegación | React Router 7 |
| Diseño responsivo | Bootstrap 5 y React Bootstrap |
| Pruebas unitarias | Vitest 5, Testing Library (react, jest-dom y user-event) y jsdom |
| Cobertura | @vitest/coverage-v8 |
| Revisión de código | oxlint |

## Cómo instalar y ejecutar

Se necesitan Node.js y npm.

```bash
npm install
npm run dev
```

Vite muestra en la terminal la dirección local para abrir la tienda (por defecto, `http://localhost:5173`).

## Cómo probar

| Comando | Qué hace |
| --- | --- |
| `npm test` | Modo vigilante: vuelve a correr las pruebas cada vez que se guarda un archivo (`q` para salir). |
| `npm run test:run` | Corre todas las pruebas una vez. |
| `npm run test:cov` | Corre las pruebas y genera el reporte de cobertura. |

Cada archivo de prueba está junto al archivo que prueba y tiene el mismo nombre más `.test` (por ejemplo, `Carrito.jsx` y `Carrito.test.jsx`). La configuración está en el bloque `test` de `vite.config.js` y en `src/setupTests.js`.

**Una prueba falla a propósito**, a pedido del profesor, para mostrar cómo se lee un error de Vitest (`Expected` / `Received`): `src/components/organisms/FormularioRegistro/FormularioRegistro.test.jsx`. Por eso `npm run test:run` termina con 1 prueba en rojo.

Cuando hay una prueba en rojo, Vitest no imprime el reporte de cobertura. Para verlo igual:

```bash
npm run test:cov -- --coverage.reportOnFailure
```

## Usuarios de prueba

Vienen en `src/data/usuarios.json`. Son datos simulados para probar la tienda, no cuentas reales.

| Rol | Correo | Contraseña |
| --- | --- | --- |
| Administrador | admin@sonidovivo.cl | admin-sonido-2026 |
| Cliente | cliente@correo.cl | cliente-prueba-2026 |

Si un cambio en los archivos de `src/data` no aparece en la tienda, hay que borrar el `localStorage` del navegador (F12 → Aplicación → Almacenamiento local → Borrar), porque los datos se guardan ahí la primera vez.

## Rutas

| Ruta | Página |
| --- | --- |
| `/` | Inicio |
| `/catalogo` y `/categoria/:slug` | Catálogo, completo o filtrado por categoría |
| `/producto/:id` | Detalle de un producto |
| `/carrito` | Carrito |
| `/checkout` | Confirmar la compra |
| `/compra-exitosa` y `/compra-fallida` | Resultado de la compra |
| `/mis-pedidos` | Pedidos del cliente con sesión |
| `/login` y `/registro` | Iniciar sesión y crear cuenta |
| `/contacto` | Contáctanos |
| `/admin` | Resumen del panel |
| `/admin/productos` | CRUD de productos |
| `/admin/criticos` | Stock crítico |
| `/admin/historial` | Historial de pedidos por cliente |
| `/admin/pedidos/:id` | Comprobante de un pedido |
| cualquier otra | Página no encontrada |

## Estructura del proyecto

Los componentes siguen Atomic Design. Los datos y sus operaciones van fuera de `components`, en `services` (CRUD en JavaScript puro, sin React), `context` (estado compartido) y `utils` (reglas de negocio).

```
src/
├── components/
│   ├── atoms/        Boton, CampoTexto, ContadorCantidad, EtiquetaStock, Precio, Selector
│   ├── molecules/    CampoFormulario, EstadoPedido, FiltroCategoria, ItemCarrito, Login,
│   │                 TarjetaCategoria, TarjetaProducto, TarjetaResumen
│   ├── organisms/    CarruselCategorias, CatalogoProductos, ComprobantePedido, Footer,
│   │                 FormularioCheckout, FormularioContacto, FormularioProducto,
│   │                 FormularioRegistro, Navbar, ResumenCompra, TablaHistorial, TablaProductos
│   └── templates/    PlantillaPublica, PlantillaAdmin
├── pages/            Inicio, Catalogo, DetalleProducto, Carrito, Checkout, ResultadoCompra,
│   │                 MisPedidos, InicioSesion, Registro, Contacto, NoEncontrada
│   └── admin/        AdminDashboard, AdminProductos, AdminCriticos, AdminHistorial, AdminComprobante
├── context/          ProductosContext, CarritoContext
├── services/         productoService, pedidoService, usuarioService, contactoService
├── hooks/            useTituloPagina
├── utils/            Validaciones, carrito, checkout, formatoPrecio, historial, stock,
│                     validacionesProducto
├── data/             productos.json (51), categorias.json (10), usuarios.json
└── setupTests.js     carga jest-dom antes de las pruebas
```

## Cómo trabajamos en Git

Cada integrante trabaja en su propia rama (`sem10/<nombre>-<tema>`) y la une a `main` con un Pull Request. Antes de abrir un PR se corren `npm run test:run` y `npm run build`.

## Material complementario

Carpeta de Drive con los documentos del semestre (ERS y otros):
https://docs.google.com/document/d/1uXJkwkW-v7cms3Os6l3B5VIBBNBEkOpyYk8jSU-PbRg/edit?usp=drive_link
