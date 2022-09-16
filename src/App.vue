<template>
  <main class="py-4 main">
    <article class="article">
      <HeaderComponent />
      <router-view />
    </article>
  </main>
</template>

<script>

import HeaderComponent from '@/components/HeaderComponent'
export default {
  name: 'App',
  components: { HeaderComponent }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background: #f3f4fb;
}
</style>
