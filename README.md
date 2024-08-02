# PIXI-Template

A Pixi.js, TypeScript, webpack bunder to help you get started quicker.

## Requirements

Node and NPM

## Setup

simply run
```
npm install
```

## Build Scripts

Checks files for errors and inconsistencies 
```
npm run lint
```

Generates an AssetManifest.json using the assets' folder.
```
npm run generate-asset-manifest
```

Run and watches a build on http://localhost:8080/
```
npm run build-dev:watch
```

Creates a build of the project ready for testing.
```
npm run build-dev
```

Creates a finished build of the project ready for upload.
```
npm run build-prod
```
