<script setup>
import { ref, onMounted } from 'vue';
import {RouterLink} from 'vue-router'
import { useCookies } from 'vue3-cookies'
import { decodeCredential, googleLogout} from 'vue3-google-login'

//by adding coli brackets all methods are working and everything inside cookies 
// otherwise its a ordinary variable
const { cookies } = useCookies()

let isLoggedIn = ref(false)
let userName = ref('')


//loginbutton needs to fetch as well
function callback(response) {
    isLoggedIn.value = true 
    const userData = decodeCredential(response.credential)
    userName = userData.given_name
    cookies.set('user_session', response.credential)
    fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userEmail: userData.email
        })
    })
    .then(() => {
        console.log('session saved');
    })
    .catch( err => console.error(err) )
    //if you dont give data to fetch post will become get by default
}

function checkSession() {
    if ( cookies.isKey('user_session') ) {
        isLoggedIn.value = true
        const userData = decodeCredential(cookies.get('user_session'))
        userName.value = userData.given_name
    }

}

function handleLogOut() {
    googleLogout()
    cookies.remove('user_session')
    isLoggedIn.value = false
}


onMounted(checkSession)


</script>

<template>
    <div class="bg-image" 
        style="background-image: url('https://mdbootstrap.com/img/Photos/Others/images/76.jpg');
        height: 100vh">
        <h1 style="text-align: ;">Speeding Fine App</h1>
        <RouterLink :to="'/login/forum'">Forum Page</RouterLink>
        <h3>Login</h3>
        <div v-if="isLoggedIn"> 
            <h2> You are signed in as {{ userName }}!</h2>
            <button @click="handleLogOut">Log Out</button>
            <!-- <button style="font-size: 20px;">Enter your ticket Number</button> -->
        </div>
        <div v-else>
            <GoogleLogin :callback="callback" />
        </div>
    </div>
</template>
