<template>
  <v-table class="mb-8">
    <thead>
      <tr>
        <th class="text-left font-weight-bold">Driver</th>
        <th class="text-left font-weight-bold">Buss license plate</th>
        <th class="text-left font-weight-bold">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="assignment in getFilledAssignmentsList" :key="assignment.id">
        <td>{{ assignment.driverName }}</td>
        <td>{{ assignment.bussNumber }}</td>
        <td>
          <button @click="deleteItem(assignment.id)">
            <font-awesome-icon :icon="['fas', 'trash-can']" />
          </button>
        </td>
      </tr>
    </tbody>
    <v-divider></v-divider>
  </v-table>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'AssignmentsList',
  computed: {
    ...mapGetters('assignment', ['getFilledAssignmentsList']),
  },

  created() {
    this.loadList()
    this.loadDriversList()
    this.loadBussesList()
  },
  methods: {
    ...mapActions('assignment', ['loadList', 'deleteItem']),
    ...mapActions('drivers', ['loadDriversList']),
    ...mapActions('busses', ['loadBussesList']),
  },
}
</script>

<style lang="scss" scoped></style>
