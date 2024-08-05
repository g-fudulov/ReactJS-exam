import PostsShow from "./PostsShow";
import ApplicationsShow from "./ApplicationsShow";

export default function PrivateProfile({ profileId, currentUser }) {
  return (
    <main>
      <h1>Welcome, {currentUser.firstName}</h1>
      <section>
        <p>Email: {currentUser.email}</p>
        <p>First Name: {currentUser.firstName}</p>
        <p>Second Name: {currentUser.secondName}</p>
        <p>Country: {currentUser.location}</p>
        <p>Experience: {currentUser.level}</p>
        <p>Joined: {new Date(currentUser._createdOn).toString()}</p>
        <p>Public Profile ID: {profileId}</p>
      </section>
      <PostsShow profileId={profileId} />
      <ApplicationsShow profileId={profileId} />
    </main>
  );
}
