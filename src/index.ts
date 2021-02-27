import { UserForm } from "./views/UserForm";
import { User } from "./models/User";

const root = document.querySelector(`#root`);

const user = User.buildUser({ name: `Ben`, age: 22 });
const userForm = new UserForm(root, user);

userForm.render();
