<script setup>
import { ref, onMounted } from 'vue'
import {RouterLink} from 'vue-router'
import { useCookies } from 'vue3-cookies'
import { decodeCredential, googleLogout} from 'vue3-google-login'

</script>

<template>
  <div class="bg-image" style="background-image: url('https://images.unsplash.com/photo-1530685932526-48ec92998eaa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
        height: 100vh">
    <h3 class="bg-light p-4" style="--bs-bg-opacity: .5; text-align: center">Form Screen</h3>
    
    <h4  class="bg-light p-4" style="--bs-bg-opacity: .5;">If you would like to seek more advice from one of our solicitors, please fill out the form. One of us will be back with you shortly.</h4>
    <form class="row g-3">
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">Email</label>
    <input type="email" class="form-control" id="inputEmail4" placeholder="Your Email">
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Full Name</label>
    <input type="text" class="form-control" id="inputPassword4" placeholder="Your Full Name">
  </div>
  <div class="col-12">
    <label for="inputAddress" class="form-label">Address</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
  </div>
  <div class="col-12">
    <label for="inputAddress2" class="form-label">Address 2</label>
    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
  </div>
  <div class="col-md-6">
    <label for="inputCity" class="form-label">City</label>
    <input type="text" class="form-control" id="inputCity" placeholder="City">
  </div>
  <div class="col-md-4">
    <label for="inputState" class="form-label">Country</label>
    <select id="inputState" class="form-select">
      <option selected>Choose...</option>
      <option>United Kingdom</option>
      <option>Germany</option>
      <option>Turkey</option>
      <option>Belgium</option>
    </select>
  </div>
  <div class="col-md-2">
    <label for="inputZip" class="form-label">Post Code</label>
    <input type="text" class="form-control" id="inputZip" placeholder="NW8 9GH">
  </div>
  <div class="col-12">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="gridCheck">
      <label class="form-check-label" for="gridCheck">
        Check me out
      </label>
    </div>
  </div>
  <div class="col-12">
    <button type="submit" class="btn btn-primary">Submit the form</button>
  </div>
  <RouterLink :to="'/'">Return Main Page</RouterLink>
</form>
</div>


</template>