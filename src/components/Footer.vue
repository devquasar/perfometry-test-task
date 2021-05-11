<template>
  <div class="footer">
      <CheckIcon />
      <span class="footer__text">All users loaded</span>
    </div>
</template>

<script>
import CheckIcon from "./icons/CheckIcon";

  export default {
    name: 'Footer',
    components: {
      CheckIcon
    }
  }
</script>

<style>
.footer {
  background: #edf9f2;
  border-radius: 67px;
  margin: 0px 40px 0px 40px;
  height: 72px;
  color: #219653;
  font-size: 20px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer__text {
  margin-left: 18px;
}
</style>
