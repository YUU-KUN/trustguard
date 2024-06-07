<template>
    <div class="flex flex-col items-center justify-start px-8 w-full pt-14">
        <img class="z-10 self-start" src="/public/assets/icon/back-arrow-icon.png" alt="back-arrow-icon">
        <p class="z-10 text-white font-semibold text-20">Detail Informasi</p>
        <div class="h-[145px] bg-gradient-to-r from-primary to-[#0D1F35] rounded-b-[100px] w-full absolute top-0"></div>

        <div class="font-semibold mt-20 w-full mb-8">
            <p class="text-14 mb-5">Informasi Rekening</p>
            <div class="mb-9">
                <!-- <p class="text-14">{{ getDate(transaction.date) }}</p> -->

                <!-- Card -->
                <div class="px-3 py-4 bg-white rounded-3xl shadow-2xl mb-4">
                    <p v-show="!transaction_detail.is_safe" class="text-primary-red test-14 mb-3">Rekening mencurigakan</p>
                    <div class="text-primary text-10 font-normal">
                        <p>Transaction: {{ getDate(transaction_detail.created_at) }}</p>
                        <p>Card Type: Debit</p>
                        <p v-if="transaction_detail.user_bank">Number card: {{ transaction_detail.user_bank.rekening_number }}</p>
                        <p>Purchases Category: Online Shopping</p>
                        <!-- <p>Location: City-47</p> -->
                        <!-- <p>Description Transaction: Purchases at Merchant 2027</p> -->
                    </div>
                </div>
                <div class="flex items-center justify-end">
                    <button @click="createReport(transaction_detail.user_bank_id)"
                        class="bg-primary rounded-lg py-3 px-6 text-white text-14">Laporkan</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            transaction_id: this.$route.params.transaction_id,
            transaction_detail: ''
        }
    },
    methods: {
        getDate(created_at) {
            // 12 November
            const transaction_date = created_at;
            return new Date(transaction_date).toLocaleDateString('id-ID', { month: 'long', day: 'numeric', year: 'numeric' })
        },
        getTransactionDetail() {
            this.axios.get(`transaction/${this.transaction_id}`).then(response => {
                this.transaction_detail = response.data.data
                console.log(this.transaction_detail)
            }).catch(error => {
                console.log(error);
            })
        },
        createReport(user_bank_id) {
            this.$router.push({
                name: "report-create",
                params: {
                    user_bank_id
                }
            })
        }
    },
    mounted() {
        this.getTransactionDetail()
    }
}
</script>

<style></style>