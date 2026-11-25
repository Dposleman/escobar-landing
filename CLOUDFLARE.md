# Migración a Cloudflare Workers

La aplicación se sirve como SPA desde Workers Static Assets. El Worker atiende `/api/cms` y `/api/submit`; el CMS continúa leyendo y escribiendo el archivo de GitHub configurado. No se necesita una base de datos nueva para esta primera migración.

## Antes de retirar Vercel

1. Conservar acceso a la configuración y los valores de `ESCOBAR_ADMIN_EMAIL`, `ESCOBAR_ADMIN_PASSWORD` y `GITHUB_TOKEN`. Si existe, conservar también `SUBMIT_WEBHOOK_URL`. No guardar valores en Git. Comprobar si se usan `GITHUB_OWNER`, `GITHUB_REPO`, `GITHUB_BRANCH` o `CMS_DATA_FILE_PATH` personalizados.
2. Guardar una copia segura del estado actual del CMS y verificar el acceso al repositorio y al dominio. Los cambios del CMS escriben en la rama configurada, normalmente `main`.
3. Crear una cuenta Cloudflare y un Worker con el plan gratuito. Mantener Vercel operativo hasta verificar el Worker y cambiar el dominio.

## Preparación y publicación

1. Ejecutar `npm ci` y `npm run check`. El comando `npx wrangler@4 deploy --dry-run` comprueba el empaquetado sin publicar.
2. Conectar el repositorio a Workers Builds, seleccionando la rama deseada, `npm ci && npm run build` como comando de compilación y `npx wrangler@4 deploy` como comando de despliegue. `wrangler.jsonc` define el Worker y `dist`.
3. Configurar como secretos en Cloudflare `ESCOBAR_ADMIN_EMAIL`, `ESCOBAR_ADMIN_PASSWORD` y `GITHUB_TOKEN`, y opcionalmente `SUBMIT_WEBHOOK_URL`. Configurar las variables `GITHUB_OWNER`, `GITHUB_REPO`, `GITHUB_BRANCH` y `CMS_DATA_FILE_PATH` únicamente si deben diferir de los valores actuales. No publicar secretos con prefijo `VITE_`.
4. Probar el dominio `workers.dev`: `/`, `/admin`, `/feed-the-dev` y `/api/cms`; probar imágenes, idioma, radio y formularios. Sin webhook, `POST /api/submit` devuelve 503 `not_configured` y la interfaz ofrece correo. Verificar el acceso del administrador y guardar una modificación inocua solo con autorización del propietario.
5. Conectar el dominio personalizado en Cloudflare y comprobar DNS, HTTPS y funcionamiento real. Solo entonces retirar Vercel.

## Límites y seguridad

El límite de solicitudes y CPU del plan gratuito debe revisarse según el tráfico real. El limitador de formularios existente es por instancia de ejecución, no global; no sustituye reglas de seguridad de Cloudflare. El CMS usa un token de GitHub y el acceso de administración existente requiere una revisión de seguridad independiente antes de incorporar pagos o datos sensibles. Las fotos que sube el panel admin se guardan en `data/uploads/` del repositorio (con el mismo `GITHUB_TOKEN`) y se sirven por `/api/media`; el navegador las reduce antes de subirlas y el límite es de unos 2 MB por foto. No almacenar imágenes codificadas dentro del estado del CMS.
