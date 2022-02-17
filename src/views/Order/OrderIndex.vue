<template>
  <v-app>
    <v-navigation-drawer width="240px" app>
      <order-navigation-drawer/>
    </v-navigation-drawer>
    <v-content class="pa-0">
      <router-view/>
    </v-content>
  </v-app>
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
