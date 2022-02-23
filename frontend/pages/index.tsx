import { NextPage } from 'next';
import Post from '../components/Post';
import MainLayout from '../layouts/MainLayout';
import { Api } from '../utils/api';
import { PostItem } from '../utils/api/types';

interface HomeProps {
  posts: PostItem[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <MainLayout>
      {posts?.map((post) => (
        <Post
          key={post.id}
          title={post.title}
          id={post.id}
          description={post.description}
          // imageUrl={post.}
        />
      ))}
    </MainLayout>
  );
};
// export const getServerSideProps: GetServerSideProps =
//   wrapper.getServerSideProps((store) => async (ctx) => {

//   });
export const getServerSideProps = async (ctx) => {
  try {
    const posts = await Api().post.getAll();
    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      posts: null,
    },
  };
};

export default Home;
