<template>
  <div id="app" class="bg-pastel-blue/20 min-h-screen">
    <header class="app-header">
      <h1 class="text-5xl font-comic-neue font-bold text-gray-800">To-Do Randomizer</h1>
    </header>
    <main>
      <TaskList />
    </main>
  </div>
</template>

<script>
import TaskList from './components/TaskList.vue'

export default {
  name: 'App',
  components: {
    TaskList
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@700&family=Inter:wght@500&display=swap');

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.app-header {
  padding: 60px 20px 40px;
  -webkit-app-region: drag;
}

#app {
  padding-top: 30px;
}
</style>
