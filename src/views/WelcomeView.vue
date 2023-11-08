<template>
    <div class="flex flex-col items-center justify-end w-full h-full">
        <img src="@/assets/logo/welcome-logo.png" alt="">
        <div class="relative flex flex-col items-center justify-center w-full h-1/2">
            <img src="@/assets/img/wave-network.png" alt="wave-blue" class="absolute z-30 bottom-0 w-full">
            <div class="relative flex flex-col items-center justify-center w-full h-full">
                <div class="absolute w-full h-full flex flex-col items-center justify-center z-30 text-center font-bold text-20 text-white">
                    <p class="w-[261px] leading-7">Selamat Datang di TrustShield</p>
                </div>
                <img src="@/assets/img/wave-grey.png" alt="wave-grey" class="absolute bottom-0 z-10 w-full">
                <img src="@/assets/img/wave-blue.png" alt="wave-blue" class="absolute bottom-0 z-20 w-full">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            timer: 5000 //miliseconds
        }
    },
    mounted() {
        setTimeout(() => {
            this.$router.push({name: 'login'})
        }, this.timer);
    }
}
</script>

<style></style>