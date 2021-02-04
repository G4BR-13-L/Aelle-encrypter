# Generating deb packages for linux

## 1. install package globally

```
npm install -g electron-installer-debian
```

## 2. Compile everything in the directory

```
 npm run package-linux
```

## 3. Generate deb package

```
electron-installer-debian --src release-builds/aelle-encrypter-linux-x64/ --arch amd64 --config debian.json
```