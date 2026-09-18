import type { ReactNode } from 'react';

type PhoneShellProps = {
  children: ReactNode;
  toast?: ReactNode;
};

export default function PhoneShell({ children, toast }: PhoneShellProps) {
  return (
    <div className="vi-phone">
      <div className="vi-phone__notch" />
      <div className="vi-phone__screen">
        {children}
        {toast}
      </div>
      <div className="vi-phone__home" />
    </div>
  );
}
