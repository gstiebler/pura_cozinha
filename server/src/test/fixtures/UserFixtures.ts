import { User } from '../../db/models/User';

export default async function execute() {
  const guilherme = new User({
    login: 'gstiebler',
    name: 'Guilherme Stiebler',
    role: 'ADMIN'
  });
  guilherme.setPassword('senha_guilherme123');
  await guilherme.save();

  const julio = new User({
    login: 'julio',
    name: 'Julio Scarpatti',
    role: 'ADMIN'
  });
  julio.setPassword('senha_julio');
  await julio.save();

  const livia = new User({
    login: 'livia',
    name: 'Livia Inada',
    role: 'ADMIN'
  });
  livia.setPassword('senha_livia');
  await livia.save();

  const marcel = new User({
    login: 'marcel',
    name: 'Marcel Sobrenome',
    role: 'KITCHEN'
  });
  marcel.setPassword('senha_marcel');
  await marcel.save();
}