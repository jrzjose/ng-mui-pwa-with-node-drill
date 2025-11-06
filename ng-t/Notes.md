# Host
Host should be set to 0.0.0.0 (linux req)

```json
"start": "ng serve --host 0.0.0.0 --port 8085 --watch --poll 500 --configuration development",
```

npm create vite@latest
npm install -g @angular/cli

```shell
node index.js
```

access terminal
podman exec -it <a068037e69ea> sh  




## Adding Angular Material
```shell
ng add @angular/material
```

## Adding Angular PWA

```shell
ng add @angular/pwa
```
The above will generate various changes in the code:
- Adds the @angular/service-worker package to your project.
- Enables service worker build support in the CLI.
- Imports and registers the service worker with the application's root providers.
  - `provideServiceWorker` provider at `app.config.ts`
- Updates the `index.html` file:
- Includes a link to add the `manifest.webmanifest` file
- Adds a meta tag for `theme-color`
- Installs icon files to support the installed Progressive Web App (PWA).
- Creates the service worker configuration file called `ngsw-config.json`, which specifies the caching behaviors and other settings.

about  `manifest.webmanifest` file, note declaring an icon with 'purpose' of any maskable is discourage. open the manifest file and rectify, e.g.:
```json
    {
      "src": "icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
```

refs:
https://angular.dev/ecosystem/service-workers
https://angular.dev/ecosystem/service-workers/config

## icon size
icon 512x512

## recommended app to tweak your icons
maskable.app

