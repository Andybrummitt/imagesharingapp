//  Get Posts
//  POST /api/posts
//  Public Route
const getPosts = (req, res) => {
    res.status(200).json({message: 'get posts'})
}

//  Create A Post
//  POST /api/posts
//  Private Route
const createPost = (req, res) => {
    res.status(200).json({message: 'create post'})
}

//  Get User
//  DELETE /api/posts/:id
//  Private Route
const deletePost = (req, res) => {
    res.status(200).json({message: 'delete post' + req.params.id})
}

//  Delete User
//  DELETE /api/posts/:id
//  Private Route
const updatePost = (req, res) => {
    res.status(200).json({message: 'update post' + req.params.id})
}

module.exports = { 
    getPosts,
    createPost,
    deletePost,
    updatePost
}