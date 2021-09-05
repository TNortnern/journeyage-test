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
        currentMessages: [
        //   {
        //     id: 1,
        //     conversation: 1,
        //     text: faker.random.words(),
        //   },
        ],
        contacts: [],
      },
      {
        id: 2,
        name: faker.name.findName(),
        number: faker.phone.phoneNumber(),
        currentMessages: [
          {
            id: 1,
            conversation: 1,
            text: faker.random.words(),
          },
        ],
        contacts: [],
      },
    ],
    conversations: [
      {
        id: 1,
        users: [1, 2],
        messages: [
          {
            id: 1,
            user: 2,
            text: "Hello",
            sent: faker.date.recent(),
          },
          {
            id: 2,
            user: 1,
            text: "Hello Back",
            sent: faker.date.recent(),
          },
        ],
      },
    ],
  }),
  actions: {
    INITIALIZE_MESSAGE({ state, commit }, { user, conversation, text = "" }) {
      let index = 0;
      const users = [...state.users];
      const userIndex = users.findIndex((u) => u.id === user.id);
      const userObj = users[userIndex];
      const conversationIndexExists = userObj.currentMessages.findIndex(
        (m) => m.conversation === conversation
      );
      if (conversationIndexExists < 0) {
        userObj.currentMessages.push({
          id: faker.datatype.uuid(),
          conversation,
          text: "",
        });
        index = userObj.currentMessages.length - 1;
      } else {
        userObj.currentMessages[conversationIndexExists].text = text;
        index = conversationIndexExists;
      }
      commit("SET", {
        key: "users",
        value: users,
      });
      return index;
    },
  },
  mutations: {
    SET(state, { key, value }) {
      state[key] = value;
    },
    SET_CONTACT(state, { key, value }) {
      state.contacts[key] = value;
    },

    NEW_TEXT_MESSAGE(state, { conversation, user, text }) {
      const conversationIndex = [...state.conversations].findIndex(
        (c) => c.id === conversation?.id
      );
      const findConversation = [...state.conversations][conversationIndex];
      findConversation.messages.push({
        id: faker.datatype.uuid(),
        user,
        text,
        sent: new Date(),
      });
      state.conversations[conversationIndex].messages =
        findConversation.messages;
    },
    NEW_CONVERSATION(state, { users = [], message = {} }) {
      state.conversations = [
        ...state.conversations,
        {
          id: faker.datatype.uuid(),
          users,
          messages: [
            {
              id: faker.datatype.uuid(),
              ...message,
              sent: faker.date.recent(),
            },
          ],
        },
      ];
    },
  },
});

export default store;
