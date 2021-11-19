import Head from 'next/head'
import { useState,useEffect } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);
  
  useEffect(async () => {
    try {
      const res = await (await fetch('/api/users')).json(); 
      setLoading(false);  
      setUsers(res.users);
    } catch (error) {
      setLoading(false)
    }
    

    return () => {}
  }, [])


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Shopy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading && <div className="text-4xl">Loading...</div>}
      {!loading && users && users.map(user => (
        <div key={user._id}>
          <p className="text-3xl"><span className="font-semibold">name:</span> {user.name}</p>
          <p className="text-3xl"><span className="font-semibold">email:</span> {user.email}</p>
        </div>)
      )}
    </div>
  );
}
