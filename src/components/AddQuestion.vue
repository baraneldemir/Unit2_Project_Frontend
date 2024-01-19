<script setup>
import { ref } from 'vue'
const { fetchData } = defineProps(['fetchData'])
const comment = ref({
    title: '',
    text: '',
})
function addComment() {
    if (comment.value.title === '' || comment.value.text === '') {
        alert('Please fill both areas')
        return
    }
    
    fetch(`${import.meta.env.VITE_API_URL}/comments/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment.value)
    })
        .then(res => {
            comment.value = {
                title: '',
                text: '',
            }
            console.log(res)

        })
        .catch(err => console.error(err))
}

</script>

<template>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"> Ask a new question</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Title" v-model="comment.title" required>
        </div>
        <div class="mb-3">
           
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Your question here" v-model="comment.text"
                required></textarea>
        </div>
        <button @click="addComment">Add Comment</button>
</template>