import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import ImageEditor from '@unlayer/react-image-editor';

export type SavedImage = { dataUrl: string; blob: Blob };

export type PhotoEditorHandle = {
  getImage: () => string | null;
  hasChanges: () => boolean;
  reset: (imageUrl?: string) => void;
  isReady: () => boolean;
};

type PhotoEditorProps = {
  image: string;
  projectId?: number;
  onSave: (result: SavedImage) => void;
  onCancel?: () => void;
  onFailure?: (message: string) => void;
  onReady?: () => void;
  minHeight?: number | string;
};

const PhotoEditor = forwardRef<PhotoEditorHandle, PhotoEditorProps>(function PhotoEditor(
  { image, projectId, onSave, onCancel, onFailure, onReady, minHeight = 560 },
  ref
) {
  const editorRef = useRef<{ editor?: unknown } | null>(null);
  const [ready, setReady] = useState(false);

  const instance = () => {
    const editor = editorRef.current?.editor as
      | {
          getImage?: () => string | null;
          hasChanges?: () => boolean;
          reset?: (url?: string) => void;
        }
      | undefined;
    return editor ?? null;
  };

  useImperativeHandle(ref, () => ({
    getImage: () => instance()?.getImage?.() ?? null,
    hasChanges: () => instance()?.hasChanges?.() ?? false,
    reset: (imageUrl?: string) => instance()?.reset?.(imageUrl),
    isReady: () => ready,
  }));

  const handleLoad = useCallback(() => {
    setReady(true);
    onReady?.();
  }, [onReady]);

  const options = useMemo(
    () => ({
      theme: 'dark',
      locale: 'en',
      ...(projectId ? { projectId } : {}),
      features: {
        ...(projectId ? { ai: { enabled: true, assistant: true } } : {}),
        imageEditor: {
          dock: 'left',
          tools: {
            crop: true,
            resize: false,
            filter: true,
            draw: true,
            text: true,
            shapes: true,
            stickers: true,
            frame: true,
            corners: false,
          },
        },
      },
    }),
    [projectId]
  );

  return (
    <ImageEditor
      ref={editorRef}
      image={image}
      options={options}
      minHeight={minHeight}
      ariaLabel="Snapmatic photo editor"
      wrapperStyle={{ width: '100%', borderRadius: 'var(--vi-radius-lg)', overflow: 'hidden' }}
      onLoad={handleLoad}
      onSave={onSave}
      onCancel={onCancel}
      onLoadError={() => onFailure?.('That photo would not load into the canvas.')}
      onError={(error: Error) => onFailure?.(error?.message ?? 'The editor failed to start.')}
    />
  );
});

export default PhotoEditor;
