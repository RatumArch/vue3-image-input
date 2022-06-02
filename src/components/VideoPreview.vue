<template>
<video :src="src" :controls="controls" ></video>
</template>

<script setup lang="ts">
defineProps(['src', 'controls'])
</script>