<template>
  <div class="d-flex" style="height: 100vh;">
    <div class="flex-shrink-0"
         style="width: 240px;height: 100%;border-right: 1px solid #817163;padding-left: 40px">

      <div style="margin-top: 100px">

        <template v-for="(item,i) in menuRouter">

          <div class="navItem" :key="'item' + i" @click="$router.push(item.to)">{{ item.title }} </div>

        </template>

      </div>
    </div>



  </div>

</template>

<script>


export default {
  name: "OrderNavigationDrawer",
  data: function () {
    return {
      menuRouter: [
        {
          title: 'Dein Entwurf',
          to: '/OrderIndex/Entwurf'
        },
        {
          title: 'Deine Bestellung',
          to: '/OrderIndex/OrderBestellung'
        },
        {
          title: 'Persönliche Daten',
          to: '/OrderIndex/OrderPersonData',
        },
        {
          title: 'FAQ',
          to: '/OrderIndex/FAQ'
        },
        {
          title: 'KontaktUns',
          to: '/OrderIndex/KontaktUns'
        }
      ]
    };
  },
}
</script>

<style scoped>
.navHeader {
  font-family: Palanquin, serif;
  font-style: normal;
  font-weight: 600;
  font-size: 35px;
  line-height: 63px;
  color: #CCC6BB;
}

.navItem {
  font-family: Gill Sans Nova;
  font-style: normal;
  font-weight: 400;
  font-size: 21px;
  padding: 8px 0;
  line-height: 125%;
  /* identical to box height, or 30px */

  display: flex;
  align-items: flex-end;
  border-bottom: 1px solid #CCC6BB;
  color: #CCC6BB;

}

.navItem:hover {
  color: #817163;
  border-bottom: 3px solid #817163;
}

.navItem.active {
  border-bottom: 3px solid #817163;
}
</style>
