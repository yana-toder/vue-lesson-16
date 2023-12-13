<template>
  <main-master-page>
    <div>
      <div class="main">Address:</div>
      <div>
        <ul>
          <li>Street: 123 Main Street</li>
          <li>New York Country: USA</li>
        </ul>
      </div>
    </div>
  </main-master-page>
</template>

<script>
import MainMasterPage from '@/masterpages/MainMasterPage.vue'
export default {
  name: 'ContactsView',
  components: {
    MainMasterPage,
  },
}
</script>

<style lang="scss" scoped>
.main {
  font-weight: 600;
  margin-bottom: 10px;
}
</style>
