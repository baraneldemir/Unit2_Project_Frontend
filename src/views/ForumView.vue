<script setup>
import AddQuestion from '@/components/AddQuestion.vue';
import { ref, onMounted } from 'vue'
import {RouterLink} from 'vue-router'
import { useCookies } from 'vue3-cookies'
import { decodeCredential, googleLogout} from 'vue3-google-login'

const isLoggedIn = ref(false)
const { cookies } = useCookies()
const userName = ref('')


function checkSession() {
    if ( cookies.isKey('user_session') ) {
        isLoggedIn.value = true
        const userData = decodeCredential(cookies.get('user_session'))
        userName.value = userData.given_name
    }

}


onMounted(() => {
    checkSession()
})


</script>

<template>
    <div style="background-color: chocolate; height: 100vh">
    <h1 style="text-align: center;">Welcome to Forum</h1>
    <h4>Here you can get help by asking questions who have similar problems and recived detailed answers from our verified solicitors.</h4>
    </div>
    
   
    <div v-if="isLoggedIn">
        <h5>to add comment please log in</h5>
        <AddQuestion :fetchData="fetchData" />
    </div>

</template>