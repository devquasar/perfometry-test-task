<template>
  <div id="app">
    <Header />

    <table class="content">
      <thead>
        <tr class="content__header">
          <th>&nbsp;</th>
          <th>Participant</th>
          <th>work email</th>
          <th>signed up</th>
        </tr>
      </thead>
      <tbody>
        <ListItem
          v-for="(user, idx) in sortedUsers"
          :key="idx"
          :user="user"
        />
      </tbody>
      <Observer @intersect="getUsers" />
    </table>

    <Footer v-if="allItemsLoaded" />
  </div>
</template>

<script>
import Observer from "./components/Observer";
import ListItem from "./components/ListItem";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getUsers } from './helpers/api'

export default {
  name: "App",
  components: {
    Observer,
    Header,
    Footer,
    ListItem,
  },
  data() {
    return {
      page: 1,
      items: [],
    };
  },
  computed: {
    sortedUsers() {
      const usersClone = this.items.slice();
      return usersClone.sort((a, b) => {
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      })
    },
    allItemsLoaded() {
      return this.items.length >= 50;
    },
  },
  methods: {
    async getUsers() {
      if (this.allItemsLoaded) return;
      const users = await getUsers(this.page);
      this.page++;
      this.items = [...this.items, ...users];
    },
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Open Sans", Courier, monospace;
  margin: auto;
  width: 50%;
  padding: 61px 0px 37px 0px;
}
.content {
  margin-top: 49px;
  padding: 0px 35px 0px 35px;
  font-size: 20px;
  min-width: 100%;
}
.content__header {
  color: #808080;
  font-size: 12px;
  font-weight: 400;
}
th {
  text-align: left;
}
</style>
