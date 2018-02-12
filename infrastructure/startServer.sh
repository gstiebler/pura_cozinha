cd ..
git pull
yarn

cd ConsumerWebApp
node ../node_modules/webpack/bin/webpack.js --config webpack.prod.js
cd ..
node ./node_modules/gulp/bin/gulp.js transpile
node ./node_modules/gulp/bin/gulp.js start:server
