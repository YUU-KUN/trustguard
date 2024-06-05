<template>
    <base-header title="Isi Saldo" />
    <div class="flex flex-col items-center justify-start px-8 w-full">

        <!-- Search -->
        <div class="rounded-3xl border border-grey p-4 flex items-center justify-between w-full mb-7">
            <input class="w-full focus:outline-none text-12 font-normal" type="text"
                placeholder="Ingin isi saldo melalui apa?">
            <img src="/public/assets/icon/search.png" alt="search" class="h-5 w-5">
        </div>

        <div class="w-full mb-11">
            <p class="text-14 font-semibold mb-7">Kartu Pembayaran Saya</p>
            <!-- Card -->
            <div class="flex items-center justify-start rounded-2xl shadow-2xl px-6 py-9">
                <img src="/public/assets/icon/plus-circle.png" alt="plus-circle" class="mr-3">
                <div>
                    <p class="text-16 font-semibold text-primary">Kartu Baru</p>
                    <img src="/public/assets/icon/visa.png" alt="visa">
                </div>
            </div>
        </div>

        <!-- Transfer Bank -->
        <div class="w-full mb-7">
            <div class="flex items-center justify-between w-full mb-3">
                <p class="text-14 font-semibold">Transfer Bank</p>
                <p class="text-12 font-normal text-grey">Lihat semua ></p>
            </div>
            <!-- Card -->
            <div v-for="bank in banks" :key="bank"
                class="flex items-center justify-between rounded-xl shadow-2xl px-6 py-2 mb-4">
                <div v-for="image in bank.images" :key="image">
                    <img :src="`/public/assets/logo/payment_methods/${image}`" :alt="image" class="mr-3">
                </div>
                <p @click="getToDetailPayment(bank.name)" class="text-grey">></p>
            </div>
        </div>

    </div>
</template>

<script>
import BaseHeader from '../components/BaseHeader.vue'
export default {
    components: { BaseHeader },
    data() {
        return {
            payment_methods: [
                {
                    name: 'BCA',
                    type: 'bank',
                    images: ['bca.png']
                },
                {
                    name: 'Mandiri',
                    type: 'bank',
                    images: ['mandiri.png']
                },
                {
                    name: 'Indomaret',
                    type: 'agent',
                    images: ['indomaret.png']
                },
                {
                    name: 'Alfamart',
                    type: 'agent',
                    images: ['alfamart.png']
                },
                {
                    name: 'Alfamidi',
                    type: 'agent',
                    images: ['alfamidi.png']
                },
            ],
            banks: [],
            agents: [],
        }
    },
    methods: {
        filterPaymentMethods() {
            this.banks = this.payment_methods.filter(method => {
                return method.type == 'bank'
            })
            this.agents = this.payment_methods.filter(method => {
                return method.type == 'agent'
            })
        },
        getToDetailPayment(payment_method) {
            this.$router.push({
                name: 'topup-detail',
                params: {
                    payment_method
                }
            })
        }
    },
    mounted() {
        this.filterPaymentMethods()
    }
}
</script>

<style></style>