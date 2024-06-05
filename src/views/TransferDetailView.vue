<template>
    <base-header title="Transfer" />
    <div class="flex flex-col items-center justify-between px-8 pb-28 h-full w-full">

        <div class="w-full">
            <div class="mb-3">
                <label for="payment_method" class="text-14 font-medium">Bank</label>
                <input id="payment_method" type="text" v-model="bank.name" disabled
                    class="border border-grey rounded-lg p-4 w-full font-medium text-12 mt-2">
            </div>
            <div class="mb-3">
                <label for="account_number" class="text-14 font-medium">Nomor Rekening</label>
                <input id="account_number" v-model="account_number" type="number" placeholder="Nomor Rekening"
                    class="border border-grey rounded-lg p-4 w-full font-medium text-12 mt-2">
                <p class="text-primary-red">{{ message }}</p>
            </div>
        </div>
        <base-button :disabled="account_number == ''" :background="account_number == '' ? 'grey' : 'primary'"
            @click="getRekeningStatus" text="Lanjutkan" />
    </div>

    <div v-if="is_checking_state" class="z-10 absolute h-screen w-screen bg-black opacity-50"></div>

    <div v-if="is_checking_state" class="z-20 absolute bottom-0 bg-white w-full rounded-t-3xl px-6 py-4">
        <div class="relative">
            <div class="mb-2">
                <p class="font-semibold text-16 mb-2">Cek Detail Rekening Penerima</p>
                <p class="font-normal text-12 mb-2">Pastikan detail penerima transfer benar dan aman.</p>
            </div>
            <div class="flex flex-col items-center justify-between text-center w-full">
                <div v-if="account_detail" class="w-full mb-3">
                    <img :src="`/public/assets/logo/payment_methods/${account_detail.bank.name.toLowerCase()}.png`"
                        :alt="account_detail.bank.name" class="mx-auto mb-1">
                    <p class="text-12 font-normal mb-1">{{ account_detail.account_name }}</p>
                    <p class="text-12 font-normal text-primary">{{ account_detail.bank.name }}-{{
                        account_detail.rekening_number }}</p>
                </div>
                <div class="flex items-center justify-start border rounded-2xl p-5 mb-8">
                    <img v-if="is_fraud" src="/public/assets/icon/transaction-status-warning.png"
                        alt="transaction-status-warning" class="mr-7">
                    <img v-else src="/public/assets/icon/transaction-status-secure-big.png"
                        alt="transaction-status-secure-big" class="mr-7">
                    <div v-if="is_fraud" class="text-left">
                        <p class="text-primary-red font-semibold text-12 mb-2">WARNING</p>
                        <p class="font-normal text-10 mb-2">Rekening tersebut mempunyai laporan penipuan. Anda dapat
                            melakukan cancel transfer tersebut, atau lebih baik cek terlebih dahulu identitas penerima
                            transfer.</p>
                    </div>
                    <div v-else class="text-left">
                        <p class="text-primary-green font-semibold text-12 mb-2">SAFE</p>
                        <p class="font-normal text-10 mb-2">Rekening tersebut belum pernah ada laporan penipuan.</p>
                    </div>
                </div>
                <div v-if="is_fraud" class="w-full">
                    <base-button text="Kembali" @click="is_checking_state = false" />
                    <base-button background="transparent" text_color="primary" class="text-primary" text="Lanjutkan"
                        @click="proceedPayment(account_detail.id)" />
                </div>
                <div v-else class="w-full">
                    <base-button text="Lanjutkan" @click="proceedPayment(account_detail.id)" />
                    <base-button background="transparent" text_color="primary" text="Kembali"
                        @click="is_checking_state = false" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseButton from '../components/BaseButton.vue'
import BaseHeader from '../components/BaseHeader.vue'
export default {
    components: { BaseHeader, BaseButton },
    data() {
        return {
            bank_id: this.$route.params.bank_id,
            user: this.$store.getters.userDetail,
            is_checking_state: false,
            is_fraud: false,
            bank: '',
            account_detail: '',
            account_number: '',
            message: '',
        }
    },
    methods: {
        getBankDetail() {
            this.axios.get(`bank/${this.bank_id}`).then((response) => {
                this.bank = response.data.data
            }).catch(error => {
                console.log(error);
            })
        },
        getRekeningStatus() {
            if (this.account_number == this.user.user_bank.rekening_number) {
                this.message = 'Rekening penerima tidak boleh sama dengan rekening Anda'
                return
            }

            const data = {
                rekening_number: this.account_number,
                bank_id: this.bank_id
            }

            this.axios.post('get-rekening-status', data).then(response => {
                this.is_checking_state = true
                this.account_detail = response.data.data
                this.is_fraud = this.account_detail.is_reported
                // this.proceedPayment(this.account_detail.id)
            }).catch(error => {
                this.message = error.response.data.message
            })
        },
        proceedPayment(user_bank_id) {
            this.$router.push({
                name: 'transfer-amount',
                params: {
                    bank_id: this.bank_id,
                    user_bank_id
                }
            })
        }
    },
    mounted() {
        this.getBankDetail()
        if (this.$route.query.account_number) {
            this.account_number = this.$route.query.account_number
            this.getRekeningStatus()
        }
        // console.log(this.$route.query.account_number);
    }
}
</script>

<style></style>