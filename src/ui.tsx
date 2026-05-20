import {
  useState,
  type CSSProperties,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";

const MOTION_BLUE = "#3B66D4";

export const theme = {
  bg: { elevated: "#ffffff" },
  fill: {
    quaternary: "#f0f0f2",
    tertiary: "#e8e8ed",
    primary: "#e4e4e9",
  },
  stroke: {
    primary: "#c8c8d0",
    secondary: "#e0e0e6",
    tertiary: "#ececf0",
  },
  text: {
    primary: "#1a1a1a",
    secondary: "#5c5c66",
    tertiary: "#8a8a94",
    quaternary: "#a8a8b0",
    onAccent: "#ffffff",
    link: MOTION_BLUE,
  },
  diff: { insertedLine: "#e8f5e9" },
} as const;

export function useHostTheme() {
  return theme;
}

export function useCanvasState<T>(_key: string, initial: T): [T, (v: T) => void] {
  return useState(initial);
}

type StyleProps = { style?: CSSProperties; children?: ReactNode };

export function Stack({ gap = 8, style, children }: StyleProps & { gap?: number }) {
  return <div style={{ display: "flex", flexDirection: "column", gap, ...style }}>{children}</div>;
}

export function Row({
  gap = 8,
  align = "center",
  justify,
  wrap,
  style,
  children,
}: StyleProps & {
  gap?: number;
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  wrap?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap ? "wrap" : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Grid({
  columns,
  gap = 8,
  style,
  children,
}: StyleProps & { columns: number; gap?: number }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Spacer() {
  return <div style={{ flex: 1 }} />;
}

export function Divider({ style }: { style?: CSSProperties }) {
  return <hr style={{ border: "none", borderTop: `1px solid ${theme.stroke.secondary}`, margin: 0, ...style }} />;
}

export function H1({ style, children }: StyleProps) {
  return <h1 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 700, ...style }}>{children}</h1>;
}

export function H2({ style, children }: StyleProps) {
  return <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, ...style }}>{children}</h2>;
}

export function H3({ style, children }: StyleProps) {
  return <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, ...style }}>{children}</h3>;
}

export function Text({
  size,
  weight,
  tone,
  style,
  children,
}: StyleProps & {
  size?: "small";
  weight?: "semibold" | "bold" | "normal";
  tone?: "secondary" | "tertiary" | "quaternary";
}) {
  const color =
    tone === "secondary"
      ? theme.text.secondary
      : tone === "tertiary"
        ? theme.text.tertiary
        : tone === "quaternary"
          ? theme.text.quaternary
          : theme.text.primary;
  return (
    <span
      style={{
        fontSize: size === "small" ? 12 : 14,
        fontWeight: weight === "bold" ? 700 : weight === "semibold" ? 600 : 400,
        color,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export function Button({
  variant = "primary",
  style,
  children,
  ...rest
}: StyleProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost";
  }) {
  const base: CSSProperties = {
    padding: "8px 14px",
    borderRadius: 8,
    border: "1px solid transparent",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 13,
  };
  const variants: Record<string, CSSProperties> = {
    primary: { background: MOTION_BLUE, color: "#fff", borderColor: MOTION_BLUE },
    secondary: { background: "#fff", color: theme.text.primary, borderColor: theme.stroke.primary },
    ghost: { background: "transparent", color: theme.text.link, borderColor: "transparent" },
  };
  return (
    <button type="button" style={{ ...base, ...variants[variant], ...style }} {...rest}>
      {children}
    </button>
  );
}

export function Pill({
  active,
  onClick,
  size,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  size?: "sm";
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: size === "sm" ? "3px 8px" : "6px 12px",
        borderRadius: 999,
        border: `1px solid ${active ? MOTION_BLUE : theme.stroke.secondary}`,
        background: active ? MOTION_BLUE : theme.bg.elevated,
        color: active ? "#fff" : theme.text.primary,
        fontSize: size === "sm" ? 11 : 13,
        fontWeight: 600,
        cursor: onClick ? "pointer" : "default",
      }}
    >
      {children}
    </button>
  );
}

export function Card({ children, style }: StyleProps) {
  return (
    <div
      style={{
        background: theme.bg.elevated,
        borderRadius: 10,
        border: `1px solid ${theme.stroke.secondary}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children }: { children?: ReactNode }) {
  return (
    <div
      style={{
        padding: "10px 12px",
        borderBottom: `1px solid ${theme.stroke.secondary}`,
        fontWeight: 600,
        fontSize: 13,
      }}
    >
      {children}
    </div>
  );
}

export function CardBody({ children }: { children?: ReactNode }) {
  return <div style={{ padding: 12 }}>{children}</div>;
}

export function Callout({
  title,
  tone = "info",
  children,
}: {
  title?: string;
  tone?: "info";
  children?: ReactNode;
}) {
  const bg = tone === "info" ? "#eef2fc" : theme.fill.tertiary;
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 10,
        background: bg,
        border: `1px solid ${theme.stroke.secondary}`,
        fontSize: 13,
      }}
    >
      {title && <strong style={{ display: "block", marginBottom: 4 }}>{title}</strong>}
      {children}
    </div>
  );
}

export function TextInput({
  value,
  onChange,
  type = "text",
  style,
}: {
  value?: string;
  onChange?: (v: string) => void;
  type?: string;
  style?: CSSProperties;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      style={{
        width: "100%",
        padding: "8px 10px",
        borderRadius: 8,
        border: `1px solid ${theme.stroke.primary}`,
        ...style,
      }}
    />
  );
}

export function TextArea({
  value,
  onChange,
  rows = 3,
}: {
  value?: string;
  onChange?: (v: string) => void;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      rows={rows}
      onChange={(e) => onChange?.(e.target.value)}
      style={{
        width: "100%",
        padding: "8px 10px",
        borderRadius: 8,
        border: `1px solid ${theme.stroke.primary}`,
        resize: "vertical",
      }}
    />
  );
}

export function Select({
  value,
  onChange,
  options,
  placeholder,
  disabled,
  style,
}: {
  value?: string;
  onChange?: (v: string) => void;
  options: { value: string; label: string; disabled?: boolean }[];
  placeholder?: string;
  disabled?: boolean;
  style?: CSSProperties;
}) {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.value)}
      style={{
        padding: "8px 10px",
        borderRadius: 8,
        border: `1px solid ${theme.stroke.primary}`,
        background: "#fff",
        ...style,
      }}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((o) => (
        <option key={o.value} value={o.value} disabled={o.disabled}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked?: boolean;
  onChange?: (v: boolean) => void;
  label?: string;
}) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, cursor: "pointer" }}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange?.(e.target.checked)} />
      {label}
    </label>
  );
}

export function Toggle({ checked, onChange }: { checked?: boolean; onChange?: (v: boolean) => void }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange?.(e.target.checked)}
      style={{ width: 14, height: 14 }}
    />
  );
}
