<template>
  <div class="header">
      <div class="header__title">Left until the draw</div>
      <div class="header__timer">{{ nextDraw }}</div>
    </div>
</template>

<script>
import { endOfToday } from "date-fns";
import { countDown } from "../helpers/dateHelpers";

  export default {
    name: 'Header',
    data() {
      return {
        nextDraw: null
      }
    },
    mounted() {
    countDown(endOfToday(), (str) => {
      this.nextDraw = str;
    });
  }
  }
</script>

<style scoped>
.header {
  padding: 28px 0px 28px 68px;
  background: #f3f3f3;
  border-radius: 24px;
  font-weight: 600;
}
.header__title {
  margin-bottom: 8px;
  font-size: 12px;
}
.header__timer {
  font-size: 56px;
}
</style>
