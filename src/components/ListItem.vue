<template>
  <tr class="content__body">
    <td>
      <img :src="user.picture.medium" class="avatar" alt="avatar" />
    </td>
    <td>{{ user.name.first + " " + user.name.last }}</td>
    <td>{{ user.email }}</td>
    <td>{{ formattedDistance() }}</td>
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
    };
  },
  created() {
    this.interval = setInterval(this.formattedDistance, MS_IN_MINUTE);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    formattedDistance() {
      return formatDistanceToNow(this.user.dateAdded);
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
