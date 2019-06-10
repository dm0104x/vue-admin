<template>
  <div class="notFound-wrap">
    <h2 class="text">404</h2>
    <p class="desc">Page Not Found</p>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
};
</script>

<style lang="scss" scoped>
.notFound-wrap {
  width: 100vw;
  height: 100vh;
  text-align: center;
  background: #231a13;
  .text {
    padding-top: 80px;
    font-size: 100px;
    color: #f8b700;
  }
  .desc {
    padding-top: 20px;
    font-size: 40px;
    color: #fff;
  }
}
</style>
