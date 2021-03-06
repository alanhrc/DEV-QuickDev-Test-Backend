import { container } from 'tsyringe';

import {IMailProvider} from './models/IMailProvider';

import {EtherealMailProvider} from './implementations/EtherealMailProvider';

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider(),
);
