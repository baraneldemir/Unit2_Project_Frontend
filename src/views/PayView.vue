<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import { decodeCredential, googleLogout } from 'vue3-google-login'


const { cookies } = useCookies()

let isLoggedIn = ref(false)
let userName = ref('')
let userPicture = ref('')

function callback(response) {
    isLoggedIn.value = true
    const userData = decodeCredential(response.credential)
    userName.value = userData.given_name
    userPicture.value = userData.picture
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
        .catch(err => console.error(err))
    //if you dont give data to fetch post will become get by default
}

function checkSession() {
    if (cookies.isKey('user_session')) {
        isLoggedIn.value = true
        const userData = decodeCredential(cookies.get('user_session'))
        userName.value = userData.given_name
        userPicture.value = userData.picture
        console.log(userData)
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
    <div class="bg-image" style="background-image: url('https://images.unsplash.com/photo-1530685932526-48ec92998eaa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
        height: 100vh">

        <h1 class="bg-light p-4" style="--bs-bg-opacity: .25; text-align: center">Speeding Fine App</h1>
        <nav aria-label="breadcrumb" class="bg-light p-2" style="--bs-bg-opacity: .25; text-align: center">
            <ol class="breadcrumb">
                <div class="navbar navbar-expand-lg">
                <li >
                    <span v-if="isLoggedIn"
                        class="badge d-flex align-items-center p-1 pe-2 text-success-emphasis bg-success-subtle border border-success-subtle rounded-pill">
                        <img class="rounded-circle me-1" width="25" height="25" :src="userPicture" alt="">You
                        are logged in as {{ userName }}
                    </span>
                </li>
                <li >
                    <RouterLink :to="'/'" class="nav-link" >   Home /</RouterLink>
                </li>
                <li >
                    <RouterLink :to="'/login/forum'" class="nav-link">   Forum Page /</RouterLink>
                </li>
                <li >
                    <RouterLink :to="'/login/form'" class="nav-link">   Legal aid /</RouterLink>
                </li>
                <li >
                    <RouterLink :to="'/login/pay'" class="nav-link">   Pay /</RouterLink>
                </li>
                <li >
                    <RouterLink :to="'/login/form'" class="nav-link">   Challenge a ticket /</RouterLink>
                </li>
            </div>
            </ol>
        </nav>
        <hr>
        <!-- <h3>Login</h3> -->
        <div v-if="isLoggedIn">
            <button class="btn btn-secondary" @click="handleLogOut">Log Out</button>

            <!-- <button style="font-size: 20px;">Enter your ticket Number</button> -->
        </div>
        <div v-else>
            <GoogleLogin :callback="callback" />
        </div>
        <div class="col-sm-9 mb-3 mb-sm-0 bg-light p-2" style="--bs-bg-opacity: .25;">
                <div class="container">
                    <div class="card-body">
                        <h5 class="card-title">How to pay your speeding ticket online?</h5>
                        <p class="card-text">You'll have to pay a £100 fine and have 3 points added to your licence, unless you're given the option to attend a speed awareness course. If you pay the fine, how you pay depends on where you were caught speeding. You can: pay the fine online in England and Wales or check the ticket for other ways to pay.</p>
                        <a href="https://penaltynotice.homeoffice.gov.uk/" class="btn btn-secondary">Pay through government website</a>
                    </div>
                </div>
            </div>
            <RouterLink :to="'/' " class="btn btn-secondary">Return Main Page</RouterLink>
            
    </div>
</template>