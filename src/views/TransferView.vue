<template>
    <base-header title="Transfer" />
    <div class="flex flex-col items-center justify-start px-8 w-full">

        <!-- Search -->
        <div class="rounded-3xl border border-grey p-4 flex items-center justify-between w-full mb-7">
            <input class="w-full focus:outline-none text-12 font-normal" type="text"
                placeholder="Pilih Bank Tujuan Kamu">
            <img src="/public/assets/icon/search.png" alt="search" class="h-5 w-5">
        </div>

        <div class="w-full mb-9">
            <p class="text-14 font-semibold mb-7">Transfer Terakhir</p>
            <!-- <div class="flex items-center justify-between border-b border-b-grey mb-3">
                <div class="flex items-center justify-start">
                    <img src="/public/assets/logo/payment_methods/mandiri.png" alt="mandiri" class="mr-1">
                    <p class="text-12 font-normal">INDRA WAHYU</p>
                </div>
                <img src="/public/assets/icon/chevron-down.png" alt="chevron-down">
            </div> -->
            <div @click="continueTransfer(transaction)" v-for="transaction in last_transaction" :key="transaction"
                class="flex items-center justify-between border-b border-b-grey mb-4">
                <div class="flex items-center justify-start">
                    <img src="/public/assets/logo/payment_methods/mandiri.png" alt="mandiri" class="mr-1">
                    <p class="text-12 font-normal">{{ transaction.user_bank.account_name }}</p>
                    <!-- <pre>{{ transaction.user_bank.rekening_number }}</pre> -->
                </div>
                <img src="/public/assets/icon/chevron-down.png" alt="chevron-down">
            </div>
        </div>


        <!-- Transfer Bank -->
        <div class="w-full mb-7">
            <div class="flex items-center justify-between w-full mb-3">
                <p class="text-14 font-semibold">Transfer Bank</p>
                <p class="text-12 font-normal text-grey">Lihat semua ></p>
            </div>
            <!-- Card -->
            <div v-for="bank in banks" :key="bank" @click="getToDetailPayment(bank.id)"
                class="flex items-center justify-between rounded-xl shadow-2xl px-6 py-2 mb-4">
                <p>{{ bank.name }}</p>
                <div v-for="image in bank.images" :key="image">
                    <img :src="`/public/assets/logo/payment_methods/${image}`" :alt="image" class="mr-3">
                </div>
                <p class="text-grey">></p>
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
            last_transaction: [],
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
        getLastTransaction() {
            this.axios.get('last-transfer').then(response => {
                this.last_transaction = response.data.data
                console.log(this.last_transaction);
            }).catch(error => {
                console.log(error);
            })
        },
        getBanks() {
            this.axios.get('bank').then(response => {
                this.banks = response.data.data
            }).catch(error => {
                console.log(error);
            })
        },
        filterPaymentMethods() {
            this.banks = this.payment_methods.filter(method => {
                return method.type == 'bank'
            })
            this.agents = this.payment_methods.filter(method => {
                return method.type == 'agent'
            })
        },
        getToDetailPayment(bank_id) {
            this.$router.push({
                name: 'transfer-detail',
                params: {
                    bank_id
                }
            })
        },
        continueTransfer(transaction) {
            console.log(transaction);
            this.$router.push(`/transfer/${transaction.user_bank.bank_id}?account_number=${transaction.user_bank.rekening_number}`)
            // this.$router.push({
            //     name:transfer-detail,
            //     params: {
            //         bank_id: transaction.user_bank.bank_id
            //     }
            // })
        }

    },
    mounted() {
        this.getLastTransaction()
        // this.filterPaymentMethods()
        this.getBanks()
    }
}
</script>

<style></style>