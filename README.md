# Aelle-encrypter
A Electron app to encrypt some files. 

{
  "name": "aelle-encrypter",
  "version": "1.0.0",
  "description": "\"The Electron app to encrypt files offline\"",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "dist:linux": "electron-builder --linux"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/G4BR-13-L/Aelle-encrypter.git"
  },
  "keywords": [
    "Encryption"
  ],
  "author": "Gabriel Victor",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/G4BR-13-L/Aelle-encrypter/issues"
  },
  "homepage": "https://github.com/G4BR-13-L/Aelle-encrypter#readme",
  "devDependencies": {
    "electron": "^9.1.0",
    "electron-builder": "^22.7.0"
  },
  "build": {
    "appId": "aelle-encrypter.gabriel",
    "linux": {
      "target": [
        "deb",
        "snap",
        "rpm"
      ],
      "category": "utility"
    }
  }
}