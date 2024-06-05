<template>
    <div class="flex flex-col items-center justify-start px-8 w-full pt-14">
        <!-- <img class="z-10 self-start" src="/public/assets/icon/back-arrow-icon.png" alt="back-arrow-icon"> -->
        <p class="z-10 text-white font-semibold text-20">Profile</p>
        <div class="h-[145px] bg-gradient-to-r from-primary to-[#0D1F35] rounded-b-[100px] w-full absolute top-0"></div>

        <div class="flex items-center justify-start mt-20 w-full mb-8">
            <img src="/public/assets/img/avatar.png" alt="avatar" class="mr-4">
            <div class="">
                <p class="text-18 mb-1 font-semibold">{{ user.firstname + ' ' + user.lastname }} </p>
                <p class="text-12">NIK: {{ user.nik }}</p>
            </div>
        </div>
        <hr class="h-1 w-full">
        <div class="text-left w-full ">
            <div class="flex items-center justify-start font-semibold mt-8 w-full">
                <base-button @click="logout" text="Logout" class="bg-primary-red"/>
            </div>
        </div>


    </div>
</template>

<script>
import BaseButton from '../components/BaseButton.vue';
export default {
  components: { BaseButton },
    data() {
        return {
            user: this.$store.getters.userDetail
        }
    },
    methods: {

        getProfile() {
            this.$store.dispatch('getProfile').then(response => {
                console.log(this.user);
            }).catch(error => {
                console.log(error);
            })
        },
        logout() {
            this.$store.dispatch('logout').then(response => {
                this.$router.push({ name: 'login' })
            }).catch(error => {
                console.log(error);
            })
        }
    },
    mounted() {
        this.getProfile()
    }
}
</script>

<style></style>