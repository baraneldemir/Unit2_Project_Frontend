CRUD App

I have used node, express, mongoDB and vueJS to create this app.

https://speedyfine.netlify.app/ //you can access the app using this link

It was a total of 4 days journey to create this basic crud app.

1) First of all i started with creating views. After that i have created route paths and have imported all of them as you can see in the code below.

``` 
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginFormView from '@/views/LoginFormView.vue'
import ForumView from '@/views/ForumView.vue'
import PayView from '@/views/PayView.vue'
import ChallengeView from '@/views/ChallengeView.vue'
import CommentEditView from '@/views/CommentEditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login/form',
      name: 'loginForm',
      component: LoginFormView
    },
    {
      path: '/login/forum',
      name: 'loginForum',
      component: ForumView
    },
    {
      path: '/login/pay',
      name: 'loginPay',
      component: PayView
    },
    {
      path: '/login/challenge',
      name: 'loginChallenge',
      component: ChallengeView
    },
    {
      path:'/comments/update/:id',
      name: 'editcomments',
      component: CommentEditView
    },
    
    
  ]
})

export default router


    
    

    
  ```

  2) Then i spent a few hours to initilase the backend through node express. and have downloaded all the dependencies that i needed. And started importing them in my backend server.js
  

  ```
        import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'


const app = express()

app.use(cors())
app.use(bodyParser.json())

const port = process.env.PORT || 4000 

app.listen(port,() => {
    console.log(`listening on port: ${port}`)
})

mongoose.connect(process.env.DATABASE_URL)

const userSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        requird: true
    },
    userPicture: {
        type: String,
        required: true
    }
})

const commentSchema = new mongoose.Schema({
    title: String,
    text: String,
})

const User = mongoose.model('User', userSchema)
const Comment = mongoose.model('Comment', commentSchema)

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Speeding Fine App'
    })
})
app.get('/login/form', (req, res) => {
    res.json({
        message: 'Welcome to form page'
    })
})

app.get('/comments', async(req, res) => {
    const allComments = await Comment.find({})
    res.json(allComments)
})
app.post('/comments/add',(req, res) => {
    const comment = req.body
    const newComment = new Comment({
        title: comment.title,
        text: comment.text,
    })
    newComment.save()
    .then(() => {
        console.log('Comment saved')
        res.sendStatus(200)
    })
    .catch(err => console.error(err))
})
app.put('/comments/:id', (req, res) => {
    Comment.updateOne({"_id": req.params.id}, {title: req.body.title, text: req.body.text})
    .then(() => {
        res.sendStatus(200)
    })
    .catch(err => {
        res.sendStatus(500)
    })
})
app.delete('/comments/:id', (req, res) => {
    Comment.findByIdAndDelete(req.params.id)
    .then(() => {
        res.sendStatus(200)
    })
    .catch( err => {
        res.sendStatus(500)
    })
})







app.post('/user/login', async (req, res) => {
    const now = new Date()

    // create a new user if it doesnt exist
    if ( await User.countDocuments({"userEmail": req.body.userEmail}) === 0 ) {
        const newUser = new User({
            userEmail: req.body.userEmail,
            lastLogin: now
        })
        newUser.save()
        .then(() => {
            res.sendStatus(200)
        })
        .catch( err => {
            res.sendStatus(500)
        })
    } else {
        //existing user
        await User.findOneAndUpdate({"userEmail": req.body.userEmail}, {lastLogin: now})
        res.sendStatus(200)
    } 
})


             
  ```

3) After that i created to schemas one for user and one for inputs of the user.

```
    const userSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        requird: true
    },
    userPicture: {
        type: String,
        required: true
    }
})

const commentSchema = new mongoose.Schema({
    title: String,
    text: String,
})

const User = mongoose.model('User', userSchema)
const Comment = mongoose.model('Comment', commentSchema)
```


4) Then i worked around connectiong routes for backend and frontend

```
    
    app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Speeding Fine App'
    })
})
app.get('/login/form', (req, res) => {
    res.json({
        message: 'Welcome to form page'
    })
})

app.get('/comments', async(req, res) => {
    const allComments = await Comment.find({})
    res.json(allComments)
})
app.post('/comments/add',(req, res) => {
    const comment = req.body
    const newComment = new Comment({
        title: comment.title,
        text: comment.text,
    })
    newComment.save()
    .then(() => {
        console.log('Comment saved')
        res.sendStatus(200)
    })
    .catch(err => console.error(err))
})
  
```

5) And after these were done i went to front end and started creating my view pages. Fetch all the datas that is coming from backend and connected them to work with endpoints.



