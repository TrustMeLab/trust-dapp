/*
This is the general configuration for the frontend.

These configuration variables can be overridden in production with environment variables.

If you need to add a new configuration variable:
 - add it here
 - report the variable and a placeholder in `config.prod.ts`.
 - add the default prod config in `docker-entrypoint.d/10_patch_config.sh`
*/

export const backendURL = "http://localhost:4000";
export const routerPrefix = "";
