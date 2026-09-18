import type { AppId } from '../types';

type AppDef = {
  id: AppId;
  label: string;
  icon: string;
  disabled?: boolean;
};

const APPS: AppDef[] = [
  { id: 'camera', label: 'Camera', icon: '📷' },
  { id: 'feed', label: 'Vice Feed', icon: '📡', disabled: true },
  { id: 'settings', label: 'Settings', icon: '⚙️', disabled: true },
];

type AppGridProps = {
  onOpen: (id: AppId) => void;
};

export default function AppGrid({ onOpen }: AppGridProps) {
  return (
    <div className="vi-appgrid">
      {APPS.map((app) => (
        <button
          key={app.id}
          className="vi-app"
          disabled={app.disabled}
          onClick={() => onOpen(app.id)}
          title={app.disabled ? 'Coming soon' : app.label}
        >
          <span className="vi-app__icon">{app.icon}</span>
          <span className="vi-app__label">{app.label}</span>
        </button>
      ))}
    </div>
  );
}
