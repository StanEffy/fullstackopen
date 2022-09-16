import React, {useState} from 'react';

const BlogForm = () => {
    const [blogpost, setBlogpost] = useState({
        title: "",
        author: "",
        url: "",
    })

    const handleSubmit = () => {}
    return (
        <form onSubmit={handleSubmit}>
            <div>
            <label>
                username
                <input
                    type="text"
                    value={blogpost.title}
                    name="title"
                    onChange={({ target }) =>  setBlogpost(prev =>( {...prev, title: target.value}))}
                />
            </label>
            </div>
            <div>
            <label>
                author
                <input
                    type="text"
                    value={blogpost.author}
                    name="author"
                    onChange={({ target }) =>  setBlogpost(prev =>( {...prev, author: target.value}))}
                />
            </label>
            </div>
            <div>
            <label>
                url
                <input
                    type="text"
                    value={blogpost.url}
                    name="url"
                    onChange={({ target }) =>  setBlogpost(prev =>( {...prev, url: target.value}))}
                />
            </label>
            </div>
        </form>
    );
};

export default BlogForm;
