<template>
<img :src="src ?? CoverUrl" :alt="alt" />
</template>

<script setup lang="ts">
import CoverUrl from '../assets/picture-icon2.svg'
defineProps(['src', 'alt'])
</script>