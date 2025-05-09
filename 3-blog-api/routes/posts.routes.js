import { Router } from 'express';
import { readFile, writeFile } from 'fs/promises';

const router = Router();

const dataPath = './data/posts.json';

async function getPosts() {
    const data = await readFile(dataPath, 'utf-8');
    return JSON.parse(data);
}

async function savePosts(posts) {
    await writeFile(dataPath, JSON.stringify(posts, null, 2));
}

router.get('/', async (req, res) => {
    const posts = await getPosts();
    res.json(posts);
});

router.post('/', async (req, res) => {
    const posts = await getPosts();
    const newPost = {
        id: Date.now().toString(),
        title: req.body.title,
        content: req.body.content,
    };
    posts.push(newPost);
    await savePosts(posts);
    res.status(201).json(newPost);
});

router.delete('/:id', async (req, res) => {
    const posts = await getPosts();
    const index = posts.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Post not found" });

    posts[index] = { ...posts[index], ...req.body };
    await savePosts(posts);
    res.json(posts[index]);
});

router.delete('/:id', async (req, res) => {
     let posts = await getPosts();
     const lengthBefore = posts.length;
     posts = posts.filter((p) => p.id !== req.params.id);
     if (posts.length === lengthBefore)
       return res.status(404).json({ error: "Post not found" });

     await savePosts(posts);
     res.json({ message: "Post deleted" });
})

export default router;