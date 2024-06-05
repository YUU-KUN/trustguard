<template>
    <div class="flex flex-col items-center justify-start px-8 w-full h-screen pt-14">
        <div class="flex items-center justify-between w-full mb-7 z-10">
            <div class="text-white">
                <p class="text-18 mb-2">Hello, {{ user.firstname + ' ' + user.lastname }} </p>
                <p class="text-10">Today is {{ today }}</p>
            </div>
            <img src="/public/assets/img/avatar.png" alt="avatar">
        </div>
        <div class="absolute top-0 z-0 w-full h-[184px] bg-gradient-to-r from-primary to-[#0D1F35] rounded-b-[100px]"></div>

        <div
            class="relative flex flex-col items-start justify-between bg-gradient-to-b from-primary to-[#0D1F35] w-full h-[125px] rounded-lg p-5 mb-5">
            <div>
                <p class="text-10 text-[#DEDEDE] mb-3">Total Saldo Kamu</p>
                <p class="font-semibold text-20 text-white">Rp. {{ formatAmount(amount) }}</p>
            </div>
            <div>
                <p class="text-10 text-[#DEDEDE] mb-1">Income per bulan</p>
                <p class="font-semibold text-12 text-white">0 x Rp. 0</p>
            </div>
            <img src="/public/assets/img/card-image.png" alt="card-image" class="absolute right-0 top-0">
        </div>

        <div class="w-full mb-3">
            <p class="font-semibold text-14 mb-4">Menu</p>
            <div class="grid grid-cols-4 gap-6">
                <div @click="$router.push({ name: menu.page })" v-for="menu in menus" :key="menu.page"
                    class="col-span-1 flex flex-col items-center justify-center w-full hover:cursor-pointer">
                    <div class="flex flex-col items-center justify-center border rounded-lg mb-2">
                        <img :src="menu.icon" :alt="menu.page">
                    </div>
                    <p class="text-12 text-grey">{{ menu.name }}</p>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-3 items-center justify-between rounded-lg bg-[#FF6C61] px-6 py-4 w-full">
            <div class="text-white col-span-2">
                <p class="font-semibold text-14 mb-1">Skor Keamanan Bisnis</p>
                <p class="text-10">Segera cek skor keamanan bisnis kamu</p>
            </div>
            <button @click="checkBusinessScore()" class="font-semibold text-12 text-primary bg-white rounded-md border-2 border-primary px-3 py-1">Skor Bisnis</button>
        </div>
        <!-- <div class="w-full bg-[#DEE6EF] px-6 py-4">
        </div> -->

        <div class="mb-3 w-full">
            <div class="flex items-center justify-between my-4">
                <p class="font-semibold text-14">Protection Safety</p>
                <p class="text-12 text-grey">Lihat semua ></p>
            </div>
            <div class="flex items-start gap-2 justify-start w-full h-[44px] py-1 mb-3">
                <div v-for="protection_safety_filter in protection_safety_filters" :key="protection_safety_filter.label"
                    class="bg-primary py-3 px-5 rounded-lg text-white">
                    <p class="text-12">{{ protection_safety_filter.name }}</p>
                </div>
            </div>

            <div v-if="is_fraud_detected"
                class="flex items-center justify-start w-full border border-[#DEDEDE] rounded-lg px-2 py-3">

                <img src="/public/assets/icon/transaction-status-warning.png" alt="transaction-status-warning" class="mr-2">
                <div class="text-[#333333]">
                    <p class="font-semibold text-primary-red text-12 mb-2">WARNING</p>
                    <p class="text-10">Ada transaksi mencurigakan kepada kamu, cek di notifikasi untuk lebih jelasnya.</p>
                </div>
            </div>
            <div v-else class="flex items-center justify-start w-full border border-[#DEDEDE] rounded-lg px-2 py-3">
                <img src="/public/assets/icon/transaction-status-safe.png" alt="transaction-status-safe" class="mr-2">
                <div class="text-[#333333]">
                    <p class="font-semibold text-12 mb-2">Belum ada transaksi mencurigakan sejauh ini</p>
                    <p class="text-10">Gunakan aplikasi TrustGuard AI untuk melakukan transaksi dan rasakan keamanannya</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            user: '',
            today: '',
            amount: 0,
            menus: [
                {
                    name: 'Bayar',
                    icon: '/public/assets/icon/menu-bayar.png',
                    page: 'bayar'
                },
                {
                    name: 'Isi Saldo',
                    icon: '/public/assets/icon/menu-isi-saldo.png',
                    page: 'topup'
                },
                {
                    name: 'Transfer',
                    icon: '/public/assets/icon/menu-tarik-saldo.png',
                    page: 'transfer'
                },
                {
                    name: 'E-Money',
                    icon: '/public/assets/icon/menu-e-wallet.png',
                    page: 'e-money'
                },
                {
                    name: 'Top Up',
                    icon: '/public/assets/icon/menu-top-up.png',
                    page: 'top-up'
                },
                {
                    name: 'Investasi',
                    icon: '/public/assets/icon/menu-investasi.png',
                    page: 'imvestasi'
                },
                {
                    name: 'Tabungan',
                    icon: '/public/assets/icon/menu-tabungan.png',
                    page: 'tabungan'
                },
                {
                    name: 'Lainnya',
                    icon: '/public/assets/icon/menu-lainnya.png',
                    page: 'lainnya'
                },
            ],
            current_protection_safety_filters: 'today',
            protection_safety_filters: [
                {
                    name: 'Hari ini',
                    label: 'today',
                },
                {
                    name: 'Minggu ini',
                    label: 'this_week',
                },
                {
                    name: 'Bulan ini',
                    label: 'this_month',
                },
                // {
                //     name: '1 tahun',
                //     label: 'this_year',
                // },
            ],
            is_fraud_detected: false,
        }
    },
    methods: {
        checkAvailableFraudTransaction() {
            this.axios.get('available-fraud-transaction').then(response => {
                console.log(response.data);
                this.is_fraud_detected = response.data.data
            }).catch(error => {
                console.log(error);
            })
        },
        getProfile() {
            this.axios.get('profile').then(response => {
                this.user = response.data.data
                this.amount = this.user.balance
                console.log(this.user);
            }).catch(error => {
                console.log(error);
            })
        },
        formatAmount(amount) {
            // from 1000000 to 1.000.000
            return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        checkBusinessScore() {
            this.$router.push({
                name: 'business-score'
            })
        }
    },
    mounted() {
        // this.$store.dispatch('logout')
        this.getProfile()
        this.checkAvailableFraudTransaction()
        this.today = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
    }
}
</script>

<style></style>