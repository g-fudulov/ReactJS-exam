import useGetMethod from "../hooks/useGetMethod";

export default function PublicProfile({ profileId }) {
  const [users, setUsers, isLoading] = useGetMethod(
    {},
    "http://localhost:3030/jsonstore/users/"
  );
  const user = Object.values(users).find((user) => user.key === profileId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <h1>{user.firstName}</h1>
      <section>
        <p>Email: {user.email}</p>
        <p>First Name: {user.firstName}</p>
        <p>Second Name: {user.secondName}</p>
        <p>Country: {user.location}</p>
        <p>Experience: {user.level}</p>
        <p>Joined: {new Date(user._createdOn).toString()}</p>
        <p>Public Profile ID: {profileId}</p>
      </section>
    </main>
  );
}
