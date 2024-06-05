<template>
    <base-header title="Mandiri" />
    <div class="flex flex-col items-start justify-start px-8 w-full">
        <p class="font-semibold text-14 mb-5">Isi Saldo dengan Mandiri</p>
        <img src="/public/assets/logo/payment_methods/mandiri.png" alt="mandiri" class="mb-2">

        <div class="font-normal w-full border border-grey rounded-lg py-7 text-center mb-7">
            <p class="text-12 mb-3">Nomor Virtual Account Mandiri</p>
            <p class="text-20 text-primary-red mb-4">9678 0 5673 4512 3349</p>
            <button
                class="text-primary bg-white border-2 border-primary py-1 px-3 font-semibold text-14 rounded-md mb-5">Salin
                Kode</button>
            <p class="text-12">Nama Akun: YUNIA AMELIA CHAIRUNISA</p>
        </div>

        <div class="w-full">
            <p class="font-semibold text-14 mb-3">Ikuti Instruksi Di Bawah Ini</p>
            <div class="flex items-center justify-between w-full rounded-2xl border border-grey py-4 px-6 mb-5">
                <p class="font-normal text-12">Mobile Banking Mandiri</p>
                <img src="/public/assets/icon/chevron-down.png" alt="chevron-down">
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
        }
    },
    methods: {
    },
}
</script>

<style></style>