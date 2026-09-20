import type { FeedPost } from '../types';

type PostDetailProps = {
  post: FeedPost;
  onBack: () => void;
};

export default function PostDetail({ post, onBack }: PostDetailProps) {
  return (
    <div className="vi-feed">
      <div className="vi-roll__header">
        <button className="vi-iconbtn" onClick={onBack} aria-label="Back">
          ←
        </button>
        <h2 className="vi-display" style={{ fontSize: 18, margin: 0 }}>
          Post
        </h2>
        <span style={{ width: 34 }} />
      </div>
      <div className="vi-feed__list">
        <div className="vi-feed__post">
          <div className="vi-feed__imagewrap">
            <img src={post.dataUrl} alt="Posted" className="vi-feed__image" />
          </div>
          <div className="vi-feed__comments">
            {post.comments.map((comment, i) => (
              <p key={i} className="vi-feed__comment">
                <span className="vi-feed__handle">{comment.handle}</span> {comment.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}