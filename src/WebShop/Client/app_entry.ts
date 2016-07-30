import 'ts-helpers';
import './styles/app.scss'; // extracted via webpack as global.css

declare var ENV: any; // webpack DefinePlugin
if ('production' === ENV) {
} else {
  console.log('Running in development env.');
}

import { Greeter, Observer, map, delay } from './components/app';

function life(obs: Observer) {
  let handle = setInterval(() => obs.next('... life goes on'), 1000);

  return () => {
    clearInterval(handle);
    obs.complete();
    obs.unsubscribe();
  };
}

let deafLife = map((val) => {
  return `${Array(val.length).join('*')}`;
}, life);

let lateDeafLife = delay(2500, deafLife);

$(() => {
  let bodyElem = $('body');
  let greeter = new Greeter();
  greeter.greet();

  let endLife = lateDeafLife(new Observer());
  setTimeout(() => endLife(), 6000);
});
