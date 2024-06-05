<template>
    <button class="w-full rounded-lg text-14 font-semibold text-center py-4" :class="`bg-${background} text-${text_color}`">
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
        text_color: {
            type: String,
            default: 'white'
        },
        background: {
            type: String,
            default: 'primary'
        }
    },
    mounted() {
    }
}
</script>

<style>

</style>