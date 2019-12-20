const express = require('express');
const router = express.Router();
const ig = require('instagram-scraping')
const moment = require('moment')
const {ig: Post} = require('../model')

router.get('/', (req, res, next) => {
    ig.deepScrapeTagPage('ootd').then(data => {
        data.medias.forEach(data => {
            Post.create({
                username: data.owner.username,
                image: data.display_url,
                like: data.edge_media_preview_like.count,
                comment: data.edge_media_to_parent_comment.count > data.edge_media_preview_comment.count ? data.edge_media_to_parent_comment.count : data.edge_media_preview_comment.count,
                tanggalPosting: moment(data.taken_at_timestamp).toISOString()
            }).catch(err => console.log(err))
        })
        res.status(200).json(data)
    })
})

module.exports = router;
