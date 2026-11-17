import { Cog8ToothIcon } from '@heroicons/react/16/solid';
import { Button } from '@preview/shell/components/ui/button';
import { useSidebar } from '@preview/shell/components/ui/sidebar';

import type { ColorScheme } from './params';

type NavbarProps = {
  /** The options panel this bar's toggle opens and closes. */
  optionsId: string;
  /** The scheme the preview (and this shell) currently shows. */
  scheme: ColorScheme;
  /** Cycles the preview's background scheme. */
  onSchemeChange: (scheme: ColorScheme) => void;
};

const SCHEME_ORDER: readonly ColorScheme[] = ['auto', 'light', 'dark'];

const SCHEME_LABEL: Record<ColorScheme, string> = {
  auto: 'System background',
  light: 'Light background',
  dark: 'Dark background',
};

/** The monitor icon for "system", drawn inline; heroicons has no 16px variant. */
function SystemIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1.5" y="2.5" width="13" height="8.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5.5 13.5h5M8 11v2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" />
    </svg>
  );
}

/** The Nocturne mark: a reel echoing the skin's playhead. */
function ReelMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="4" />
      <g fill="currentColor">
        <circle cx="32" cy="14" r="6" />
        <circle cx="47.7" cy="23" r="6" />
        <circle cx="47.7" cy="41" r="6" />
        <circle cx="32" cy="50" r="6" />
        <circle cx="16.3" cy="41" r="6" />
        <circle cx="16.3" cy="23" r="6" />
      </g>
      <circle cx="32" cy="32" r="7" fill="currentColor" />
    </svg>
  );
}

/** Nocturne branding on the left; scheme switcher and tools on the right. */
export function Navbar({ optionsId, scheme, onSchemeChange }: NavbarProps) {
  const { isMobile, open, openMobile, toggleSidebar } = useSidebar();

  const nextScheme = SCHEME_ORDER[(SCHEME_ORDER.indexOf(scheme) + 1) % SCHEME_ORDER.length]!;

  return (
    <header className="bg-background/95 border-border flex h-14 shrink-0 items-center gap-4 border-b px-4">
      <div className="flex min-w-0 items-center gap-2.5">
        <ReelMark className="text-amber-400 size-5 shrink-0" />
        <h1 className="text-foreground truncate text-base font-semibold tracking-[0.14em] uppercase">
          Nocturne
        </h1>
      </div>

      <div className="ml-auto flex items-center gap-1">
        {/* Cycles system → light → dark; shows the scheme currently applied. */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          aria-label={SCHEME_LABEL[scheme]}
          title={`Background: ${scheme} — click for ${nextScheme}`}
          onClick={() => onSchemeChange(nextScheme)}
        >
          {scheme === 'auto' && <SystemIcon className="size-4" />}
          {scheme === 'light' && <SunIcon className="size-4" />}
          {scheme === 'dark' && <MoonIcon className="size-4" />}
          <span className="text-xs capitalize">{scheme === 'auto' ? 'system' : scheme}</span>
        </Button>
        <Button
          id={`${optionsId}-trigger`}
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Options"
          aria-expanded={isMobile ? openMobile : open}
          aria-controls={optionsId}
          onClick={() => {
            toggleSidebar();

            if (!isMobile && !open) {
              requestAnimationFrame(() => document.getElementById(`${optionsId}-close`)?.focus());
            }
          }}
        >
          <Cog8ToothIcon className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </header>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M8 1v1.75M8 13.25V15M15 8h-1.75M2.75 8H1M12.95 3.05l-1.24 1.24M4.29 11.71l-1.24 1.24M12.95 12.95l-1.24-1.24M4.29 4.29L3.05 3.05"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="square"
      />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.5 9.75A6 6 0 0 1 6.25 2.5a6 6 0 1 0 7.25 7.25Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="bevel"
      />
    </svg>
  );
}
