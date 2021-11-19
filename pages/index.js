import Head from 'next/head'
import Axios from '../utils/Axios';

export default function Home({users}) {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Boilerplate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      { users && users.map(user => (
        <div key={user._id} className="bg-gray-200 p-2 rounded my-5 text-xl">
          <p><span className="font-semibold">name:</span> {user.name}</p>
          <p><span className="font-semibold">email:</span> {user.email}</p>
        </div>)
      )}
    </div>
  );
}
 
export const getServerSideProps = async () => {
  try {
    const users = (await Axios.get("users")).data.users;
    return {
      props: {
        users: JSON.parse(JSON.stringify(users))
      },     
    };
  } catch (error) {
    return { props: { users: null } };
  }
}