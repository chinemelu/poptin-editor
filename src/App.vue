<template>
  <div class="app">
    <div class="app__container">
      <main class="app__main">
          <Canvas />
      </main>
      <nav class="app__sidenav">
        Yoo
      </nav>
    </div>
  </div>
</template>

<script>
import Canvas from '@/components/Canvas'
export default {
  name: 'App',
  components: {
    Canvas
  }
}
</script>

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5% 
}

body {
  font-family: 'Montserrat', sans-serif;
  font-family: 'Poppins', sans-serif;
}

.app {
  background-color: #F5F7FD;
  width: 100%;
  min-height: 100vh;
}
.app__container {
  display: flex;
  font-size: 1.6rem;
}
.app__main {
  flex-basis: 70%;
  min-height: 100vh;
}
.app__sidenav {
  display: block;
  background-color: #fff;
  flex: 1;
  padding: 1.5rem 2rem
}
</style>
