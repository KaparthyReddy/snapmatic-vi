import type { FeedPost } from '../types';

type FeedScreenProps = {
  posts: FeedPost[];
  onBack: () => void;
};

export default function FeedScreen({ posts, onBack }: FeedScreenProps) {
  return (
    <div className="vi-feed">
      <div className="vi-roll__header">
        <button className="vi-iconbtn" onClick={onBack} aria-label="Back">
          ←
        </button>
        <h2 className="vi-display" style={{ fontSize: 18, margin: 0 }}>
          Vice Feed
        </h2>
        <span style={{ width: 34 }} />
      </div>
      <div className="vi-feed__list">
        {posts.length === 0 && <p className="vi-feed__empty">Nothing posted yet.</p>}
        {posts.map((post) => (
          <div key={post.id} className="vi-feed__post">
            <img src={post.dataUrl} alt="Posted" className="vi-feed__image" />
            <div className="vi-feed__comments">
              {post.comments.map((comment, i) => (
                <p key={i} className="vi-feed__comment">
                  <span className="vi-feed__handle">{comment.handle}</span> {comment.text}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
