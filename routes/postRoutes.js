const router = require('express').Router();

const Post = require('../models/Post');

const fs = require('fs');

// Import file
const postsData = fs.readFileSync('data/postsData.json');
const data = JSON.parse(postsData);
// console.log(data);
const postArrays = data;

router.get('/posts', (req, res) =>{
    res.send(data);
});
router.get('/posts/red-flags', (req, res) =>{
    data.forEach(post => {
        if(post.category === 'red flag') return res.send(post);
    });
});

router.get('/posts/interventions', (req, res) =>{
    data.forEach(post => {
        if(post.category === 'intervention') return res.send(post);
    });
});

router.post('/post/create', async (req, res) =>{
    const post = new Post({
        title: req.body.title,
        user_id: req.body.user_id,
        category: req.body.category,
        status: req.body.status,
        description: req.body.description,
        image_url: req.body.image_url
    });

    try {
        postArrays.push(post);
        let rawData = JSON.stringify(postArrays, null, 2);
        const savedPost = await fs.writeFile('data/postsData.json', rawData, err =>{
            if(err) throw err;
        });
        res.send({
            status: 'success',
            post: post._id,
            title: post.title,
            message: 'Incident reported!'
        }); 
    } catch (error) {
        res.status(400).send({
            status: 401,
            message: error
        });
        
    }
});

router.put('/post/:_id', (req, res) =>{
    const postItem = data.find(post => post._id === req.params._id);
    if(!postItem) return res.status(404).send('Post not found!');

    postItem.title = req.body.title;
    postItem.user_id = req.body.user_id;
    postItem.category = req.body.category;
    postItem.status = req.body.status;
    postItem.description = req.body.description;
    postItem.image_url = req.body.image_url;

    postArrays.push(postItem);
    let rawData = JSON.stringify(postArrays, null, 2);
    console.log(postItem);
    const savedPost = fs.writeFile('data/postsData.json', rawData, err =>{
        if(err) throw err;
    });
    res.send({
        status: 'success',
        post: postItem._id,
        title: postItem.title,
        message: 'Incident updated!'
    }); 
});

router.delete('/post/:_id', (req, res) =>{
    const postItem = data.find(post => post._id === req.params._id);
    if(!postItem) return res.status(404).send('Post not found!');
    
    const index = data.indexOf(postItem);
    data.splice(index, 1);
    res.send({
        status:'success!',
        post: postItem._id,
        message:'Post deleted!'
    });
});


module.exports = router;