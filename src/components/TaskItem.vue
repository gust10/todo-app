<template>
  <li
    class="task-item"
    :class="{ done: task.done }"
    :style="{ backgroundColor: randomColor }"
  >
    <input type="checkbox" :checked="task.done" @change="toggleTask" class="task-checkbox"/>
    <span v-if="!isEditing" @dblclick="startEditing" class="task-text">{{ task.text }}</span>
    <input v-else v-model="editText" @keyup.enter="finishEditing" @blur="finishEditing" class="task-edit-input" ref="editInput"/>
    <div class="task-actions">
      <button @click="startEditing" class="edit-button">✏️</button>
      <button @click="deleteTask" class="delete-button">🗑️</button>
    </div>
  </li>
</template>

<script>
import { ref, nextTick, onMounted } from 'vue';

export default {
  name: 'TaskItem',
  props: {
//... existing code
    task: {
      type: Object,
      required: true
    }
  },
  emits: ['delete', 'edit', 'toggle'],
  setup(props, { emit }) {
//... existing code
    const isEditing = ref(false);
    const editText = ref(props.task.text);
    const editInput = ref(null);
    const randomColor = ref('');
    const pastelColors = ['#fecdd3', '#d1fae5', '#bfdbfe', '#e9d5ff', '#fef3c7'];

    onMounted(() => {
      randomColor.value = pastelColors[Math.floor(Math.random() * pastelColors.length)];
    });

    const deleteTask = () => {
      emit('delete', props.task.id);
    };

    const toggleTask = () => {
      emit('toggle', props.task.id);
    };

    const startEditing = () => {
//... existing code
      isEditing.value = true;
      nextTick(() => {
        editInput.value.focus();
      });
    };

    const finishEditing = () => {
//... existing code
      if (isEditing.value) {
        isEditing.value = false;
        if (editText.value.trim() !== '') {
          emit('edit', props.task.id, editText.value);
        } else {
          editText.value = props.task.text;
        }
      }
    };

    return {
      isEditing,
      editText,
      editInput,
      randomColor,
      deleteTask,
      toggleTask,
      startEditing,
      finishEditing
    };
  }
};
</script>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 20px;
  margin-bottom: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  color: #374151;
}

.task-item.done {
  background-color: #f0fdf4 !important;
}

.task-item.done .task-text {
  text-decoration: line-through;
  color: #9ca3af;
}

.task-checkbox {
  margin-right: 15px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  appearance: none;
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: relative;
}

.task-checkbox:checked {
  background-color: #34d399;
  border-color: #34d399;
}

.task-checkbox:checked::after {
  content: '✔';
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
}

.task-text {
  flex-grow: 1;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}

.task-edit-input {
  flex-grow: 1;
  border: none;
  background: transparent;
  font-size: 1em;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: #374151;
}

.task-actions {
  display: flex;
  gap: 10px;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.task-item:hover .task-actions {
  opacity: 1;
}

.edit-button, .delete-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  transition: transform 0.2s;
}

.edit-button:hover, .delete-button:hover {
  transform: scale(1.2);
}
</style>
