<template>
    <base-header title="Transfer" />
    <div class="flex flex-col items-center justify-between px-8 pb-28 h-full w-full">
        <div class="w-full">
            <div class="w-full mb-12 text-center">
                <img v-if="user_bank.bank" :src="`/public/assets/logo/payment_methods/${user_bank.bank.name}.png`"
                    :alt="user_bank.bank.name" class="mx-auto mb-1">
                <p class="text-12 font-normal mb-1 uppercase">{{ user_bank.account_name }}</p>
                <p class="text-12 font-normal text-primary" v-if="user_bank.bank">{{ user_bank.bank.name }}-{{
                    user_bank.rekening_number }}</p>
                <p v-if="user_bank.user" class="flex items-center justify-center text-12 font-normal">Skor Keamanan:
                    <span :class="getTrustScoreColor(user_bank.user.trust_score)">{{ user_bank.user.trust_score
                        }}</span>
                </p>
            </div>

            <div class="w-full">
                <div class="mb-3">
                    <label for="transfer_amount" class="text-14 font-medium">Nominal Transfer</label>
                    <input id="transfer_amount" type="number" v-model="transfer_amount" placeholder="Rp"
                        class="border border-grey rounded-lg p-4 w-full font-medium text-12 mt-2 mb-2">
                    <p class="text-red font-medium text-12">{{ message }}</p>
                </div>
            </div>
        </div>
        <base-button v-if="transfer_amount" @click="predictFraud()" text="Transfer" />
    </div>


    <div v-if="is_checking_state" class="z-10 absolute h-screen w-screen bg-black opacity-50"></div>

    <div v-if="is_checking_state" class="z-20 absolute bottom-0 bg-white w-full rounded-t-3xl px-6 py-4">
        <div class="relative">
            <div class="mb-2">
                <p class="font-semibold text-16 mb-2">Cek Detail Rekening Penerima</p>
                <p class="font-normal text-12 mb-2">Pastikan detail penerima transfer benar dan aman.</p>
            </div>
            <div class="flex flex-col items-center justify-between text-center w-full">
                <div v-if="user_bank" class="w-full mb-3">
                    <img :src="`/public/assets/logo/payment_methods/${user_bank.bank.name.toLowerCase()}.png`"
                        :alt="user_bank.bank.name" class="mx-auto mb-1">
                    <p class="text-12 font-normal mb-1 uppercase">{{ user_bank.account_name }}</p>
                    <p class="text-12 font-normal text-primary mb-2">{{ user_bank.bank.name }}-{{
                    user_bank.rekening_number
                }}
                    </p>
                    <p class="flex items-center justify-center text-12 font-normal">Skor Keamanan: <span
                            :class="getTrustScoreColor(user_bank.user.trust_score)">{{ user_bank.user.trust_score
                            }}</span>
                    </p>
                </div>
                <div class="flex items-center justify-start border rounded-2xl p-5 mb-8">
                    <img v-if="is_fraud_detected" src="/public/assets/icon/transaction-status-warning.png"
                        alt="transaction-status-warning" class="mr-7">
                    <img v-else src="/public/assets/icon/transaction-status-secure-big.png"
                        alt="transaction-status-secure-big" class="mr-7">
                    <div v-if="is_fraud_detected" class="text-left">
                        <p class="text-primary-red font-semibold text-12 mb-2">WARNING</p>
                        <p class="font-normal text-10 mb-2">AI mendeteksi transaksi pada rekening tersebut tidak aman.
                        </p>
                    </div>
                    <div v-else class="text-left">
                        <p class="text-primary-green font-semibold text-12 mb-2">SAFE </p>
                        <p class="font-normal text-10 mb-2">AI mendeteksi transaksi pada rekening tersebut aman.
                        </p>
                    </div>
                </div>
                <div v-if="is_fraud_detected" class="w-full">
                    <base-button text="Kembali" @click="is_checking_state = false" />
                    <base-button background="transparent" text_color="primary" class="text-primary" text="Lanjutkan"
                        @click="activateCamera()" />
                </div>
                <div v-else class="w-full">
                    <base-button text="Lanjutkan" @click="activateCamera()" />
                    <base-button background="transparent" text_color="primary" text="Kembali"
                        @click="is_checking_state = false" />
                </div>
            </div>
        </div>
    </div>

    <div v-if="is_camera_verify" class="absolute z-30 h-screen w-screen bg-primary flex flex-col p-6 pt-11">
        <div class="flex w-full justify-between items-center pb-5 shadow mb-5">
            <img @click="is_camera_verify = false" src="/public/assets/icon/back-arrow-icon.png" alt="">
            <p class="text-white font-semibold text-16">Verifikasi Akun</p>
            <p class="text-primary">.</p>
        </div>
        <div class="relative flex flex-col items-center justify-center w-full h-full">
            <camera :resolution="{ width: 342, height: 600 }" ref="camera" autoplay>
            </camera>
            <!-- <div @click="snapshot" class="w-fit mx-auto px-auto mb-7 absolute bottom-7 rounded-full bg-[#BBCCDF] p-2">
                <div class="rounded-full bg-white p-2">
                    <img src="/public/assets/icon/camera.png" alt="camera">
                </div>
            </div> -->
        </div>
        <div v-if="is_verify_fail"
            class="flex flex-col items-center justify-center absolute z-30 w-screen h-screen bg-black bg-opacity-90 top-0 left-0">
            <div class="relative flex items-center justify-center">
                <div class="absolute rounded-full drop-shadow-2xl blur-[200px] w-50v aspect-square bg-red p-5"></div>
                <PhWarning :size="120" color="#ff0000" weight="fill" class=""/>
            </div>
            <p class="z-20 text-white font-bold text-18">Wajah tidak terdeteksi</p>
            <div class="absolute bottom-7 px-6 self-end w-full">
                <button @click="activateCamera" class="bg-primary py-4 w-full rounded-lg text-white font-semibold text-14 mb-5">Coba
                    Lagi</button>
                <button @click="is_camera_verify = false" class="bg-white py-4 w-full rounded-lg text-black font-semibold text-14">Kembali</button>
            </div>
        </div>
    </div>
</template>

<script>
import Camera from "simple-vue-camera";
import BaseButton from '../components/BaseButton.vue'
import BaseHeader from '../components/BaseHeader.vue'

export default {
    components: { BaseHeader, BaseButton, Camera },
    data() {
        return {
            user: '',
            bank_id: this.$route.params.bank_id,
            user_bank_id: this.$route.params.user_bank_id,
            user_bank: '',
            transfer_amount: '',
            message: '',

            is_checking_state: false,
            is_fraud_detected: false,
            is_camera_verify: false,
            is_verify_fail: false,
            camera: null,
        }
    },
    methods: {
        getUserBank() {
            this.axios.get(`user-bank?user_bank_id=${this.user_bank_id}`).then(response => {
                this.user_bank = response.data.data
            }).catch(error => {
                this.message = error.response.data.message
            })
        },
        predictFraud() {
            if (this.user.balance < this.transfer_amount) {
                this.message = 'Saldo Anda tidak mencukupi'
                return
            }
            const data = {
                amount: this.transfer_amount,
                type_number: 4, // TRANSFER
                receiver_bank_id: this.user_bank_id
            }
            this.axios.post('check-fraud', data).then(response => {
                this.is_checking_state = true
                this.is_fraud_detected = response.data.data.is_fraud_detected
            }).catch(error => {
                console.log(error);
                this.message = error.response.data.message
            })
        },

        activateCamera() {
            this.is_camera_verify = true
            this.is_verify_fail = false
            setTimeout(() => {
                this.snapshot()
            }, 4000);
            clearTimeout();
        },

        async snapshot() {
            if (this.$refs.camera) {
                const blob = await this.$refs.camera.snapshot();

                // Create a FormData object
                const formData = new FormData();
                formData.append('user_id', '1301'); // You can name the file 'snapshot.png' or any other name you prefer
                formData.append('file', blob); // You can name the file 'snapshot.png' or any other name you prefer

                this.axios.post('http://localhost:5001/verify', formData).then(response => {
                    if (response.data.result == 'Verified') {
                        this.payAmount()
                    } else {
                        this.is_verify_fail = true
                    }
                }).catch((error) => {
                    this.is_verify_fail = true
                    console.log('Error:', error);
                });
            } else {
                console.log('camera not found');
            }
        },


        payAmount() {
            const data = {
                user_bank_id: this.user_bank_id,
                amount: this.transfer_amount,
                is_fraud_detected: this.is_fraud_detected
            }
            this.axios.post('transfer', data).then(response => {
                console.log(response.data.data);
                const transaction_id = response.data.data.id
                this.$router.push({
                    name: 'transfer-success',
                    params: {
                        transaction_id
                    }
                })
            }).catch(error => {
                console.log(error);
                this.message = error.response.data.message
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
        },
        getProfile() {
            this.axios.get('profile').then(response => {
                this.user = response.data.data
                console.log(this.user);
            }).catch(error => {
                console.log(error);
            })
        },
    },
    mounted() {
        this.getUserBank()
        this.getProfile()
    }
}
</script>

<style></style>