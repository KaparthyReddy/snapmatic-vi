import type { ReactNode } from 'react';

type PhoneShellProps = {
  children: ReactNode;
};

export default function PhoneShell({ children }: PhoneShellProps) {
  return (
    <div className="vi-phone">
      <div className="vi-phone__notch" />
      <div className="vi-phone__screen">{children}</div>
      <div className="vi-phone__home" />
    </div>
  );
}
