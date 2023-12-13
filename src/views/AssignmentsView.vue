<template>
  <main-master-page>
    <assignments-list />
    <assignment-creator />
  </main-master-page>
</template>

<script>
import AssignmentCreator from '@/components/AssignmentCreator.vue'
import AssignmentsList from '@/components/AssignmentsList.vue'
import MainMasterPage from '@/masterpages/MainMasterPage.vue'

export default {
  name: 'AssignmentsView',
  components: {
    MainMasterPage,
    AssignmentsList,
    AssignmentCreator,
  },
}
</script>

<style lang="scss" scoped></style>
