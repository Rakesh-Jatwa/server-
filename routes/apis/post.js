const express = require('express');
const router = express.Router();
const Post = require('../../models/post');
// const jwt = require('express-jwt');

// get all post
router.get('/', (req, res) => {
    console.log('=>', req.query);
    // const page = parseInt(req.query.page);
    // const limit = parseInt(req.query.limit);
    // const startIndex = (page - 1) * limit;
    // const latsIndex = page * limit;
    // const results = {};
    // results.previous = {
    //     page: page - 1,
    //     limit: limit
    // }
    // results.next = {
    //     page: page + 1,
    //     limit: limit
    // }
    Post.find()
        .then((posts) => {
            // const result = posts.slice(startIndex, latsIndex);
            res.json(posts);
        }).catch(err => {
            console.log(err);

        });
});

// create post 
router.post('/add', (req, res, next) => {
    console.log("req>>:>>", req.body);
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;
    const mobile = req.body.mobile;

    var newPosts = new Post({
        name,
        email,
        address,
        mobile
    });
    console.log(newPosts);
    newPosts.save().then((post) => {
        console.log(post);
        res.json(post);

    }).catch(err => {
        console.log(err);

    });

});

// update apis
router.put('/update/:id', (req, res, nex) => {
    let id = req.params.id;
    Post.findById(id)
        .then((result) => {
            result.name = req.body.name;
            result.email = req.body.email;
            result.address = req.body.address;
            result.mobile = req.body.mobile;
            result.save()
                .then((post) => {
                    res.send({ message: "Data Updated succesfullly", status: 'success', post: post })
                }).catch((err) => {
                    console.log(err);

                })
        }).catch((err) => {
            console.log(err);

        })
});

router.delete('/delete/:id', (req, res, next) => {
    let id = req.params.id;
    Post.findById(id)
        .then((result) => {
            result.delete()
                .then((post) => {
                    res.send({ message: "Data deleted succesfullly", status: 'success', post: post })
                }).catch((err) => {
                    console.log(err);

                });
        }).catch((err) => {
            console.log(err);

        });

});
// router.post('/login', (req, res) => {

//     console.log('req.body====>', req.body);

//     Post.findOne(
//         {
//             name: req.body.name,
//             email: req.body.email
//         }).then((posts) => {
//             console.log("===>login", posts);
//             // const sub = req.body._id;
//             // console.log('IDDDDD====>', posts._id);
//             // const token = jwt.sign({ sub: user.id }, config.secret);
//             // const { name, email } = user;
//             // console.log("token", token);


//             res.json(posts);
//         }).catch(err => {
//             console.log(err);

//         });

// })


module.exports = router;