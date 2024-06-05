<template>
    <div class="flex flex-col items-center justify-center w-screen h-screen px-10">
        <p class="font-semibold text-24 w-[264px] text-center">Akun Anda telah terblokir</p>
        <img src="../../public/assets/img/suspended-account.png" alt="suspended-account" class="mb-5">
        <p class="text-[#0094FF] font-normal text-14 w-[218px] text-center mb-10">Silahkan <span class="underline">contact support</span> untuk melihat detail info akun kamu</p>
        <BaseButton @click="$router.push({ name: 'home' })" text="Kembali" class="mx-20"/>
    </div>
</template>

<script>
import BaseButton from '../components/BaseButton.vue'

export default {
    components: {
        BaseButton
    }
}
</script>

<style></style>