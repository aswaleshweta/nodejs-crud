const express = require("express")
const Post = require("./model/post") // new
const router = express.Router()

// Get all posts
router.get("/blog", async (req, res) => {
	const posts = await Post.find()
  res.send({
    status: 200 , data: posts,
    success: true
  })
})


router.post("/blog", async (req, res) => {
  try {
		const post = new Post({
		title: req.body.title,
		content: req.body.content,
	  })
	  await post.save()
    res.send({
      status: 200 , message: "Record saved successfully.",
      success: true
    })
	} catch {
		res.status(400)
    res.send({ status: 400 ,message: "Erro While Saving Record",
      success: false })
	}
})

router.get("/blog/:id", async (req, res) => {
	try {
		const post = await Post.findOne({ _id: req.params.id })
		// res.send(post)
    res.send({
      status: 200 , data: post,
      message: "Record Fetched Successfully",
      success: true
    })
    
	} catch {
		res.status(404)
    res.send({ status: 404 ,message: "Record Not Found",
    success: false })
	}
})

router.patch("/blog/:id", async (req, res) => {
	try {
		const post = await Post.findOne({ _id: req.params.id })

		if (req.body.title) {
			post.title = req.body.title
		}

		if (req.body.content) {
			post.content = req.body.content
		}
		await post.save()
    res.send({
      status: 200 , message: "Successfully updated Record",
      success: true
    })
	} catch {
		res.status(404)
		res.send({ status: 404 ,message: "Record doesn't exist!",
      success: false })
	}
})


router.delete("/blog/:id", async (req, res) => {
	try {
		await Post.deleteOne({ _id: req.params.id })
		res.status(200)
    res.send({
      status: 200 ,message: "Record Deleted Successfully",
      success: true
    })
	} catch {
		res.status(404)
    res.send({ status: 404 ,message: "Record doesn't exist!",
      success: false })
	}
})

module.exports = router