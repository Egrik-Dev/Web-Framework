import { User } from "../models/User";

export class UserForm {
  constructor(public parent: Element, public model: User) {}

  eventsMap(): { [key: string]: () => void } {
    return {
      "click:button": this.onButtonClick,
      "mouseenter:h1": this.onHeaderHover,
    };
  }

  onButtonClick(): void {
    console.log(`Hey man, you clicked button!`);
  }

  onHeaderHover(): void {
    console.log(`You hovered on header`);
  }

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <div>User name ${this.model.get(`name`)}</div>
        <div>User age ${this.model.get(`age`)}</div>
        <input />
        <button>Click me</button>
      </div>
    `;
  }

  bindEvents(fragment: DocumentFragment): void {
    const events = this.eventsMap();

    for (let eventKey in events) {
      const [eventName, selector] = eventKey.split(`:`);

      fragment.querySelectorAll(selector).forEach((item) => {
        item.addEventListener(eventName, events[eventKey]);
      });
    }
  }

  render(): void {
    const templateElement = document.createElement(`template`);
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);

    this.parent.append(templateElement.content);
  }
}