export class Greeter {
  greet() {
    console.log('Hello from Greeter.');
  }
}
let observer = {
  next(value) {
    if (this.unsubscribed) return;
    console.log(value);
  },

  error(message) {
    if (this.unsubscribed) return;
    console.error(message);
  },

  complete() {
    if (this.unsubscribed) return;
    console.log('life ended');
  },

  unsubscribed: false,
  unsubscribe() {
    this.unsubscribed = true;
  }
}

export class Observer {
  private _unsubscribed: boolean = false;

  get unsubscribed(): boolean {
    return this._unsubscribed;
  }

  next(value) {
    if (this._unsubscribed) return;
    console.log(value);
  }

  error(message) {
    if (this._unsubscribed) return;
    console.error(message);
  }

  complete() {
    if (this._unsubscribed) return;
    console.log('life ended');
  }

  unsubscribe() {
    this._unsubscribed = true;
  }
}

export function map(callback, observable) {
  return function(obs: Observer) {
    return observable({
      next(value) { obs.next(callback(value)); },
      error(value) { obs.error(value); },
      complete() { obs.complete(); },
      unsubscribe() { obs.unsubscribe(); }
    })
  };
}

export function delay(ms, observable) {
  return function(obs: Observer) {
    return observable({
      next(value) { setTimeout(() => obs.next(value), ms); },
      error(value) { obs.error(value); },
      complete() { obs.complete(); },
      unsubscribe() { obs.unsubscribe(); }
    })
  };
}
