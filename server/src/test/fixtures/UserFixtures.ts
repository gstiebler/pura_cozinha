import { User } from '../../db/models/User';

export default async () => {
  const guilherme = new User({
    login: 'gstiebler',
    name: 'Guilherme Stiebler',
    role: 'ADMIN',
    token: 'fake'
  });
  guilherme.setPassword('senha_guilherme123');
  await guilherme.save();

  const roberto = new User({
    login: 'roberto',
    name: 'Roberto',
    role: 'ADMIN',
    token: 'fake'
  });
  roberto.setPassword('roberto1234');
  await roberto.save();

  const julio = new User({
    login: 'julio',
    name: 'Julio Scarpatti',
    role: 'ADMIN',
    token: 'fake'
  });
  julio.setPassword('senha_julio');
  await julio.save();

  const livia = new User({
    login: 'livia',
    name: 'Livia Inada',
    role: 'ADMIN',
    token: 'fake'
  });
  livia.setPassword('senha_livia');
  await livia.save();

  const marcel = new User({
    login: 'marcel',
    name: 'Marcel Sobrenome',
    role: 'KITCHEN',
    token: 'fake'
  });
  marcel.setPassword('senha_marcel');
  await marcel.save();
}