# honeybadger

honeybadger is a sister project to [Tezori/Galleon](https://github.com/Cryptonomic/T2). It is a wallet framework targeting mobile platforms, written in TypeScript with react-native. Presently, honeybadger supports the Tezos blockchain and aims to provide deep support for that platform beyond simple transfers and staking operations. honeybadger is based on [ConseilJS](https://github.com/Cryptonomic/ConseilJS).

## Development on OSX

### Install development tools

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
brew install watchman
sudo gem install bundler:2.1.4
sudo gem install cocoapods
nvm install 12.16.3
```

```bash
npm install
cd ios && pod install && cd ..
npm start (in one terminal)
npm run ios (in another terminal)
```

### Resetting the build

```bash
watchman watch-del-all
rm -rf ./node_modules
```

## Architecture Overview

*TBD*

## Support

*TBD*
