<template>
    <div class="flex flex-col items-center justify-start px-8 w-full pt-14">
        <!-- <img class="z-10 self-start" src="/public/assets/icon/back-arrow-icon.png" alt="back-arrow-icon"> -->
        <p class="z-10 text-white font-semibold text-20">Notifikasi</p>
        <div class="h-[145px] bg-gradient-to-r from-primary to-[#0D1F35] rounded-b-[100px] w-full absolute top-0"></div>

        <div class="font-semibold mt-20 w-full mb-8">
            <p class="text-14 mb-5">Terkini</p>
            <!-- <div class="flex items-center justify-start p-3 border border-[#E5E5E5] rounded-8 w-full"> -->
            <!-- <div class="grid grid-cols-3 gap-7 p-3 border border-[#E5E5E5] rounded-8 w-full">
                <div class="col-span-2">
                    <p class="text-primary-red mb-2">Rekening Mencurigakan</p>
                    <div class="text-primary-blue font-normal text-10">
                        <p>Transaction: 2023-01-01 00:00:02</p>
                        <p>Card Type: Visa</p>
                    </div>
                </div>
                <div class="col-span-1 flex items-center justify-center">
                    <button class="border border-primary rounded-md px-3 py-1 text-primary">Periksa</button>
                </div>
            </div> -->
        </div>

        <!-- Transactions List -->
        <div class="w-full">
            <div v-for="transaction in Object.keys(transactions)" :key="transaction" class="mb-3">
                <p class="font-semibold text-14 mb-3">{{ getDate(transaction) }}</p>
                <div v-for="trans in transactions[transaction]" :key="trans"
                    class="grid grid-cols-6 gap-3 mb-2 items-center">
                    <div class="col-span-1 flex items-start justify-center h-full">
                        <img v-if="trans.is_fraud_detected" src="/public/assets/icon/transaction-status-warning.png"
                            alt="transaction-status-warning">
                        <img v-else src="/public/assets/icon/transaction-status-secure.png" alt="transaction-status-secure">
                    </div>
                    <div class="col-span-5 ">
                        <div class="bg-white rounded-2xl rounded-bl-none py-3 px-5 shadow-2xl mb-2">
                            <p class="text-10">Transaksi dengan {{ trans.user_bank.account_name }} {{
                                trans.is_fraud_detected ? 'tidak aman' : 'aman' }}</p>
                        </div>
                        <p v-if="trans.is_fraud_detected" @click="goToTransaction(transaction)" class="col-span-5 text-primary text-12">Periksa</p>

                    </div>
                </div>
                <div class="grid grid-cols-6 gap-3">
                    <div class="col-span-1"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            transactions: [],
            // transactions: [
            //     {
            //         "2023-11-12": [
            //             {
            //                 merchant_id: 2053,
            //                 is_safe: false,
            //                 date: '2023-11-12 00:00:02',
            //             },
            //         ],
            //     },
            //     {
            //         "2023-11-11": [
            //             {
            //                 merchant_id: 2033,
            //                 is_safe: false,
            //                 date: '2023-11-11 00:00:02',
            //             },
            //             {
            //                 merchant_id: 2027,
            //                 is_safe: true,
            //                 date: '2023-11-11 00:00:02',
            //             },
            //         ],
            //     },
            //     {
            //         "2023-11-10": [
            //             {
            //                 merchant_id: 2060,
            //                 is_safe: false,
            //                 date: '2023-11-10 00:00:02',
            //             },
            //         ],
            //     },
            //     {
            //         "2023-11-09": [
            //             {
            //                 merchant_id: 2027,
            //                 is_safe: true,
            //                 date: '2023-11-09 00:00:02',
            //             },
            //         ],
            //     },
            // ]
        }
    },
    methods: {
        getDate(transaction) {
            // 12 November
            const transaction_date = transaction;
            return new Date(transaction_date).toLocaleDateString('id-ID', { month: 'long', day: 'numeric' })
        },
        goToTransaction(transaction) {
            const transaction_id = this.transactions[transaction][0].id;
            this.$router.push({
                name: 'transaction-detail',
                params: {
                    transaction_id
                }
            })
        },
        getTransactions() {
            this.axios.get('transaction').then(response => {
                this.transactions = response.data.data
                console.log(this.transactions);
            }).catch(error => {
                console.log(error);
                console.log(error);
            })
        }
    },
    mounted() {
        this.getTransactions()
    }
}
</script>

<style></style>