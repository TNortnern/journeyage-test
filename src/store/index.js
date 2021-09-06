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
        activeConversation: 1,
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
        activeConversation: 1,
        // keeps track of all user's current messages in each conversation
        currentMessages: [
          {
            // id: 1,
            // conversation: 1,
            // text: faker.random.words(),
          },
        ],
        contacts: [],
      },
    ],
    conversations: [
      {
        id: 1,
        users: [
          // if this is null, that mean this user created the text message
          {
            user: 1,
            addedBy: null,
          },
          {
            user: 2,
            addedBy: 1,
          },
        ],
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
  getters: {
    GET_USER: (state) => (id) => {
      return state.users.find((user) => user.id.toString() === id?.toString());
    },
    GET_CONVERSATION: (state) => (id) => {
      return state.conversations.find((conv) => conv.id === id);
    },
  },
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
    GENERATE_USER({ state, commit }) {
      const users = [...state.users];
      const newUser = {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        number: faker.phone.phoneNumber(),
        activeConversation: null,
        currentMessages: [],
        contacts: [],
      };
      users.push(newUser);
      commit("SET", {
        key: "users",
        value: users,
      });
      return newUser;
    },
    async NEW_CONVERSATION(
      { state, commit, dispatch },
      { user, message = {}, sent }
    ) {
      // dispatch creates a promise
      const newUser = await dispatch("GENERATE_USER");
      commit("SET", {
        key: "conversations",
        value: [
          ...state.conversations,
          {
            id: faker.datatype.uuid(),
            // if I had more time on the test it'd make the users dynamically creatable but for now a new conversation randomly generates a new conversation for the user
            users: [
              {
                user: user.id,
                addedBy: null,
              },
              {
                user: newUser.id,
                addedBy: user.id,
              },
            ],
            messages: Object.keys(message).length
              ? [
                  {
                    id: faker.datatype.uuid(),
                    ...message,
                    sent: sent || faker.date.recent(),
                  },
                ]
              : [],
          },
        ],
      });
    },
  },
  mutations: {
    SET(state, { key, value }) {
      state[key] = value;
    },
    SET_CONTACT(state, { key, value }) {
      state.contacts[key] = value;
    },
    SET_ACTIVE_CONVERSATION(state, { user, conversation }) {
      const userIndex = state.users.findIndex((u) => u.id === user.id);
      state.users[userIndex].activeConversation = conversation.id;
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
  },
});

export default store;
