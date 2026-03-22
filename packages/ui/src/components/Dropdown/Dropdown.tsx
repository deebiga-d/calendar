 "use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import "./Dropdown.css";

export type DropdownOption<T extends string = string> = {
  value: T;
  label: string;
  disabled?: boolean;
};

type Props<T extends string = string> = {
  label?: string;
  placeholder?: string;
  value?: T | null;
  options: DropdownOption<T>[];
  onChange: (value: T) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
};

const Dropdown = <T extends string = string>({
  label,
  placeholder = "Select…",
  value = null,
  options,
  onChange,
  disabled = false,
  error,
  className,
}: Props<T>) => {
  const id = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const selected = useMemo(
    () => options.find((o) => o.value === value) ?? null,
    [options, value]
  );

  useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (buttonRef.current?.contains(target)) return;
      if (listRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  const select = (v: T) => {
    onChange(v);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((p) => !p);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      const firstEnabled = options.find((o) => !o.disabled);
      if (firstEnabled) select(firstEnabled.value);
    }
  };

  return (
    <div className={`dropdown-root ${className ?? ""}`}>
      {label && (
        <label className="dropdown-label" htmlFor={id}>
          {label}
        </label>
      )}

      <button
        id={id}
        ref={buttonRef}
        type="button"
        className={`dropdown-trigger ${error ? "is-error" : ""}`}
        onClick={() => !disabled && setOpen((p) => !p)}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
      >
        <span className={`dropdown-value ${selected ? "" : "is-placeholder"}`}>
          {selected ? selected.label : placeholder}
        </span>
        <span className={`dropdown-caret ${open ? "is-open" : ""}`} aria-hidden>
          ▾
        </span>
      </button>

      {open && (
        <div ref={listRef} className="dropdown-menu" role="listbox">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                className={`dropdown-item ${isSelected ? "is-selected" : ""}`}
                onClick={() => !opt.disabled && select(opt.value)}
                disabled={opt.disabled}
                role="option"
                aria-selected={isSelected}
              >
                <span>{opt.label}</span>
                {isSelected && <span className="dropdown-check">✓</span>}
              </button>
            );
          })}
        </div>
      )}

      {error && <div className="dropdown-error">{error}</div>}
    </div>
  );
};

export default Dropdown;
