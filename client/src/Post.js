import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
export default function Post({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) {
  return (
    <Link to={`/post/${_id}`}>
      <div className="post">
        <div className="image">
          <img
            src={`${process.env.REACT_APP_API_URL}/` + cover}
            alt="placeholder"
          />
        </div>
        <div className="text">
          <h2>{title}</h2>
          <p className="info">
            <a className="author">{author.username}</a>
            <time>{formatISO9075(new Date(createdAt))}</time>
          </p>
          <p className="summary">{summary}</p>
        </div>
      </div>
    </Link>
  );
}
