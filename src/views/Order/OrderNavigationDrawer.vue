<template>
  <div class="d-flex" style="height: 100vh;">
    <div class="flex-shrink-0"
         style="width: 240px;height: 100%;border-right: 1px solid #817163;padding-left: 40px">

      <div style="margin-top: 100px">

        <v-item-group v-model="orderNav">
          <v-item v-for="(item,i) in menuRouter"
                  :key="'orderNav'+i"
                  v-slot="{active}"
          >

            <div v-if="item.to !='/'"
                 class="navItem"
                 :style="active ? {'color': '#817163', 'border-bottom': '3px solid #817163'}: {}"
                 @click="goto(item); orderNav=i">{{ item.title }}
            </div>

            <div v-else
                 class="navItem"
                 :style="active ? {'color': '#817163', 'border-bottom': '3px solid #817163'}: {}"
                 @click="abmeldenDialog=true; orderNav=i">{{ item.title }}
            </div>

          </v-item>
        </v-item-group>


      </div>
    </div>

    <v-dialog v-model="abmeldenDialog" width="40%">
      <v-card tile class="pa-2">
        <v-card-title style="font-weight: bold; font-size: xx-large">Sie würden abmelden?</v-card-title>
        <v-card-actions>
          <v-spacer/>
          <v-btn tile class="primary" @click="handleLogout">Ja</v-btn>
          <v-btn tile class="" @click="abmeldenDialog=false">Nein</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </div>

</template>

<script>


export default {
  name: "OrderNavigationDrawer",
  data: function () {
    return {
      abmeldenDialog: false,
      orderNav: 0,
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
          title: 'Kontakt',
          to: '/OrderIndex/KontaktUns'
        },
        {
          title: 'Abmelden',
          to: '/'
        }
      ]
    };
  },
  methods: {

    goto(item) {
      if (this.$route.path !== item.to)
        this.$router.push(item.to);
    },
    handleLogout() {
      this.$router.replace('/')
      sessionStorage.setItem('token', null)
    }
  }
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
  /*font-family: Gill Sans Nova;*/
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
