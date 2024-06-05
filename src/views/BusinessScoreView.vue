<template>
    <div class="flex flex-col items-center justify-between px-8 w-full h-screen pt-14 pb-14">
        <img @click="$router.push('/')" class="z-10 self-start" src="/public/assets/icon/back-arrow-icon.png" alt="back-arrow-icon">
        <p class="z-10 text-white font-semibold text-20">Skor Keamanan</p>
        <div class="h-[145px] bg-gradient-to-r from-primary to-[#0D1F35] rounded-b-[100px] w-full absolute top-0"></div>

        <div class="flex flex-col items-center justify-between h-full">
            <div class="flex flex-col items-center justify-start mt-20 w-full mb-8">
                <img src="/public/assets/img/avatar.png" alt="avatar" class="mb-2">
                <p class="text-18 font-semibold mb-8">{{ user.firstname + ' ' + user.lastname }} </p>
                <p class="font-semibold text-24 mb-6">Skor Keamanan Anda</p>
                <p class="font-semibold text-48 mb-3" :class="getTrustScoreColor(user.trust_score)">{{ user.trust_score }}</p>
                <p class="text-grey text-12">Dari 10</p>
            </div>
    
            <div class="w-full">
                <p class="font-semibold text-16 mb-5">Bisnis Unggulan</p>
                <div class="flex items-center justify-start rounded-xl border border-[rgb(196,196,196)] px-3 py-1 mb-6">
                    <img src="/public/assets/logo/tokopedia.png" alt="tokopedia" class="mr-2">
                    <div>
                        <p class="text-[#0094FF] text-12 mb-1">tokopedia.com</p>
                        <p class="text-grey text-10">E-commerce terbesar di Indonesia. Tempat berkumpulnya toko-toko terpercaya di Indonesia</p>
                    </div>
                </div>
                <div class="flex items-center justify-start rounded-xl border border-[rgb(196,196,196)] px-3 py-1 mb-6">
                    <img src="/public/assets/logo/shopee.png" alt="shopee" class="mr-2">
                    <div>
                        <p class="text-[#0094FF] text-12 mb-1">shopee.com</p>
                        <p class="text-grey text-10">Shopee adalah tempat berbelanja no 1 Di Indonesia.</p>
                    </div>
                </div>
                <p class="text-grey text-12 w-full text-center">Lihat semua ></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: this.$store.getters.userDetail
        }
    },
    methods: {
        getProfile() {
            this.$store.dispatch('getProfile').then(response => {
                console.log(this.user);
            }).catch(error => {
                console.log(error);
            })
        },
        getTrustScoreColor(score) {
            if (score > 8) {
                return 'text-primary-green'
            } else if (score > 6) {
                return 'text-primary-yellow'
            } else {
                return 'text-primary-red'
            }
        }
    },
    mounted() {
        // this.getProfile()
    }
}
</script>

<style></style>