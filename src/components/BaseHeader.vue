<template>
    <div
        class="flex flex-col items-center bg-gradient-to-r from-primary to-[#0D1F35] rounded-b-[100px] w-full px-8 pt-14 mb-9 h-[145px]">
        <img @click="$router.go(-1)" class=" z-10 self-start" src="/public/assets/icon/back-arrow-icon.png"
            alt="back-arrow-icon">
        <p class=" z-10 text-white font-semibold text-20">{{ title }}</p>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        }
    },
    mounted() {
        // this.$store.dispatch('logout')
    }
}
</script>

<style></style>