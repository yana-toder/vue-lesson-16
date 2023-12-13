<template>
  <div class="container">
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        v-model="bussData.licensePlate"
        label="License plate"
        hide-details="auto"
      ></v-text-field>
      <v-text-field
        v-model="bussData.numberOfSeats"
        label="Number of seats"
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
  name: 'BussesEdit',
  data() {
    return {
      bussData: {},
      bussDataCopy: null,
    }
  },
  computed: {
    ...mapGetters('busses', ['getBussById']),
    receivedBussId() {
      return this.$route.params.id
    },
    actionButton() {
      return this.receivedBussId ? 'Save' : 'Add buss'
    },
  },

  created() {
    this.bussData = {...this.getBussById(this.receivedBussId)}
    this.bussDataCopy = this.getBussById(this.receivedBussId)
  },
  methods: {
    ...mapActions('busses', ['addItem', 'updateItem']),
    onAction() {
      if (this.receivedBussId) {
        const data = {}
        if (this.bussData.licensePlate !== this.bussDataCopy.licensePlate)
          data.licensePlate = this.bussData.licensePlate
        if (this.bussData.numberOfSeats !== this.bussDataCopy.numberOfSeats)
          data.numberOfSeats = this.bussData.numberOfSeats
        this.updateItem({
          itemId: this.bussData.id,
          data,
        })
      } else this.addItem(this.bussData)

      this.$router.push({name: 'busses'})
    },
    onCancel() {
      this.$router.push({name: 'busses'})
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
