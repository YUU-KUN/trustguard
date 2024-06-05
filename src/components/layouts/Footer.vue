<template>
    <footer class="w-full absolute bottom-0 bg-white">
        <div class="grid grid-cols-4 gap-2 w-full">
            <RouterLink :to="{ name: 'home' }" class="p-4 flex flex-col items-center justify-center"
                active-class="border-t-2 border-t-primary text-primary">
                <img :src="isActive('home') ? '/public/assets/icon/home-active.png' : '/public/assets/icon/home.png'"
                    alt="home" class="mb-1">
                <p class="text-10">Beranda</p>
            </RouterLink>
            <RouterLink :to="{ name: 'notification' }" class="p-4 flex flex-col items-center justify-center"
                active-class="border-t-2 border-t-primary text-primary">
                <img :src="isActive('notification') ? '/public/assets/icon/notification-active.png' : '/public/assets/icon/notification.png'"
                    alt="notification" class="mb-1">
                <p class="text-10">Notifikasi</p>
            </RouterLink>
            <div class="p-4 flex flex-col items-center justify-center">
                <img src="/public/assets/icon/history.png" alt="history" class="mb-1">
                <p class="text-10 text-[#939393]">Riwayat</p>
            </div>
            <RouterLink :to="{ name: 'profile' }" class="p-4 flex flex-col items-center justify-center"
                active-class="border-t-2 border-t-primary text-primary">
                <img src="/public/assets/icon/user.png" alt="user" class="mb-1">
                <p class="text-10 text-[#939393]">Akun</p>
            </RouterLink>
        </div>
    </footer>
    <!-- <header class="w-full">
        <div class="flex items-center justify-between w-screen drop-shadow-md px-6 py-4">
            <div class="relative flex items-center w-full my-4">
                <img src="/public/assets/icon/arrow-left.png" alt="arrow-left" class="absolute">
                <div class="absolute flex items-center justify-center w-full">
                    <p class="absolute text-center font-semibold text-18">Pendaftaran</p>
                </div>
            </div>
        </div>
    </header> -->
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
    methods: {
        isActive(route) {
            return this.$route.name === route;
        }
    },
    components: { RouterLink }
}
</script>

<style></style>