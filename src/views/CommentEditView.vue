<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const commentId = route.params.id
//route.params.id replaces /:id

const comment = ref({
    title: '',
    text: '',
    
})

function LoadCommentData () {
    fetch(`${import.meta.env.VITE_API_URL}/comments/${commentId}`)
    .then(res => res.json())
    .then(data => {
        comment.value =  {
            title: data.title,
            text: data.text,
        }
        console.log(comment.value);
    }) 
}

const updateComment = () => {
    fetch(`${import.meta.env.VITE_API_URL}/comments/${commentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment.value)
    })
    .then(() => {
        //replace or push same
        router.replace({name: 'comments'})
    })
    .catch(err => console.error(err))

}

onMounted(LoadCommentData)
</script>

<template>  
    <h1>Edit {{ comment.title }}</h1>
    <div class="bookForm">
        <label for="title">Title: *</label>
        <input type="text" name="title" placeholder="Title" v-model="comment.title" required>
        <label for="text">Text: *</label>
        <input type="text" name="text" placeholder="Text" v-model="comment.text" required>
        <button @click="updateComment">Add Question</button>
        


        <!-- whenever button is clicked function will run vue syntax -->
    </div>
    <RouterLink :to="'/'" class="btn btn-secondary">Return Home Page</RouterLink>
</template>