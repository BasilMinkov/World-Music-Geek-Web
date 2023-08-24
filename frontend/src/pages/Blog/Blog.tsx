import React from 'react'
import Layout from '../../hoc/Layout'
import PostPreview from '../../components/PostPreview/PostPreview'
import './Blog.scss'

const Blog: React.FC = () => {

    return (
        <Layout>
            <div className="blog">
                {/* {data.map((post, key) => {
                    return (
                        <PostPreview
                            title={post.title}
                            author={post.author}
                            release_date={post.release_date}
                            imageLink={post.imageLink}
                        />
                    )
                })} */}
            </div>
        </Layout>
    )
}

export default Blog