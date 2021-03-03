import { Collection } from "./models/Collection";
import { UserList } from "./views/UserList";
import { User, UserProps } from "./models/User";

const users = new Collection(
  `http://localhost:3000/users`,
  (json: UserProps) => {
    return User.buildUser(json);
  }
);

users.on(`change`, (): void => {
  const rootElement = document.querySelector(`#root`);

  if (rootElement) {
    new UserList(rootElement, users).render();
  }
});

users.fetch();
