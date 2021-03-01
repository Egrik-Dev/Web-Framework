import { UserEdit } from "./views/UserEdit";
import { User } from "./models/User";

const root = document.querySelector(`#root`);

const user = User.buildUser({ name: `Ben`, age: 22 });

if (root) {
  const userEdit = new UserEdit(root, user);

  userEdit.render();
  console.log(userEdit);
} else {
  throw new Error("Root not found");
}
