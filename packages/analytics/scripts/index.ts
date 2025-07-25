import generateEventTypes from './generate-event-types';
import { program } from 'commander';

program.name('analytics');

program.addCommand(generateEventTypes);

program.parse(process.argv);
