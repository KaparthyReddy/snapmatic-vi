import type { FeedPost } from '../types';

type FeedScreenProps = {
  posts: FeedPost[];
  onBack: () => void;
  onOpenPost: (post: FeedPost) => void;
};

export default function FeedScreen({ posts, onBack, onOpenPost }: FeedScreenProps) {
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
        {posts.map((post) => {
          const latest = post.comments?.[0];
          return (
            <div key={post.id} className="vi-feed__post">
              <div className="vi-feed__imagewrap">
                <img src={post.dataUrl} alt="Posted" className="vi-feed__image" />
                <button
                  className="vi-feed__commenticon"
                  onClick={() => onOpenPost(post)}
                  title="View comments"
                  aria-label="View comments"
                >
                  💬
                </button>
              </div>
              <p className="vi-feed__comment vi-feed__comment--preview">
                {latest ? (
                  <>
                    <span className="vi-feed__handle">{latest.handle}</span> {latest.text}
                  </>
                ) : (
                  <span className="vi-feed__handle" style={{ color: 'var(--vi-muted)' }}>
                    No comments yet
                  </span>
                )}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}