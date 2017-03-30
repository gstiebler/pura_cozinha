git pull
./install.sh
cd ../WebAdmin
rm -rf out
node ./node_modules/gulp/bin/gulp.js deploy-debug
cd ../server
rm -rf out
./node_modules/typescript/bin/tsc
node ./out/startServer.js
