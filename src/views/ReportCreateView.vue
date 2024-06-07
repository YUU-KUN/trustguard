<template>
    <div class="flex flex-col items-center justify-start px-8 w-full pt-14">

        <img @click="goBack" class="z-10 self-start" src="/public/assets/icon/back-arrow-icon.png" alt="back-arrow-icon">
        <p class="z-10 text-white font-semibold text-20">Buat Laporan</p>
        <div class="h-[145px] bg-gradient-to-r from-primary to-[#0D1F35] rounded-b-[100px] w-full absolute top-0"></div>

        <div class="mt-20 w-full">
            <div v-if="state !== 4" class="">

                <!-- Progress -->
                <div v-if="showProgressBar" class="flex items-center justify-between w-full py-4">
                    <div class="flex items-center justify-start w-full">
                        <div class="bg-primary rounded-full w-6 h-6 flex items-center justify-center text-white mr-1">1
                        </div>
                        <span class="font-semibold text-14 text-primary">Informasi</span>
                    </div>
                    <hr class="rounded-sm w-full h-1" :class="getStateBg(1)">
                    <div class="flex items-center justify-end w-full">
                        <div :class="getStateBg(1)"
                            class="rounded-full w-6 h-6 flex items-center justify-center text-white mr-1">2
                        </div>
                        <span :class="getStateText(state)" class="font-semibold text-14">Kronologi</span>
                    </div>
                    <hr class="rounded-sm w-full h-1" :class="getStateBg(2)">
                    <div class="flex items-center justify-end w-full">
                        <div :class="getStateBg(2)"
                            class="rounded-full w-6 h-6 flex items-center justify-center text-white mr-1">3
                        </div>
                        <span :class="getStateText(state)" class="font-semibold text-14">Identitas</span>
                    </div>
                </div>

                <!-- Informasi -->
                <div v-show="state == 0">
                    <div class="mb-5">
                        <p class="font-semibold text-18 mb-2">Rekening Bank Terduga Pelanggaran</p>
                        <p class="font-medium text-12 mb-2 text-grey">Masukkan data rekening bank yang anda duga
                            merupakan penipu atau melakukan pelanggaran
                        </p>
                    </div>
                    <div class="mb-8">
                        <div class="mb-5">
                            <div class="mb-3">
                                <label class="font-medium text-14" for="suspect_account_name">Nama Pemilik Rekening</label>
                                <input v-model="suspect_account_name" id="suspect_account_name" type="tel"
                                    placeholder="Masukkan nama pemilik rekening terduga"
                                    class="p-4 rounded-lg font-medium text-12 w-full border border-grey mt-2">
                            </div>
                            <div class="mb-3">
                                <label class="font-medium text-14" for="suspect_bank">Pilih Bank</label>
                                <div class="grid grid-cols-2 gap-2">
                                    <div class="col-span-2">
                                        <select v-model="bank_id" id="suspect_bank"
                                            class="p-4 rounded-lg font-medium text-12 w-full border border-grey mt-2">
                                            <option value="" selected>Pilih bank terduga</option>
                                            <option v-for="bank in banks" :key="bank.id" :value="bank.id"
                                                class="capitalize">{{ bank.name }}</option>
                                            <!-- <option value="bca">BCA</option> -->
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="font-medium text-14" for="suspect_account_number">Nomor Rekening</label>
                                <input v-model="suspect_account_number" id="suspect_account_number" type="tel"
                                    placeholder="Masukkan nomor rekening terduga"
                                    class="p-4 rounded-lg font-medium text-12 w-full border border-grey mt-2">
                            </div>
                            <!-- <div class="mb-3">
                                <label class="font-medium text-14" for="suspect_phone">Nomor Telepon Terduga</label>
                                <input v-model="suspect_phone" id="suspect_phone" type="tel"
                                    placeholder="Masukkan nomor telepon terduga"
                                    class="p-4 rounded-lg font-medium text-12 w-full border border-grey mt-2">
                            </div> -->
                        </div>
                    </div>
                </div>

                <!-- Kronologi -->
                <div v-show="state == 1">
                    <div class="mb-5">
                        <p class="font-semibold text-18 mb-2">Kronologi </p>
                        <p class="font-medium text-12 mb-2 text-grey w-2/3">Masukkan data kronologi yang dialami dan isikan
                            beberapa data yang menunjang kronologi tersebut
                        </p>
                    </div>
                    <div class="mb-8">
                        <div class="mb-5">
                            <div class="mb-3">
                                <label class="font-medium text-14" for="suspect_platform">Platform</label>
                                <div class="grid grid-cols-2 gap-2">
                                    <div class="col-span-2">
                                        <select v-model="platform_id" id="suspect_platform"
                                            class="p-4 rounded-lg font-medium text-12 w-full border border-grey mt-2">
                                            <option value="" selected>Pilih platform bisnis terduga</option>
                                            <option v-for="platform in platforms" :key="platform.id" :value="platform.id">{{
                                                platform.name }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="font-medium text-14" for="business_product">Pilih Kategori Produk
                                    Bisnis</label>
                                <div class="grid grid-cols-2 gap-2">
                                    <div class="col-span-2">
                                        <select v-model="product_category_id" id="business_product"
                                            class="p-4 rounded-lg font-medium text-12 w-full border border-grey mt-2">
                                            <option value="" selected>Pilih kategori produk bisnis</option>
                                            <option v-for="product_category in product_categories"
                                                :key="product_category.id" :value="product_category.id" class="capitalize">
                                                {{ product_category.name }}</option>
                                            <!-- <option value="kendaraan">Kendaraan</option>
                                            <option value="makanan_minuman">Makanan & minuman</option> -->
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="font-medium text-14" for="chronology">Kronologi</label>
                                <textarea v-model="chronology"
                                    class="p-4 rounded-lg font-medium text-12 w-full border border-grey mt-2"
                                    id="chronology" cols="30" rows="10"
                                    placeholder="Tuliskan kronologi yang dialami"></textarea>
                            </div>
                            <div class="mb-3">
                                <label class="font-medium text-14" for="loss_amount">Total Kerugian</label>
                                <input v-model="loss_amount" id="loss_amount" type="number"
                                    placeholder="Masukkan nominal kerugian"
                                    class="p-4 rounded-lg font-medium text-12 w-full border border-grey mt-2">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Identitas -->
                <div v-show="state == 2">
                    <div class="mb-5">
                        <p class="font-semibold text-18 mb-2">Identitas Pelapor</p>
                        <p class="font-medium text-12 mb-2 text-grey w-2/3">Masukkan identitas kamu pada form berikut</p>
                    </div>
                    <div class="mb-8">
                        <div class="mb-5">
                            <div class="mb-3">
                                <label class="font-medium text-14" for="reporter_name">Nama Pelapor</label>
                                <input v-model="reporter_name" id="reporter_name" type="text"
                                    placeholder="Masukkan nama pelapor"
                                    class="p-4 rounded-lg font-medium text-12 w-full border border-grey mt-2">
                            </div>
                            <div class="mb-3">
                                <label class="font-medium text-14" for="identity">Identitas</label>
                                <div class="grid grid-cols-2 gap-2">
                                    <div class="col-span-2">
                                        <select v-model="identity" id="identity"
                                            class="p-4 rounded-lg font-medium text-12 w-full border border-grey mt-2">
                                            <option value="" selected>Pilih identitas yang dimiliki</option>
                                            <option value="ktp">KTP</option>
                                            <option value="sim">SIM</option>
                                            <option value="passport">PASSPORT</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="font-medium text-14" for="identity_number">Nomor Identitas</label>
                                <input v-model="identity_number" id="identity_number" type="number"
                                    placeholder="Masukkan nomor identitas sesuai jenis identitas"
                                    class="p-4 rounded-lg font-medium text-12 w-full border border-grey mt-2">
                            </div>
                            <div class="mb-3">
                                <label class="font-medium text-14" for="reporter_phone">Nomor Telepon Pelapor</label>
                                <input v-model="reporter_phone" id="reporter_phone" type="tel"
                                    placeholder="Masukkan nomor telepon pelapor"
                                    class="p-4 rounded-lg font-medium text-12 w-full border border-grey mt-2">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Bukti -->
                <div v-show="state == 3">
                    <div class="mb-14">
                        <p class="font-semibold text-18 mb-2">Bukti</p>
                        <p class="font-medium text-12 mb-2 text-grey">Masukkan bukti yang anda punya dapat berupa
                            screenshoot transaction, screenshoot percakapan, ata dokumen lain yang membantu argumen laporan
                            anda.</p>
                    </div>
                    <div class="mb-8">
                        <label for="evidence">
                            <div
                                class="flex flex-col items-center justify-center h-[217px] border border-dashed border-grey rounded-lg w-full">
                                <p class="font-normal text-12 w-full text-center text-black" v-if="evidences.length == 0">
                                    Browse file yang ingin diupload, dan anda bisa mengupload
                                    lebih dari 1 file</p>
                                <p v-for="evidence in evidences" :key="evidence.id"
                                    class="font-normal text-12 w-full text-center text-black">
                                    {{ evidence.name }}
                                </p>
                            </div>
                        </label>
                        <input @change="onFileChange" id="evidence" type="file" multiple class="hidden">
                    </div>
                </div>
            </div>
            <div v-else class="mb-12 text-center">
                <img src="/public/assets/img/success-report.png" alt="success-report" class="mb-12">
                <p class="font-semibold text-24 text-primary mb-3">Laporan Sukses di Kirim</p>
                <p class="text-12 text-grey w-[264px] mx-auto">Terima kasih atas kerja sama yang anda berikan </p>
            </div>

            <BaseButton :text="getButtonState()" @click="nextState()" />
        </div>
    </div>
</template>

<script>
import BaseButton from '../components/BaseButton.vue';
export default {
    components: { BaseButton },
    data() {
        return {
            state: 0, // 0 informasi, 1 kronologi, 2 identitas, 3 bukti, 4 sukses,
            user_bank_id: this.$route.params.user_bank_id,
            banks: [],
            platforms: [],
            product_categories: [],

            bank_id: "",
            suspect_account_name: "",
            suspect_account_number: "",
            suspect_phone: "",

            platform_id: "",
            product_category_id: "",
            chronology: "",
            loss_amount: "",

            reporter_name: "",
            identity: "",
            identity_number: "",
            reporter_phone: "",

            evidences: [],
        }
    },
    methods: {
        getBanks() {
            this.axios.get('bank').then(response => {
                this.banks = response.data.data
                console.log(this.banks);
            }).catch(error => {
                console.log(error);
            })
        },
        getUser() {
            this.axios.get(`user-bank?user_bank_id=${this.user_bank_id}`).then(response => {
                console.log(response.data.data);
                const res = response.data.data
                this.suspect_account_name = res.account_name
                this.suspect_account_number = res.rekening_number
                this.suspect_phone = res.user.phone
                this.bank_id = res.bank_id
            }).catch(error => {
                console.log(error);
            })
        },
        getPlatforms() {
            this.axios.get('platforms').then(response => {
                this.platforms = response.data.data
            }).catch(error => {
                console.log(error.response);
            })
        },
        getProductCategories() {
            this.axios.get('product-categories').then(response => {
                this.product_categories = response.data.data
            }).catch(error => {
                console.log(error.response);
            })
        },
        onFileChange(e) {
            this.evidences = e.target.files;
            // this.evidence = e.target.files[0];
            console.log(this.evidences);
        },

        createReport() {
            const formdata = new FormData()
            formdata.append('bank_id', this.bank_id)
            formdata.append('suspect_account_name', this.suspect_account_name)
            formdata.append('suspect_account_number', this.suspect_account_number)
            formdata.append('suspect_phone', this.suspect_phone)
            formdata.append('platform_id', this.platform_id)
            formdata.append('product_category_id', this.product_category_id)
            formdata.append('chronology', this.chronology)
            formdata.append('loss_amount', this.loss_amount)
            formdata.append('reporter_name', this.reporter_name)
            formdata.append('identity', this.identity)
            formdata.append('identity_number', this.identity_number)
            formdata.append('reporter_phone', this.reporter_phone)
            formdata.append('evidences[]', this.evidences)

            this.axios.post('report', formdata).then(response => {
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            })
        },

        goBack() {
            this.$router.go(-1)
        },
        nextState() {
            switch (this.state) {
                case 0:
                    this.state = 1
                    break;
                case 1:
                    this.state = 2
                    break;
                case 2:
                    this.state = 3
                    break;
                case 3:
                    this.createReport()
                    this.state = 4
                    break;
                case 4:
                    this.$router.push({ name: 'home' })
                    break;
                default:
                    break;
            }
            // this.state == 0 ? this.state = 1 : (this.state == 1 ? this.state = 2 : this.$router.push({ name: 'login' }))
        },
        getStateBg(state) {
            return this.state >= state ? 'bg-primary' : 'bg-primary-grey'
        },
        getStateText(state) {
            return this.state >= state ? 'text-primary' : 'text-primary-grey'
        },
        getButtonState() {
            return [0, 1, 2].includes(this.state) ? 'Lanjutkan' : (this.state == 3 ? 'Kirim Laporan' : 'Kembali')
        },
        showProgressBar() {
            return [0, 1, 2].includes(this.state)
        },
    },
    mounted() {
        this.getUser(),
        this.getBanks(),
        this.getPlatforms(),
        this.getProductCategories()
    }
}
</script>

<style></style>