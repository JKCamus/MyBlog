'use client'
import Banner from './home/Banner';
import Picture from './home/Picture';
export default async function Page() {
  // const sortedPosts = sortPosts(allBlogs)
  // const posts = allCoreContent(sortedPosts)
  // return <Main posts={posts} />

  return (
    <>
      <Banner ></Banner>
      <Picture></Picture>
    </>
  )
}

