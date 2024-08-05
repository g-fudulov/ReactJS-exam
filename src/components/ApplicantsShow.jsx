import { Link } from "react-router-dom";

export default function ApplicantsShow({ candidates }) {
  return (
    <section>
    <h2>Applicants</h2>
      {Object.values(candidates).map((user) => (
        <Link key={user._id} to={`/profile/view/${user._id}`}>
          <p>
            {user.firstName} {user.secondName}
          </p>
        </Link>
      ))}
    </section>
  );
}
