import initFixtures from '../test/fixtures/fixture';

async function exec() {
  if(process.env.NODE_ENV !== 'development') {
    console.log('Not allowed on ' + process.env.NODE_ENV);
  } else {
    try {
      await initFixtures();
      console.log('All data seeded');
    } catch(err) {
      console.error(err);
    }
  }
}

exec();