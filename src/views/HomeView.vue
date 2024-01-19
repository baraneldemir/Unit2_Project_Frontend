<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import { decodeCredential, googleLogout } from 'vue3-google-login'

//by adding coli brackets all methods are working and everything inside cookies 
// otherwise its a ordinary variable
const { cookies } = useCookies()

let isLoggedIn = ref(false)
let userName = ref('')
let userPicture = ref('')


//loginbutton needs to fetch as well
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
                <li class="breadcrumb-item">
                    <span v-if="isLoggedIn"
                        class="badge d-flex align-items-center p-1 pe-2 text-success-emphasis bg-success-subtle border border-success-subtle rounded-pill">
                        <img class="rounded-circle me-1" width="25" height="25" :src="userPicture" alt="">You
                        are logged in as {{ userName }}
                    </span>
                </li>
                <li class="breadcrumb-item">Home
                    <RouterLink :to="'/login/forum'">Forum Page</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink :to="'/login/forum'">Forum Page</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink :to="'/login/form'">Legal aid</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink :to="'/login/pay'">Pay</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink :to="'/login/form'">Challenge a ticket</RouterLink>
                </li>

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
        <hr>
        <div class="row">
            <div class="col-sm-6 mb-3 mb-sm-0 bg-light p-2" style="--bs-bg-opacity: .25; text-align: center">
                <div class="container">
                    <div class="card-body">
                        <h5 class="card-title">How to pay your speeding ticket online?</h5>
                        <p class="card-text">Pay the fine online in England and Wales or check the ticket for other ways to
                            pay. You may be given the option of attending a speed awareness course</p>
                        <a href="https://tiny-elf-e6e0e5.netlify.app/login/pay" class="btn btn-secondary">Pay now</a>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 mb-3 mb-sm-0 bg-light p-2" style="--bs-bg-opacity: .25; text-align: center">
                <div class="container">
                    <div class="card-body">
                        <h5 class="card-title">Want to challenge court?</h5>
                        <p class="card-text">Challenge court but do not know which one to apply for? If you get an FPN you
                            can choose to plead guilty or not guilty.</p>
                        <a href="/login/form" class="btn btn-secondary">Challenge court now</a>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>
