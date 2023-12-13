<template>
  <main-master-page>
    <v-table class="mb-4">
      <thead>
        <tr>
          <th class="text-left font-weight-bold">License Plate</th>
          <th class="text-left font-weight-bold">Number of seats</th>
          <th class="text-center font-weight-bold">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="buss in getBussesList" :key="buss.id">
          <td>{{ buss.licensePlate }}</td>
          <td>{{ buss.numberOfSeats }}</td>
          <td>
            <button @click="onEdit(buss.id)">
              <font-awesome-icon :icon="['fas', 'pencil']" />
            </button>
          </td>
          <td>
            <button @click="deleteBuss(buss.id)">
              <font-awesome-icon :icon="['fas', 'trash-can']" />
            </button>
          </td>
        </tr>
      </tbody>
    </v-table>
    <router-link :to="{name: 'busses-config'}" class="btn"
      >Add buss</router-link
    >
  </main-master-page>
</template>

<script>
import MainMasterPage from '@/masterpages/MainMasterPage.vue'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'BussesList',
  components: {
    MainMasterPage,
  },

  data() {
    return {}
  },
  computed: {
    ...mapGetters('busses', ['getBussesList', 'getBussById']),
  },
  created() {
    this.loadBussesList()
  },

  methods: {
    ...mapActions('busses', ['loadBussesList', 'deleteBuss']),

    onEdit(bussId) {
      this.$router.push({
        name: 'busses-config',
        params: {
          id: bussId,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
