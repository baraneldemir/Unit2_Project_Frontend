<script setup>
import { ref } from 'vue'
//because we are using eslink format errors not coding.
// {} deconstruct fetch
const {fetchData} = defineProps(['fetchData'])
const comment = ref({
    title: '',
    text: '',
})
function addComment() {
    if( comment.value.title === '' || comment.value.text === '') {
        alert('Please fill both areas')
        return
    }
    //this fetch first line is a get request 
    fetch(`${import.meta.env.VITE_API_URL}/comment/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment.value)
    })
    .then(res => {
        comment.value= {
        title: '',
        text: '',
        }
        console.log(res)
        
    })
    .catch(err => console.error(err))
}

</script>

<template>
    <h3>Add a new comment</h3>
    <div class="bookForm">
        <label for="title">Title: *</label>
        <input type="text" name="title" placeholder="Title" v-model="book.title" required>
        <label for="author">Author: *</label>
        <input type="text" name="author" placeholder="Author" v-model="book.author" required>
        <label for="Year">Publisihing Year: *</label>
        <input type="number" min="1500" name="Year" placeholder="Year" v-model="book.year" required>
        <button @click="addBook">Add Comment</button>
        <!-- whenever button is clicked function will run vue syntax -->
    </div>
</template>