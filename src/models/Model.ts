import { AxiosPromise, AxiosResponse } from "axios";

interface AttributesModel<T> {
  getAll(): T;
  set(data: T): void;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

export interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private events: Events,
    private sync: Sync<T>,
    private attrs: AttributesModel<T>
  ) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attrs.get;
  }

  set(update: T): void {
    this.attrs.set(update);
    this.trigger(`change`);
  }

  fetch(): void {
    const id = this.get(`id`);

    if (typeof id !== `number`) {
      throw new Error(`Cannot fetch data without id`);
    }

    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }

  save(): void {
    const allUserData = this.attrs.getAll();
    this.sync
      .save(allUserData)
      .then((response: AxiosResponse): void => {
        this.trigger(`save`);
      })
      .catch(() => {
        this.trigger(`error`);
      });
  }
}
