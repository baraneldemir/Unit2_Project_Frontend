<script setup>
import AddQuestion from '@/components/AddQuestion.vue';
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import { decodeCredential, googleLogout } from 'vue3-google-login'

const commentsBe = ref([])

const { cookies } = useCookies()

let isLoggedIn = ref(false)
let userName = ref('')
let userPicture = ref('')

const fetchData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/comments`)
        .then(response => response.json())
        .then(result => {
            commentsBe.value = result
        })
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
function deleteComment(commentId) {
    fetch(`${import.meta.env.VITE_API_URL}/comments/${commentId}`, {
        method: "DELETE"
    })
    .then(() => {
        alert('Comment deleted')
        fetchData()
    })
}
function handleLogOut() {
    googleLogout()
    cookies.remove('user_session')
    isLoggedIn.value = false
}


onMounted(() => {
    checkSession()
    fetchData()
    
})


</script>

<template>
    <div class="bg-image" style="background-color: chocolate;">
    <div class="bg-image" style="background-image: url('https://images.unsplash.com/photo-1530685932526-48ec92998eaa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
        height: 100vh">
        <h1 class="bg-light p-4" style="--bs-bg-opacity: .25; text-align: center">Welcome to Forum</h1>
        <nav aria-label="breadcrumb" class="bg-light p-2" style="--bs-bg-opacity: .25; text-align: center">
            <ol class="breadcrumb">
                <div class="navbar navbar-expand-lg">
                <li class="breadcrumb-item" >
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
        <hr>
        <h4 class="bg-light p-2" style="--bs-bg-opacity: .25">Here you can get help by asking questions who have similar problems and recived detailed answers from our
            verified solicitors.</h4>
            
        <ul>
            <li  class="bg-light p-2" style="--bs-bg-opacity: .25" v-for="comment in commentsBe" :key="comment.id" >
                <h6>Title: {{ comment.title }} <br> Question: {{ comment.text }}</h6> &nbsp;
                <button v-if="isLoggedIn" class="btn btn-secondary" @click="deleteComment(comment._id)">Delete Thread</button>
                <RouterLink v-if="isLoggedIn" :to="'/comments/update/'+ comment._id" class="btn btn-secondary">Edit Comment</RouterLink>
            </li>
        </ul>
        <hr>

        <div>
            <h5></h5>
            <AddQuestion :fetchData="fetchData" />
        </div>
        <RouterLink :to="'/' " class="btn btn-secondary">Return Main Page</RouterLink>
    </div>
</div>
</template>