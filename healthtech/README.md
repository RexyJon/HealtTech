# HealthTech

Prototipo de una app de salud para **adultos mayores de 40 años** y sus cuidadores. Reúne en una interfaz grande y clara los recordatorios de medicación, un historial de salud para el cuidador, juegos de memoria y un botón de emergencia (SOS) siempre visible.

**Demo web:** https://vita-sos.vercel.app/
**APK para Android:** en la sección [Releases](https://github.com/RexyJon/healthtech/releases) de este repositorio.

> **Aviso:** esto es un prototipo de interfaz con datos de ejemplo. No es una herramienta médica, no sustituye el consejo de un profesional de salud y **el botón SOS no llama ni envía alertas reales**: simula la llamada para demostrar el flujo.

## Funciones

- **Registro del cuidador:** al iniciar, la app pide el nombre y el teléfono del contacto de confianza.
- **Botón SOS en todas las pantallas:** acceso directo a la pantalla de emergencia, que muestra el flujo de llamada al cuidador registrado.
- **Medicación:** pantalla de recordatorios con el horario del día (por ejemplo, 8:00 AM, 2:00 PM, 9:00 PM) y opción de posponer.
- **Historial y reportes:** gráficas semanales de presión arterial y glucosa pensadas para que las revise un familiar o cuidador.
- **Estimulación cognitiva:** juego de memoria de parejas con conteo de movimientos.

## Qué es real y qué es de ejemplo

| Parte | Estado actual |
|---|---|
| Navegación entre pantallas y diseño | Funcional |
| Juego de memoria | Funcional |
| Contacto de confianza | Se guarda solo mientras la app está abierta (no persiste al recargar) |
| Medicamentos y horarios | Datos de ejemplo fijos en el código |
| Historial de presión y glucosa | Datos de ejemplo fijos en el código |
| Botón SOS | Simulado: no realiza llamadas ni envía mensajes |

## Tecnologías

- Next.js 16 · React 19 · TypeScript
- Tailwind CSS 4
- Recharts (gráficas) · Motion (animaciones) · Lucide (iconos)
- Desplegado en Vercel
- Diseño de interfaz en español, con botones y texto grandes pensando en accesibilidad

## Mi rol

Lideré el desarrollo del **frontend** dentro de un proyecto grupal.

## Cómo ejecutarlo en tu computadora

Necesitas [Node.js](https://nodejs.org) 20 o superior y [pnpm](https://pnpm.io).

```bash
git clone https://github.com/RexyJon/healthtech.git
cd healthtech
pnpm install
pnpm dev
```

Abre `http://localhost:3000`. La interfaz está pensada para verse como una pantalla de teléfono.

## APK de Android

El APK es un contenedor que abre la versión web de la demo, así que **necesita conexión a internet**. Para instalarlo, descárgalo desde Releases y permite la instalación de aplicaciones externas en tu teléfono.

## Próximos pasos

- Guardar contacto, medicamentos y registros de forma persistente.
- Permitir agregar y editar medicamentos y horarios.
- Hacer que el SOS llame de verdad (enlace `tel:`) y envíe un aviso al cuidador.
- Probar la interfaz con adultos mayores reales y ajustar según lo que aprendan.
