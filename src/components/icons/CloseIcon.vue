<template>
<img :src="src ?? CloseIcon" :alt="alt" />
</template>

<script setup lang="ts">
import CloseIcon from '../../assets/close.svg'
defineProps(['src', 'alt'])
</script>