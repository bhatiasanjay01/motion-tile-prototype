import {
  Button,
  Callout,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Pill,
  Row,
  Select,
  Spacer,
  Stack,
  Text,
  TextArea,
  TextInput,
  Toggle,
  useCanvasState,
  useHostTheme,
} from "cursor/canvas";
import type { CSSProperties, ReactNode } from "react";

type Screen =
  | "login"
  | "dashboard"
  | "dashboard-search"
  | "tiles"
  | "create"
  | "bulk-review"
  | "bulk-summary";

const NAV: { id: Screen; label: string }[] = [
  { id: "login", label: "Login" },
  { id: "dashboard", label: "Dashboard" },
  { id: "dashboard-search", label: "Dashboard · Search" },
  { id: "tiles", label: "Controls · Tiles" },
  { id: "create", label: "Add tile" },
  { id: "bulk-review", label: "Bulk review" },
  { id: "bulk-summary", label: "Bulk summary" },
];

/** Motion brand blue from official logo asset (Mosaic + Controls headers) */
const MOTION_BRAND_BLUE = "#3B66D4";

const MOTION_FONT =
  "'SF Pro Rounded', 'Nunito', 'Arial Rounded MT Bold', system-ui, -apple-system, sans-serif";

/**
 * Official mark: blue "motion" on white slanted parallelogram + ®
 * Works on brand-blue headers and login screen.
 */
function MotionLogo({ width = 132 }: { width?: number }) {
  const height = width * 0.36;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 132 48"
      aria-label="motion"
      style={{ display: "block", flexShrink: 0 }}
    >
      <path d="M4 5 L120 5 L114 43 L0 43 Z" fill="#FFFFFF" />
      <text
        x="20"
        y="31"
        fill={MOTION_BRAND_BLUE}
        fontSize="25"
        fontFamily={MOTION_FONT}
        fontWeight="700"
        letterSpacing="-0.3"
      >
        motion
      </text>
      <text x="122" y="12" fill="#FFFFFF" fontSize="10" fontFamily={MOTION_FONT}>
        ®
      </text>
    </svg>
  );
}

function WideSelect({
  value,
  onChange,
  options,
  placeholder,
  disabled,
  minWidth = 260,
  style,
}: {
  value?: string;
  onChange?: (value: string) => void;
  options: { value: string; label: string; disabled?: boolean }[];
  placeholder?: string;
  disabled?: boolean;
  minWidth?: number;
  style?: CSSProperties;
}) {
  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      disabled={disabled}
      style={{ width: "100%", minWidth, display: "block", ...style }}
    />
  );
}

function AppSidebar({
  mosaicActive,
  controlsActive,
}: {
  mosaicActive?: boolean;
  controlsActive?: boolean;
}) {
  const theme = useHostTheme();
  const item = (label: string, on: boolean, indent = false) => (
    <Text
      size="small"
      weight={on ? "semibold" : "normal"}
      style={{
        margin: indent ? "2px 0 2px 8px" : "2px 0",
        padding: "5px 8px",
        borderRadius: 6,
        color: on ? MOTION_BRAND_BLUE : theme.text.secondary,
        background: on ? theme.fill.tertiary : "transparent",
      }}
    >
      {label}
    </Text>
  );

  return (
    <aside
      style={{
        width: 148,
        flexShrink: 0,
        background: theme.bg.elevated,
        borderRight: `1px solid ${theme.stroke.secondary}`,
        padding: "12px 10px",
      }}
    >
      <Text
        size="small"
        weight="semibold"
        style={{ color: MOTION_BRAND_BLUE, letterSpacing: 0.6, margin: "0 0 6px", fontSize: 10 }}
      >
        PLATFORM
      </Text>
      {item("Apps", false)}
      {item("Invites", false)}
      {item("Controls", !!controlsActive)}
      {controlsActive && (
        <>
          {item("Hubs", false, true)}
          {item("Devices", false, true)}
          {item("Tiles", true, true)}
        </>
      )}
      <Text
        size="small"
        weight="semibold"
        style={{ color: MOTION_BRAND_BLUE, letterSpacing: 0.6, margin: "12px 0 6px", fontSize: 10 }}
      >
        MOSAIC
      </Text>
      <Row gap={4} align="center" style={{ marginBottom: 4 }}>
        <Text size="small" tone="secondary">
          Share
        </Text>
      </Row>
      {item("Dashboard", !!mosaicActive && !controlsActive)}
      {item("Configuration", false)}
    </aside>
  );
}

function HeaderSearchPill({
  active,
  onClick,
  placeholder = "⌘ S to search",
}: {
  active?: boolean;
  onClick?: () => void;
  placeholder?: string;
}) {
  const theme = useHostTheme();
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 14px",
        borderRadius: 999,
        border: `1px solid ${theme.text.onAccent}`,
        background: active ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.12)",
        color: theme.text.onAccent,
        cursor: "pointer",
        fontSize: 13,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ opacity: 0.9 }}>⌕</span>
      {placeholder}
    </button>
  );
}

/** Mosaic Dashboard header — blue gradient (solid accent in canvas) */
function MosaicDashboardHeader({
  searchActive,
  onSearchClick,
}: {
  searchActive?: boolean;
  onSearchClick?: () => void;
}) {
  const theme = useHostTheme();
  return (
    <header
      style={{
        background: MOTION_BRAND_BLUE,
        padding: "14px 18px 16px",
        color: theme.text.onAccent,
      }}
    >
      <Row align="flex-start" justify="space-between" gap={12}>
        <Stack gap={6} style={{ flex: 1 }}>
          <Row gap={12} align="center">
            <MotionLogo width={110} />
            <Text size="small" style={{ color: theme.text.onAccent, opacity: 0.85, margin: 0 }}>
              Mosaic &gt; Dashboard
            </Text>
          </Row>
          <Text weight="bold" style={{ color: theme.text.onAccent, fontSize: 22, margin: 0 }}>
            Kimpton Restaurant - Minneapolis
          </Text>
          <Row gap={8} wrap>
            <span
              style={{
                fontSize: 11,
                padding: "4px 10px",
                borderRadius: 999,
                border: `1px solid rgba(255,255,255,0.5)`,
              }}
            >
              Chat
            </span>
            <span
              style={{
                fontSize: 11,
                padding: "4px 10px",
                borderRadius: 999,
                border: `1px solid rgba(255,255,255,0.5)`,
              }}
            >
              Site A
            </span>
            <span style={{ fontSize: 11, opacity: 0.9 }}>68° / 51° ☀</span>
          </Row>
        </Stack>
        <HeaderSearchPill active={searchActive} onClick={onSearchClick} />
      </Row>
    </header>
  );
}

/** Controls > Tiles header — same brand blue as Mosaic Dashboard */
function ControlsTilesHeader() {
  const theme = useHostTheme();
  return (
    <header
      style={{
        background: MOTION_BRAND_BLUE,
        padding: "14px 18px 18px",
        color: theme.text.onAccent,
      }}
    >
      <Row align="flex-start" justify="space-between" gap={12}>
        <Stack gap={8} style={{ flex: 1 }}>
          <Row gap={12} align="center">
            <MotionLogo width={100} />
            <Text size="small" style={{ color: theme.text.onAccent, opacity: 0.9, margin: 0 }}>
              Controls &gt; Tiles
            </Text>
          </Row>
          <Text weight="bold" style={{ color: theme.text.onAccent, fontSize: 26, margin: 0 }}>
            Tiles
          </Text>
          <Row gap={8} align="center">
            <span
              style={{
                fontSize: 12,
                padding: "5px 12px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.2)",
              }}
            >
              2,172 total
            </span>
            <button
              type="button"
              style={{
                fontSize: 12,
                padding: "6px 14px",
                borderRadius: 999,
                border: `1px solid ${theme.text.onAccent}`,
                background: "transparent",
                color: theme.text.onAccent,
                cursor: "pointer",
              }}
            >
              Bulk Configure ↗
            </button>
          </Row>
        </Stack>
        <Row gap={8} align="center">
          <button
            type="button"
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              border: `1px solid rgba(255,255,255,0.4)`,
              background: "rgba(255,255,255,0.1)",
              color: theme.text.onAccent,
              cursor: "pointer",
            }}
          >
            ⏷
          </button>
          <HeaderSearchPill placeholder="⌘+S to search" />
        </Row>
      </Row>
    </header>
  );
}

const METRIC_ICON_GREEN = "#7CB342";

type DashboardMetric = {
  icon: string;
  value: string;
  label: string;
  variant?: "default" | "fault";
};

/** Single KPI tile — icon, value, label (production Mosaic card row) */
function DashboardMetricTile({ icon, value, label, variant = "default" }: DashboardMetric) {
  const theme = useHostTheme();
  const fault = variant === "fault";
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        borderRadius: 10,
        padding: "14px 10px 12px",
        textAlign: "center",
        background: fault ? "#E8847A" : theme.bg.elevated,
        border: fault ? "none" : `1px solid ${theme.stroke.secondary}`,
      }}
    >
      <div style={{ fontSize: 22, lineHeight: 1, marginBottom: 8, color: fault ? "#FFFFFF" : METRIC_ICON_GREEN }}>
        {icon}
      </div>
      <Text
        weight="bold"
        style={{
          margin: 0,
          fontSize: 17,
          lineHeight: 1.2,
          color: fault ? "#FFFFFF" : theme.text.primary,
        }}
      >
        {value}
      </Text>
      <Text
        size="small"
        style={{
          margin: "6px 0 0",
          fontSize: 11,
          color: fault ? "rgba(255,255,255,0.95)" : theme.text.secondary,
        }}
      >
        {label}
      </Text>
    </div>
  );
}

/** Equipment group — header + row of metric tiles (e.g. Rinnai | Boiler) */
function EquipmentMetricGroupCard({
  title,
  headerIcon,
  metrics,
  highlighted,
}: {
  title: string;
  headerIcon: string;
  metrics: DashboardMetric[];
  highlighted?: boolean;
}) {
  const theme = useHostTheme();
  return (
    <div
      style={{
        background: theme.bg.elevated,
        borderRadius: 14,
        border: highlighted
          ? `2px solid ${MOTION_BRAND_BLUE}`
          : `1px solid ${theme.stroke.secondary}`,
        padding: "14px 16px 16px",
      }}
    >
      <Row gap={8} align="center" style={{ marginBottom: 14 }}>
        <span style={{ fontSize: 18, lineHeight: 1 }} aria-hidden>
          {headerIcon}
        </span>
        <Text weight="semibold" style={{ margin: 0, fontSize: 14 }}>
          {title}
        </Text>
      </Row>
      <Row gap={8} align="stretch">
        {metrics.map((m) => (
          <DashboardMetricTile key={m.label} {...m} />
        ))}
      </Row>
    </div>
  );
}

type ListRow = { label: string; value: string; rowIcon: string };

/** Equipment group — header + labeled rows (e.g. Rain Bird zones) */
function EquipmentListGroupCard({
  title,
  headerIcon,
  rows,
  highlighted,
}: {
  title: string;
  headerIcon: string;
  rows: ListRow[];
  highlighted?: boolean;
}) {
  const theme = useHostTheme();
  return (
    <div
      style={{
        background: theme.bg.elevated,
        borderRadius: 14,
        border: highlighted
          ? `2px solid ${MOTION_BRAND_BLUE}`
          : `1px solid ${theme.stroke.secondary}`,
        padding: "14px 16px 16px",
        minHeight: 200,
      }}
    >
      <Row gap={8} align="center" style={{ marginBottom: 12 }}>
        <span style={{ fontSize: 18, lineHeight: 1 }} aria-hidden>
          {headerIcon}
        </span>
        <Text weight="semibold" style={{ margin: 0, fontSize: 14 }}>
          {title}
        </Text>
      </Row>
      <Divider />
      <Stack gap={0} style={{ marginTop: 8 }}>
        {rows.map((r, i) => (
          <Row
            key={r.label}
            align="center"
            gap={10}
            style={{
              padding: "10px 0",
              borderTop: i > 0 ? `1px solid ${theme.stroke.secondary}` : undefined,
            }}
          >
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: theme.fill.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                flexShrink: 0,
              }}
              aria-hidden
            >
              {r.rowIcon}
            </span>
            <Text tone="secondary" size="small" style={{ margin: 0, flex: 1 }}>
              {r.label}
            </Text>
            <Text weight="semibold" size="small" style={{ margin: 0 }}>
              {r.value}
            </Text>
          </Row>
        ))}
      </Stack>
    </div>
  );
}

function LoginScreen() {
  const theme = useHostTheme();
  return (
    <div
      style={{
        border: `1px solid ${theme.stroke.primary}`,
        borderRadius: 12,
        overflow: "hidden",
        minHeight: 420,
        minWidth: 960,
        background: MOTION_BRAND_BLUE,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
        gap: 28,
      }}
    >
      <MotionLogo width={180} />
      <div
        style={{
          background: theme.bg.elevated,
          borderRadius: 16,
          padding: 36,
          width: 360,
          border: `1px solid ${theme.stroke.secondary}`,
        }}
      >
        <Stack gap={12}>
          <Text size="small" weight="semibold">
            Email
          </Text>
          <TextInput value="ops@kimpton.example" onChange={() => {}} />
          <Text size="small" weight="semibold">
            Password
          </Text>
          <TextInput type="password" value="••••••••" onChange={() => {}} />
          <Button variant="primary" style={{ width: "100%", marginTop: 8 }}>
            Sign in
          </Button>
          <Text tone="secondary" size="small" style={{ textAlign: "center", margin: 0 }}>
            SSO available for enterprise accounts
          </Text>
        </Stack>
      </div>
    </div>
  );
}

function DashboardScreen({
  overlay,
  highlight,
  onSearchOpen,
}: {
  overlay?: boolean;
  highlight?: boolean;
  onSearchOpen?: () => void;
}) {
  const theme = useHostTheme();
  const [q, setQ] = useCanvasState("polished-dash-q", "irrigation zone");

  return (
    <div
      style={{
        display: "flex",
        border: `1px solid ${theme.stroke.primary}`,
        borderRadius: 12,
        overflow: "hidden",
        minWidth: 960,
      }}
    >
      <AppSidebar mosaicActive />
      <div style={{ flex: 1, position: "relative", minWidth: 0 }}>
        <MosaicDashboardHeader searchActive={overlay} onSearchClick={onSearchOpen} />
        <div
          style={{
            background: theme.fill.quaternary,
            padding: 14,
            opacity: overlay ? 0.4 : 1,
            pointerEvents: overlay ? "none" : "auto",
          }}
        >
          <Grid columns={2} gap={12}>
            <EquipmentMetricGroupCard
              title="Rinnai | Boiler"
              headerIcon="🔥"
              metrics={[
                { icon: "🌡", value: "82.94 °F", label: "Input Water Temp" },
                { icon: "🌡", value: "82.94 °F", label: "Output Water Temp" },
                { icon: "⚠", value: "Inactive", label: "Fault state", variant: "fault" },
                { icon: "▮", value: "0.00%", label: "Firing Rate" },
              ]}
            />
            <EquipmentListGroupCard
              title="Rain Bird | Irrigation Control"
              headerIcon="💧"
              highlighted={highlight}
              rows={[
                { label: "Irrigation | Zone 1", value: "Off", rowIcon: "💧" },
                { label: "Irrigation | Zone 2", value: "Off", rowIcon: "💧" },
                { label: "Irrigation | Zone 3", value: "Off", rowIcon: "💧" },
                { label: "Irrigation | Zone 4", value: "Off", rowIcon: "💧" },
              ]}
            />
          </Grid>
          {highlight && (
            <Text size="small" style={{ marginTop: 10, color: MOTION_BRAND_BLUE, fontWeight: 600 }}>
              ← Irrigation card highlighted after “Go to card”
            </Text>
          )}
        </div>
        {overlay && (
          <div style={{ position: "absolute", left: 14, right: 14, top: 118, zIndex: 5 }}>
            <div
              style={{
                background: theme.bg.elevated,
                borderRadius: 14,
                border: `1px solid ${theme.stroke.primary}`,
                padding: 14,
              }}
            >
              <TextInput type="search" value={q} onChange={setQ} style={{ width: "100%", marginBottom: 10 }} />
              <Text size="small" tone="secondary" style={{ margin: "0 0 8px" }}>
                2 matches · Scope: This site · Classic fuzzy
              </Text>
              <div
                style={{
                  padding: 10,
                  borderRadius: 10,
                  border: `1px solid ${theme.stroke.secondary}`,
                  marginBottom: 8,
                }}
              >
                <Text weight="semibold" size="small" style={{ margin: 0 }}>
                  Irrigation | Zone 1
                </Text>
                <Text style={{ margin: "2px 0", color: MOTION_BRAND_BLUE, fontSize: 11, fontWeight: 600 }}>
                  Rain Bird | Irrigation Control
                </Text>
                <Button variant="primary" style={{ marginTop: 8 }}>
                  Go to card
                </Button>
              </div>
              <Button variant="ghost" style={{ color: theme.text.link }}>
                View all in Controls → Tiles
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TilesTableScreen() {
  const theme = useHostTheme();
  const [tab, setTab] = useCanvasState<"my" | "add">("polished-tab", "my");
  const [filtersOpen, setFiltersOpen] = useCanvasState("polished-filters", true);

  const th: CSSProperties = {
    textAlign: "left",
    fontSize: 10,
    fontWeight: 600,
    color: theme.text.tertiary,
    padding: "8px 10px",
    borderBottom: `1px solid ${theme.stroke.secondary}`,
  };

  return (
    <div
      style={{
        display: "flex",
        border: `1px solid ${theme.stroke.primary}`,
        borderRadius: 12,
        overflow: "hidden",
        minWidth: 1020,
      }}
    >
      <AppSidebar controlsActive />
      <div style={{ flex: 1, minWidth: 720 }}>
        <ControlsTilesHeader />
        <div style={{ background: theme.fill.quaternary, padding: 12, position: "relative" }}>
          {filtersOpen && (
            <div
              style={{
                position: "absolute",
                right: 24,
                top: 8,
                zIndex: 10,
                width: 200,
                background: "#3d3d3d",
                color: theme.text.onAccent,
                borderRadius: 10,
                padding: 12,
                fontSize: 11,
              }}
            >
              <Text
                size="small"
                weight="semibold"
                style={{ color: theme.text.onAccent, margin: "0 0 8px", letterSpacing: 0.5 }}
              >
                FILTERS
              </Text>
              <Row gap={6} align="center" style={{ marginBottom: 6 }}>
                <Toggle checked onChange={() => {}} />
                <Text size="small" style={{ color: theme.text.onAccent, margin: 0 }}>
                  Devices
                </Text>
              </Row>
              <Row gap={6} align="center" style={{ marginBottom: 6 }}>
                <Toggle checked={false} onChange={() => {}} />
                <Text size="small" style={{ color: theme.text.onAccent, margin: 0 }}>
                  Only owned by me
                </Text>
              </Row>
              <Row gap={6} align="center">
                <Toggle checked={false} onChange={() => {}} />
                <Text size="small" style={{ color: theme.text.onAccent, margin: 0 }}>
                  Include metadata
                </Text>
              </Row>
              <Divider style={{ margin: "10px 0" }} />
              <Text size="small" weight="semibold" style={{ color: theme.text.onAccent, margin: "0 0 6px" }}>
                Tags (MVP)
              </Text>
              <Row gap={4} wrap>
                <Pill size="sm" active>
                  Parking
                </Pill>
                <Pill size="sm">
                  + Store
                </Pill>
              </Row>
            </div>
          )}

          <Row gap={0} style={{ marginBottom: 0 }}>
            <button
              type="button"
              onClick={() => setTab("my")}
              style={{
                padding: "10px 18px",
                border: "none",
                borderRadius: "10px 10px 0 0",
                background: tab === "my" ? theme.bg.elevated : theme.fill.tertiary,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              My Tiles
            </button>
            <button
              type="button"
              onClick={() => setTab("add")}
              style={{
                padding: "10px 18px",
                border: "none",
                borderRadius: "10px 10px 0 0",
                background: tab === "add" ? theme.bg.elevated : theme.fill.tertiary,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Add Tiles
            </button>
          </Row>

          <div
            style={{
              background: theme.bg.elevated,
              borderRadius: "0 12px 12px 12px",
              border: `1px solid ${theme.stroke.secondary}`,
              overflow: "hidden",
            }}
          >
            <Row align="center" style={{ padding: "8px 12px", borderBottom: `1px solid ${theme.stroke.tertiary}` }}>
              <Checkbox checked onChange={() => {}} label="Select all in filter (24)" />
              <Spacer />
              <Button variant="primary">Bulk actions</Button>
            </Row>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr>
                  <th style={th}>TILE NAME</th>
                  <th style={th}>CURRENT VALUE</th>
                  <th style={th} />
                  <th style={th}>ID</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: `1px solid ${theme.stroke.tertiary}` }}>
                  <td style={{ padding: "10px", maxWidth: 280 }}>
                    <Row gap={6}>
                      <Checkbox checked onChange={() => {}} />
                      <Stack gap={2}>
                        <Text weight="semibold" size="small" style={{ margin: 0 }}>
                          Signage Lights On/Off
                        </Text>
                        <Text style={{ margin: 0, color: MOTION_BRAND_BLUE, fontSize: 10, fontWeight: 600 }}>
                          Store 445 | Parking Lot | Signage
                        </Text>
                        <Row gap={4}>
                          {["445", "Parking", "Signage"].map((t) => (
                            <span
                              key={t}
                              style={{
                                fontSize: 9,
                                padding: "2px 6px",
                                borderRadius: 999,
                                background: theme.fill.tertiary,
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </Row>
                        <Text tone="quaternary" size="small" style={{ margin: 0, fontSize: 9 }}>
                          Legacy: Houston… | Signage Lights | On/Off
                        </Text>
                      </Stack>
                    </Row>
                  </td>
                  <td style={{ padding: "10px" }}>
                    <Text weight="semibold" size="small" style={{ margin: 0 }}>
                      On
                    </Text>
                    <Text tone="tertiary" size="small" style={{ margin: 0 }}>
                      11m
                    </Text>
                  </td>
                  <td style={{ padding: "10px" }}>
                    <Row gap={6}>
                      <Button variant="secondary">Configure</Button>
                      <Button variant="ghost">Link Apps</Button>
                    </Row>
                  </td>
                  <td style={{ padding: "10px" }}>
                    <span
                      style={{
                        fontSize: 10,
                        padding: "4px 8px",
                        borderRadius: 999,
                        background: theme.fill.primary,
                        fontWeight: 600,
                      }}
                    >
                      422243
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreateTileScreen() {
  const theme = useHostTheme();
  const card: CSSProperties = {
    background: theme.bg.elevated,
    borderRadius: 14,
    border: `1px solid ${theme.stroke.secondary}`,
    padding: 14,
  };

  return (
    <div
      style={{
        display: "flex",
        border: `1px solid ${theme.stroke.primary}`,
        borderRadius: 12,
        overflow: "hidden",
        minWidth: 1020,
      }}
    >
      <AppSidebar controlsActive />
      <div style={{ flex: 1, minWidth: 0 }}>
        <ControlsTilesHeader />
        <div style={{ background: theme.fill.quaternary, padding: 14 }}>
          <Row gap={0} style={{ marginBottom: 12 }}>
            <span style={{ padding: "8px 16px", background: theme.fill.tertiary, borderRadius: "8px 8px 0 0" }}>
              My Tiles
            </span>
            <span
              style={{
                padding: "8px 16px",
                background: theme.bg.elevated,
                borderRadius: "8px 8px 0 0",
                fontWeight: 700,
              }}
            >
              Add Tiles
            </span>
          </Row>
          <div style={card}>
            <Row gap={8} align="center" style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 16 }}>☰</span>
              <H3 style={{ margin: 0 }}>Create tile — tags & description</H3>
            </Row>
            <Grid columns={2} gap={12}>
              <Stack gap={8}>
                <Text size="small" weight="semibold">
                  Display name *
                </Text>
                <TextInput value="Signage Lights On/Off" onChange={() => {}} />
                <Text size="small" weight="semibold">
                  Description *
                </Text>
                <TextArea value="Parking lot signage — brand hours" onChange={() => {}} rows={2} />
                <Text size="small" style={{ color: MOTION_BRAND_BLUE, fontWeight: 600 }}>
                  Path: Store 445 | Parking Lot | Signage
                </Text>
              </Stack>
              <Stack gap={8}>
                <Text size="small" weight="semibold">
                  Store / Area *
                </Text>
                <WideSelect
                  value="445"
                  onChange={() => {}}
                  options={[{ value: "445", label: "445 — Columbus Downtown" }]}
                />
                <WideSelect
                  value="parking"
                  onChange={() => {}}
                  options={[{ value: "parking", label: "Parking Lot" }]}
                />
                <Text size="small" weight="semibold">
                  Tags *
                </Text>
                <Row gap={4} wrap>
                  {["445", "Parking", "Signage", "OH"].map((t) => (
                    <Pill key={t} active size="sm">
                      {t}
                    </Pill>
                  ))}
                </Row>
              </Stack>
            </Grid>
            <Text tone="tertiary" size="small" style={{ marginTop: 10 }}>
              Legacy name (read-only): Houston, TX | Store 1944 | Parking Lot | Signage Lights | On/Off
            </Text>
            <Row gap={8} style={{ marginTop: 14 }}>
              <Button variant="secondary">Cancel</Button>
              <Button variant="primary">Save</Button>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

function BulkReviewScreen() {
  const theme = useHostTheme();
  return (
    <div
      style={{
        display: "flex",
        border: `1px solid ${theme.stroke.primary}`,
        borderRadius: 12,
        overflow: "hidden",
        minWidth: 1020,
      }}
    >
      <AppSidebar controlsActive />
      <div style={{ flex: 1 }}>
        <ControlsTilesHeader />
        <div style={{ background: theme.fill.quaternary, padding: 24 }}>
          <div style={{ background: theme.bg.elevated, borderRadius: 14, padding: 20, maxWidth: 520 }}>
            <Text weight="bold" style={{ margin: "0 0 8px" }}>
              Review bulk schedule update
            </Text>
            <Text tone="secondary" size="small" style={{ margin: "0 0 12px" }}>
              24 matched · 22 selected · 2 excluded (untagged)
            </Text>
            <Button variant="primary">Apply to 22 tiles</Button>
            <Button variant="ghost">Back to Tiles</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BulkSummaryScreen() {
  const theme = useHostTheme();
  return (
    <div
      style={{
        display: "flex",
        border: `1px solid ${theme.stroke.primary}`,
        borderRadius: 12,
        overflow: "hidden",
        minWidth: 1020,
      }}
    >
      <AppSidebar controlsActive />
      <div style={{ flex: 1 }}>
        <ControlsTilesHeader />
        <div style={{ background: theme.fill.quaternary, padding: 24 }}>
          <div
            style={{
              background: theme.diff.insertedLine,
              borderRadius: 14,
              padding: 20,
              maxWidth: 480,
              border: `1px solid ${theme.stroke.secondary}`,
            }}
          >
            <Text weight="bold" style={{ margin: "0 0 12px" }}>
              Bulk complete — 22 updated, 2 skipped
            </Text>
            <Button variant="primary">Download summary</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MotionPlatformPolished() {
  const [screen, setScreen] = useCanvasState<Screen>("polished-screen", "login");

  return (
    <Stack gap={16} style={{ minWidth: 1040, width: "100%" }}>
      <H1>Motion — polished prototype (Matt)</H1>
      <Callout tone="info" title="Interactive prototype">
        Use the tabs below to switch screens. Tile discovery PRD — Motion.cloud (interview prep).
      </Callout>
      <Text tone="secondary">
        Brand blue #3B66D4 · logo = blue motion on white slanted box (®). Mosaic Dashboard and
        Controls › Tiles share the same header blue.
      </Text>

      <Row gap={6} wrap>
        {NAV.map((n) => (
          <Pill key={n.id} active={screen === n.id} onClick={() => setScreen(n.id)}>
            {n.label}
          </Pill>
        ))}
      </Row>

      {screen === "login" && <LoginScreen />}
      {screen === "dashboard" && <DashboardScreen />}
      {screen === "dashboard-search" && <DashboardScreen overlay highlight />}
      {screen === "tiles" && <TilesTableScreen />}
      {screen === "create" && <CreateTileScreen />}
      {screen === "bulk-review" && <BulkReviewScreen />}
      {screen === "bulk-summary" && <BulkSummaryScreen />}

      <Divider />
      <Grid columns={3} gap={10}>
        <Card>
          <CardHeader>Login</CardHeader>
          <CardBody>
            <Text size="small">Brand mark · SSO path to Mosaic</Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Dashboard</CardHeader>
          <CardBody>
            <Text size="small">Metric tile groups (Boiler) · ⌘S overlay · jump to card</Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Controls · Tiles</CardHeader>
          <CardBody>
            <Text size="small">Table + tag filters + bulk · matches existing Configure</Text>
          </CardBody>
        </Card>
      </Grid>
    </Stack>
  );
}
