<template>
    <button class="w-full rounded-lg text-white text-14 font-semibold text-center py-4" :class="`bg-${background}`">
        {{ text }}
    </button>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            required: true
        },
        background: {
            type: String,
            default: 'primary'
        }
    }
}
</script>

<style>

</style>