<template>
  <v-row class="d-flex align-content-center align-center">
    <v-col class="v-col-4 d-flex align-content-center align-center">
      <v-text-field
        v-model="filterData.title"
        label="Search drivers"
        density="compact"
        single-line
        variant="solo"
        append-inner-icon="mdi-magnify"
      ></v-text-field>
    </v-col>
    <v-col class="v-col-6 d-flex align-content-center align-center">
      <div class="text-center">Experience</div>
      <v-col class="v-col-4">
        <v-select
          v-model="filterData.expMin"
          density="compact"
          label="from"
          variant="solo"
          :items="getDriversExp"
        ></v-select>
      </v-col>
      <v-col class="v-col-4">
        <v-select
          v-model="filterData.expMax"
          label="to"
          density="compact"
          variant="solo"
          :items="getDriversExp"
        ></v-select>
      </v-col>
    </v-col>
    <v-row>
      <v-btn class="button" @click="onReset">Reset</v-btn>
    </v-row>
  </v-row>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'FilterDrivers',

  data() {
    return {
      filterData: {},
    }
  },
  computed: {
    ...mapGetters('drivers', ['getDriversList']),
    getDriversExp() {
      return this.getDriversList.map((item) => item.experience)
    },
  },
  watch: {
    filterData: {
      handler(newFilterValue) {
        this.updateFilter(newFilterValue)
      },
      deep: true,
    },
  },
  created() {
    this.loadList()
  },
  methods: {
    ...mapActions('drivers', ['loadList', 'updateFilter']),
    onReset() {
      this.filterData = {}
    },
  },
}
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  align-items: flex-end;
}
.button {
  //  margin-top: -20px;
  margin-bottom: 20px;
}
</style>
