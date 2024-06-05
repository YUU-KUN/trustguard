<template>
    <div class="flex flex-col items-center justify-start h-full w-full bg-primary">
        <div class="relative w-full h-1/2">
            <img src="/public/assets/img/sign-in.png" alt="sign-in" class="absolute z-30 top-0 w-full">
            <img src="/public/assets/img/wave-top.png" alt="wave-top" class="absolute z-10 top-0 w-full">
        </div>
        <div class="px-6 w-full text-white">
            <div class="mb-6">
                <p class="text-left font-semibold text-20 mb-2">Sign In</p>
                <p class="text-left font-normal text-12 text-primary-grey">
                    Masukkan data pribadi yang sesuai dengan data yang Anda masukkan saat pendaftaran
                </p>
            </div>
            <div class="mb-2">
                <label for="username" class="font-medium text-14">Username</label>
                <input v-model="username" id="username" type="text" placeholder="Masukkan username anda"
                    class="w-full p-4 rounded-lg mt-2 text-12 font-medium text-black">
            </div>
            <div class="mb-3">
                <label for="password" class="font-medium text-14">Password</label>
                <input v-model="password" id="password" type="password" placeholder="Masukkan password anda"
                    class="w-full p-4 rounded-lg mt-2 text-12 font-medium text-black">
            </div>
            <div class="flex items-center justify-between w-full mb-7">
                <div class="flex items-center justify-start">
                    <input id="remember" type="checkbox" class="mr-1">
                    <label for="remember" class="font-medium text-10">Ingat saya</label>
                </div>
                <p class="text-secondary-grey text-10">Lupa password</p>
            </div>
            <button @click="login" class="w-full rounded-lg text-14 font-semibold text-center py-4 bg-dark-blue text-white mb-1">
                Masuk
            </button>
            <p class="font-medium">Anda sudah memiliki akun?
                <router-link to="/register" class="text-[#02B6C5]">Daftar</router-link>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        login() {
            const data = {
                username: this.username,
                password: this.password,
            }
            this.$store.dispatch('login', data).then(() => {
                this.$router.push({ name: 'home' })
            }).catch(error => {
                if (error.response.data.data.user.is_suspended) {
                    this.$router.push({ name: 'suspended-account' })
                }
                console.log(error);
            })
        }
    }
}
</script>

<style></style>