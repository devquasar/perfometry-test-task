<template>
  <tr class="content__body">
    <td>
      <img :src="user.picture.medium" class="avatar" alt="avatar" />
    </td>
    <td>{{ user.name.first + " " + user.name.last }}</td>
    <td>{{ user.email }}</td>
    <td>{{ distance }}</td>
  </tr>
</template>

<script>
const MS_IN_MINUTE = 60000;

import { formatDistanceToNow } from "../helpers/dateHelpers";

export default {
  name: "ListItem",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      interval: null,
      distance: ""
    };
  },
  created() {
    this.setDistance();
    this.interval = setInterval(this.setDistance, MS_IN_MINUTE);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    setDistance() {
      this.distance = formatDistanceToNow(this.user.dateAdded);
    },
  },
};
</script>

<style scoped>
.content__body td {
  padding: 20px 0px 20px 0px;
}

.avatar {
  width: 48px;
  height: 48px;
  margin-right: 20px;
  border-radius: 50%;
}
</style>
