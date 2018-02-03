cd ..
git pull
yarn

node ./node_modules/gulp/bin/gulp.js bundle:consumer
node ./node_modules/gulp/bin/gulp.js start:server