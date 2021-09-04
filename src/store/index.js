import { createStore } from "vuex";
import faker from "faker";

// Create a new store instance.
const store = createStore({
  state: () => ({
    users: [
      {
        id: 1,
        name: faker.name.findName(),
        number: faker.phone.phoneNumber(),
        currentMessage: faker.random.words(),
        contacts: [],
      },
      {
        id: 2,
        name: faker.name.findName(),
        number: faker.phone.phoneNumber(),
        currentMessage: faker.random.words(),
        contacts: [],
      },
    ],
    conversations: [
      {
        id: 1,
        messages: [
          {
            id: 1,
            user: 2,
            text: "Hello",
          },
          {
            id: 2,
            user: 1,
            text: "Hello Back",
          },
        ],
      },
    ],
  }),
  mutations: {
    SET(state, { key, value }) {
      state[key] = value;
    },
    SET_CONTACT(state, { key, value }) {
      state.contacts[key] = value;
    },
  },
});

export default store;
