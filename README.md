# honeybadger

## OSX instructions

### Intall development tools
```bash
brew install yarn
brew install watchman
sudo gem install bundler:2.1.4
sudo gem install cocoapods
```

*some xcode steps*

```bash
yarn install
cd ios && pod install && cd ..
yarn start (in one terminal)
yarn run ios (in another terminal)
```

### Resetting the build

```bash
watchman watch-del-all
rm -rf ./node_modules
```
