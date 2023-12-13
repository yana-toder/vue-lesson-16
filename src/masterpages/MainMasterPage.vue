<template>
  <div>
    <v-container class="mb-6">
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/drivers">Our drivers</router-link> |
        <router-link to="/busses">Busses</router-link> |
        <router-link to="/assignments">Assignments</router-link> |
        <router-link to="/contacts">Contacts</router-link>
      </nav>
      <slot></slot>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'MainMasterPage',
}
</script>

<style lang="scss" scoped>
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #f9a825;
    }
  }
}
</style>
