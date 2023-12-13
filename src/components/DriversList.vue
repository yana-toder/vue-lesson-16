<template>
  <main-master-page>
    <filter-drivers />
    <v-table class="mb-4">
      <thead>
        <tr>
          <th class="text-left font-weight-bold">Driver's name</th>
          <th class="text-left font-weight-bold">Driver's experience</th>
          <th class="text-center font-weight-bold">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="driver in getFilteredDriversList" :key="driver.id">
          <td>{{ driver.title }}</td>
          <td>{{ driver.experience }}</td>
          <td>
            <button @click="onEdit(driver.id)">
              <font-awesome-icon :icon="['fas', 'pencil']" />
            </button>
          </td>
          <td>
            <button @click="deleteDriver(driver.id)">
              <font-awesome-icon :icon="['fas', 'trash-can']" />
            </button>
          </td>
        </tr>
      </tbody>
    </v-table>
    <router-link :to="{name: 'drivers-config'}" class="btn"
      >Add driver</router-link
    >
  </main-master-page>
</template>

<script>
import MainMasterPage from '@/masterpages/MainMasterPage.vue'
import FilterDrivers from '@/components/FilterDrivers.vue'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'DriversList',
  components: {
    MainMasterPage,
    FilterDrivers,
  },

  data() {
    return {}
  },
  computed: {
    ...mapGetters('drivers', ['getFilteredDriversList', 'getDriverById']),
  },
  created() {
    this.loadDriversList()
  },

  methods: {
    ...mapActions('drivers', ['loadDriversList', 'deleteDriver']),

    onEdit(driverId) {
      this.$router.push({
        name: 'drivers-config',
        params: {
          id: driverId,
        },
      })
    },
  },
}
</script>

<style lang="scss">
.btn {
  cursor: pointer;
  text-decoration: none;
  color: black;
  padding: 10px 15px;
  background-color: #f9a825;
  border-radius: 5px;
  @media (any-hover: hover) {
    &:hover {
      background-color: #fbc02d;
      transition: background-color 0.3s ease 0s;
    }
  }
}
</style>
