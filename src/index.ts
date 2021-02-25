import { User } from "./models/User";

const user = User.buildUser({ name: `Egor`, age: 30 });

user.on(`change`, () => {
  console.log(`Our user was changed`);
});

user.on(`save`, () => {
  console.log(`Data saved`);
});

user.on(`error`, () => {
  throw new Error(`The data was not saved`);
});

user.save();
console.log(user);
