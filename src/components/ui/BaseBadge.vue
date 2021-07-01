<template>
  <span class="badge" :class="type">
    {{ text }}
  </span>
</template>

<script>
export default {
  props: ['type', 'title'],
  computed: {
    text() {
      return this.title.toUpperCase()
    }
  }
}
</script>


<style scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.frontend {
  background-color: #3f3749;
  color: white;
}

.backend {
  background-color: #7a4188;
  color: white;
}

.career {
  background-color: #c554ad;
  color: white;
}
</style>