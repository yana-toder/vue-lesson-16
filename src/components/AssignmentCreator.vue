<template>
  <div>
    <h3>New assignment</h3>
    <v-row>
      <v-col>
        <div>Driver</div>
        <v-col class="v-col-6">
          <v-select
            v-model="assignment.driverId"
            density="compact"
            label="Driver"
            variant="solo"
            item-title="title"
            item-value="id"
            :items="getDriversList"
          ></v-select>
        </v-col>
        <div>Buss</div>
        <v-col class="v-col-6">
          <v-select
            v-model="assignment.bussId"
            label="Buss"
            density="compact"
            item-value="id"
            variant="solo"
            item-title="licensePlate"
            :items="getBussesList"
          ></v-select>
        </v-col>
      </v-col>
    </v-row>
    <v-btn class="btn" @click="onAdd">Add assignment</v-btn>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'AssignmentCreator',
  data() {
    return {
      assignment: {},
    }
  },
  computed: {
    ...mapGetters('drivers', ['getDriversList']),
    ...mapGetters('busses', ['getBussesList']),
  },
  created() {
    this.loadDriversList()
    this.loadBussesList()
  },
  methods: {
    ...mapActions('drivers', ['loadDriversList']),
    ...mapActions('busses', ['loadBussesList']),
    ...mapActions('assignment', ['addItem']),

    onAdd() {
      this.addItem(this.assignment)
      this.assignment = {}
    },
  },
}
</script>

<style lang="scss" scoped>
h3 {
  color: #f9a825;
}
</style>
