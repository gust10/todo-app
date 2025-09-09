<script>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import TaskItem from './TaskItem.vue';

export default {
  name: 'TaskList',
  components: {
    TaskItem,
  },
  setup() {
    const newTask = ref('');
    const tasks = ref([]);
    const taskInput = ref(null);

    const fetchTasks = () => {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        tasks.value = JSON.parse(savedTasks);
      }
    };

    const saveTasks = () => {
      localStorage.setItem('tasks', JSON.stringify(tasks.value));
    };

    const addTask = () => {
      if (newTask.value.trim() !== '') {
        tasks.value.unshift({ id: Date.now(), text: newTask.value, done: false });
        newTask.value = '';
      }
    };

    const deleteTask = (taskId) => {
      tasks.value = tasks.value.filter(task => task.id !== taskId);
    };

    const editTask = (taskId, newText) => {
      const task = tasks.value.find(task => task.id === taskId);
      if (task) {
        task.text = newText;
      }
    };

    const toggleTask = (taskId) => {
      const task = tasks.value.find(task => task.id === taskId);
      if (task) {
        task.done = !task.done;
      }
    };

    const shuffleTasks = () => {
      tasks.value.sort(() => Math.random() - 0.5);
    };

    const handleAddTask = () => {
      taskInput.value.focus();
    };

    onMounted(() => {
      fetchTasks();
      shuffleTasks();
      window.electronAPI.onAddTask(handleAddTask);
      window.electronAPI.onShuffleTasks(shuffleTasks);
    });

    onUnmounted(() => {
      // No direct way to remove listener with contextBridge, but good practice to have
    });

    watch(tasks, saveTasks, { deep: true });

    return {
      newTask,
      tasks,
      taskInput,
      addTask,
      deleteTask,
      editTask,
      toggleTask,
      shuffleTasks
    };
  }
};
</script>

<template>
  <div class="task-list-container">
    <input ref="taskInput" v-model="newTask" @keyup.enter="addTask" placeholder="Add a new task..." class="task-input"/>
    <button @click="shuffleTasks" class="shuffle-button">Shuffle</button>
    <ul>
      <TaskItem v-for="task in tasks" :key="task.id" :task="task" @delete="deleteTask" @edit="editTask" @toggle="toggleTask"/>
    </ul>
  </div>
</template>

<style scoped>
.task-list-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.task-input {
  width: 100%;
  padding: 15px 20px;
  border-radius: 1.5rem;
  border: none;
  margin-bottom: 20px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: #374151;
  font-size: 1.1em;
}

.task-input::placeholder {
  color: #9ca3af;
}

.shuffle-button {
  padding: 12px 25px;
  border-radius: 1.5rem;
  background-color: #fecdd3;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
  font-family: 'Comic Neue', cursive;
  font-weight: bold;
  font-size: 1.2em;
  color: #881337;
  transition: transform 0.2s;
}

.shuffle-button:hover {
  transform: scale(1.05);
}
</style>
