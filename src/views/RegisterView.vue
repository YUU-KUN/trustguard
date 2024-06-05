<template>
    <div class="flex flex-col items-stretch justify-start px-6 py-4">
        <div v-show="state !== 2" class="">
            <div class="flex items-center justify-between w-full py-4">
                <div class="flex items-center justify-start w-full">
                    <div class="bg-primary rounded-full w-6 h-6 flex items-center justify-center text-white mr-1">1
                    </div>
                    <span class="font-semibold text-14 text-primary">Data diri</span>
                </div>
                <hr class="rounded-sm w-full h-1" :class="getStateBg()">
                <div class="flex items-center justify-end w-full">
                    <div :class="getStateBg()"
                        class="rounded-full w-6 h-6 flex items-center justify-center text-white mr-1">2
                    </div>
                    <span :class="state == 1 ? 'text-primary' : 'text-primary-grey'"
                        class="font-semibold text-14">Register</span>
                </div>
            </div>

            <div class="mb-5">
                <p class="font-semibold text-18 mb-2">Personal Data</p>
                <p class="font-medium text-12 mb-2 text-grey w-2/3">Masukkan data pribadi untuk dapat mengakses Menu
                    Utama
                </p>
            </div>
            <div v-show="state == 0" class="mb-8">
                <div class="mb-5">
                    <p class="font-semibold text-16 text-primary mb-4">Nomor penduduk:</p>
                    <div>
                        <label class="font-medium text-14" for="nik">NIK</label>
                        <input id="nik" type="tel" placeholder="Masukkan NIK anda"
                            class="p-4 rounded-lg font-medium text-12 w-full border border-grey mt-2">
                    </div>
                </div>
                <div class="mb-5">
                    <p class="font-semibold text-16 text-primary mb-4">Data diri:</p>
                    <div class="mb-3">
                        <label class="font-medium text-14" for="fullname">Nama lengkap</label>
                        <div class="grid grid-cols-2 gap-2">
                            <div class="col-span-1">
                                <input id="fullname" type="text" placeholder="Nama depan"
                                    class="p-4 rounded-lg font-medium text-12 w-full border border-grey mt-2">
                            </div>
                            <div class="col-span-1">
                                <input id="last-name" type="text" placeholder="Nama belakang"
                                    class="p-4 rounded-lg font-medium text-12 w-full border border-grey mt-2">
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="font-medium text-14" for="dob">Tempat dan tanggal lahir</label>
                        <div class="grid grid-cols-2 gap-2">
                            <div class="col-span-1">
                                <input id="dob" type="text" placeholder="Tempat lahir"
                                    class="p-4 rounded-lg font-medium text-12 w-full border border-grey mt-2">
                            </div>
                            <div class="col-span-1">
                                <input id="last-name" type="date" placeholder="dd/mm/yyyy"
                                    class="p-4 rounded-lg font-medium text-12 w-full border border-grey mt-2">
                            </div>
                        </div>
                    </div>
                    <div>
                        <label class="font-medium text-14" for="gender">Jenis kelamin</label>
                        <div class="grid grid-cols-2 gap-2">
                            <div class="col-span-2">
                                <select id="gender"
                                    class="p-4 rounded-lg font-medium text-12 w-full border border-grey mt-2">
                                    <option value="" selected>Pilih jenis kelamin</option>
                                    <option value="male">Laki-laki</option>
                                    <option value="female">Perempuan</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <!-- <BaseButton text="Lanjutkan" @click="nextState()" /> -->
                </div>
            </div>

            <div v-show="state == 1" class="mb-8">
                <div class="mb-5">
                    <p class="font-semibold text-16 text-primary mb-4">Username dan password:</p>
                    <div class="mb-3">
                        <label class="font-medium text-14" for="username">Username</label>
                        <input id="username" type="text" placeholder="Masukkan Username Anda"
                            class="p-4 rounded-lg font-medium text-12 w-full border border-grey mt-2">
                    </div>
                    <div class="mb-3">
                        <label class="font-medium text-14" for="phone">Phone Number</label>
                        <input id="phone" type="tel" placeholder="Masukkan Nomor Telfon Anda"
                            class="p-4 rounded-lg font-medium text-12 w-full border border-grey mt-2">
                    </div>
                    <div class="mb-3">
                        <label class="font-medium text-14" for="password">Password</label>
                        <input id="password" type="password" placeholder="Masukkan Password Anda"
                            class="p-4 rounded-lg font-medium text-12 w-full border border-grey mt-2">
                    </div>
                    <div class="mb-3">
                        <label class="font-medium text-14" for="confirmation_password">Password Confirmation</label>
                        <input id="confirmation_password" type="password" placeholder="Masukkan Password Anda"
                            class="p-4 rounded-lg font-medium text-12 w-full border border-grey mt-2">
                    </div>
                </div>
            </div>
        </div>
        <div v-show="state == 2" class="mb-12 text-center">
            <img src="/public/assets/img/success-register.png" alt="success-register" class="mb-12">
            <p class="font-semibold text-24 text-primary mb-3">Pendaftaran Berhasil</p>
            <p class="text-12 text-grey w-[264px] mx-auto">Untuk mengakses menu, anda diperlukan login terlebih dahulu
            </p>
        </div>

        <BaseButton :text="getButtonState()" @click="nextState()" />
    </div>
</template>

<script>
import BaseButton from '../components/BaseButton.vue';
export default {
    components: { BaseButton },
    data() {
        return {
            state: 0 // 0 data diri, 1 register, 2 konfirmasi
        }
    },
    methods: {
        nextState() {
            this.state == 0 ? this.state = 1 : (this.state == 1 ? this.state = 2 : this.register)
        },
        getStateBg() {
            return this.state == 0 ? 'bg-primary-grey' : 'bg-primary'
        },
        getButtonState() {
            return this.state == 0 ? 'Lanjutkan' : (this.state == 1 ? 'Daftar' : 'Lanjut Login')
        },

        register() {
            this.$store.dispatch("register").then(() => {
                this.$router.push({ name: 'login' })
            }).catch(error => {
                console.log(error);
            })
        }
    }
}
</script>

<style></style>