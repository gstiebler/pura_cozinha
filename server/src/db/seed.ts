import initFixtures from '../test/fixtures/fixture';

if(process.env.NODE_ENV !== 'development') {
  console.log('Not allowed on ' + process.env.NODE_ENV);
} else {
  initFixtures();
}
