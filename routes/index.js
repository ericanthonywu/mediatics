const express = require('express');
const router = express.Router();
const ig = require('instagram-scraping')
const moment = require('moment')
const {ig: Post} = require('../model')
const mongoose = require('mongoose')

router.get('/', async (req, res) => {
    const postData = []
    const scrap = () => ig.deepScrapeTagPage('ootd').then(data => {
        data.medias.forEach(data => {
            postData.push({
                username: data.owner.username || "",
                image: data.display_url,
                like: data.edge_media_preview_like.count,
                comment: data.edge_media_to_parent_comment.count > data.edge_media_preview_comment.count ? data.edge_media_to_parent_comment.count : data.edge_media_preview_comment.count,
                tanggalPosting: moment(data.taken_at_timestamp).toISOString()
            })
        })
    }).catch(err => res.status(500).json(err))
    await scrap()
    Post.insertMany(postData).then(() => res.status(200).json()).catch(err => console.log(err)).finally(() => mongoose.connection.close())
})

module.exports = router;
