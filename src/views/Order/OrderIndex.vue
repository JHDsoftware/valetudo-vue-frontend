<template>

  <div style="position: relative;">
    <order-navigation-drawer style="position: fixed;top: 60px;left: 0;"/>

    <div style="position: absolute; left: 240px;right: 0;">
      <router-view/>
    </div>

  </div>
</template>

<script>

export default {
  name: "OrderIndex",
  components: {
    OrderNavigationDrawer: () => import('./OrderNavigationDrawer')
  }
}
</script>

<style scoped>


</style>
