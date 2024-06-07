<template>
    <base-header title="Transfer" />
    <div class="flex flex-col items-center justify-start px-8 h-full w-full">
        <div class="w-full mb-10">
            <p class="font-semibold text-24 mb-4">Transfer Berhasil</p>
            <div class="p-4 shadow-lg rounded-lg">
                <hr class="w-full mb-4">
                <div class="mb-4">
                    <p class="font-normal text-12 mb-1">Nama Pegirim</p>
                    <p class="font-semibold text-14" v-if="transaction_detail.user">{{ transaction_detail.user.firstname + ' ' + transaction_detail.user.lastname }}</p>
                </div>
                <div class="mb-4">
                    <p class="font-normal text-12 mb-1">Tanggal Transaksi</p>
                    <p class="font-semibold text-14">{{ transaction_detail.created_at }}</p> 
                </div>
                <div class="mb-4">
                    <p class="font-normal text-12 mb-1">Nomor Transaksi</p>
                    <p class="font-semibold text-14">{{ transaction_detail.transaction_code }}</p>
                </div>
                <div class="mb-4">
                    <p class="font-normal text-12 mb-1">Nama Penerima</p>
                    <p class="font-semibold text-14" v-if="transaction_detail.user_bank">{{ transaction_detail.user_bank.account_name }}</p>
                </div>
                <div class="mb-4">
                    <p class="font-normal text-12 mb-1">BANK</p>
                    <p class="font-semibold text-14" v-if="transaction_detail.user_bank">Bank {{ transaction_detail.user_bank.bank.name }}</p>
                </div>
                <div class="mb-4">
                    <p class="font-normal text-12 mb-1">Nomor Rekening</p>
                    <p class="font-semibold text-14" v-if="transaction_detail.user_bank">{{ transaction_detail.user_bank.rekening_number }}</p>
                </div>
                <div class="mb-4">
                    <p class="font-normal text-12 mb-1">Nominal</p>
                    <p class="font-semibold text-14">Rp {{ transaction_detail.amount }}</p>
                </div>
                <p class="text-primary font-bold text-14">Download</p>
            </div>
        </div>
        <base-button @click="backToHome" text="Kembali" />
    </div>
</template>

<script>
import BaseButton from '../components/BaseButton.vue'
import BaseHeader from '../components/BaseHeader.vue'
export default {
    components: { BaseHeader, BaseButton },
    data() {
        return {
            transaction_id: this.$route.params.transaction_id,
            transaction_detail: ''
        }
    },
    methods: {
        getTransactionDetail() {
            this.axios.get(`transaction/${this.transaction_id}`).then(response => {
                this.transaction_detail = response.data.data
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            })
        },
        backToHome() {
            this.$router.push({
                name: 'home'
            })
        },
        formatNumber(number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }
    },
    mounted() {
        this.getTransactionDetail()
    }
}
</script>

<style></style>