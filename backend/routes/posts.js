const express = require('express');
const multer = require('multer');
const Post = require('../models/post');
const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg', 
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Extension no valida");
        if(isValid) {
            error = null;
        }
        cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});

router.post('', multer({storage: storage}).single("image"), (req, res, next) => {
    const url = req.protocol + '//' + req.get("host");
    const post = new Post({
        title: req.body.title,
        date: req.body.date,
        category: req.body.category,
        author: req.body.author,
        content: req.body.content,
        contact: req.body.contact,
        imagePath: url + "/image/" + req.file.filename
    });
    post.save().then(createdPost => {
        res.status(201).json({
            message: 'Post Added Succesfully',
            post: {
                ...createdPost,
                id: createdPost._id
            }
        });
    });
});

router.get('', (req, res, next) => {
    Post.find().then(datosDB => {
        res.status(200).json({
            message: "Publicaciones expuestas con exito",
            posts: datosDB
        });
    });
});

router.get('/:id', (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if(post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({message: 'Post no encontrado'});
        }
    })
});

router.put('/:id', (req, res, next) => {
    const post = new Post( {
        _id: req.params.id,
        title: req.body.title,
        date: req.body.date,
        category: req.body.category,
        author: req.body.author,
        content: req.body.content,
        contact: req.body.contact
    });
    
    Post.updateOne({_id: req.params.id}, post).then(result => {
        console.log(result);
        res.status(200).json({message: 'Actualizacion Exitosa'});
    });
});

router.delete('/:id', (req, res, next) => {
    Post.deleteOne({_id: req.params.id})
    .then(result => {
        console.log(result);
    });
    res.status(200).json({message: 'Publicacion Eliminada'});
});

module.exports = router;
