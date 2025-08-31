<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const modelId = Number(route.query.model)

onMounted(() => {
    if (!modelId || isNaN(modelId)) {
        router.push('/')
    }
})
</script>

<template>
    <div class="card-container">
        <h1>Car Card for {{ modelId }}</h1>
    </div>
</template>

<style scoped>
.card-container {
    padding: 16px;
}
</style>