<template>
  <div class="container">
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        v-model="driverData.title"
        label="Drivers name"
        hide-details="auto"
      ></v-text-field>
      <v-text-field
        v-model="driverData.experience"
        label="Drivers experience"
        hide-details="auto"
      ></v-text-field>
    </v-responsive>
    <v-btn class="btn" @click="onAction">{{ actionButton }}</v-btn>
    <v-btn class="btn" @click="onCancel">Cancel</v-btn>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'DriversEdit',
  data() {
    return {
      driverData: {},
      driverDataCopy: null,
    }
  },
  computed: {
    ...mapGetters('drivers', ['getDriverById']),
    receivedDriverId() {
      return this.$route.params.id
    },
    actionButton() {
      return this.receivedDriverId ? 'Save' : 'Add driver'
    },
  },

  created() {
    this.driverData = {...this.getDriverById(this.receivedDriverId)}
    this.driverDataCopy = this.getDriverById(this.receivedDriverId)
  },
  methods: {
    ...mapActions('drivers', ['addItem', 'updateItem']),
    onAction() {
      if (this.receivedDriverId) {
        const data = {}
        if (this.driverData.title !== this.driverDataCopy.title)
          data.title = this.driverData.title
        if (this.driverData.experience !== this.driverDataCopy.experience)
          data.experience = this.driverData.experience
        this.updateItem({
          itemId: this.driverData.id,
          data,
        })
      } else this.addItem(this.driverData)

      this.$router.push({name: 'drivers'})
    },
    onCancel() {
      this.$router.push({name: 'drivers'})
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 600px;
  padding: 40px;
  align-items: center;
}
.btn {
  margin-top: 20px;
}
</style>
