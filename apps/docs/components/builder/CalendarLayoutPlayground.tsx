"use client";

import { useCallback, useMemo, useState } from "react";
import {
  CalendarLayout,
  CalendarTheme,
  type CreateSchedulePayload,
} from "@repo/ui";
import styles from "./CalendarLayoutPlayground.module.css";

type View = "today" | "week" | "month";

const DEFAULT_ACCENT = "#2eb1f3";

const SAMPLE_SCHEDULES = [
  {
    id: "demo-1",
    title: "Stand-up",
    place: "Room A",
    notes: "",
    startDateTime: new Date().toISOString(),
    endDateTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  },
];

function generateCalendarLayoutCode(options: {
  activeView: View;
  showCalendarSidebar: boolean;
  showCalendarRightSidebar: boolean;
  accentColor: string;
}) {
  const { activeView, showCalendarSidebar, showCalendarRightSidebar, accentColor } =
    options;
  const schedulesLiteral = `[
    {
      id: "demo-1",
      title: "Stand-up",
      place: "Room A",
      notes: "",
      startDateTime: "2025-03-21T10:00:00.000Z",
      endDateTime: "2025-03-21T11:00:00.000Z",
    },
  ]`;

  const themeLine =
    accentColor.toLowerCase() === DEFAULT_ACCENT
      ? `      <CalendarTheme>`
      : `      <CalendarTheme accentColor="${accentColor}">`;

  return [
    `import { CalendarLayout, CalendarTheme } from "@repo/ui";`,
    `import type { CreateSchedulePayload } from "@repo/ui";`,
    ``,
    `export function CalendarLayoutExample() {`,
    `  return (`,
    `    <div style={{ height: "100vh" }}>`,
    themeLine,
    `        <CalendarLayout`,
    `          activeView="${activeView}"`,
    `          onViewChange={(view) => {`,
    `            console.log("view", view);`,
    `          }}`,
    `          schedules={${schedulesLiteral}}`,
    `          onCreateSchedule={async (payload: CreateSchedulePayload) => {`,
    `            console.log(payload);`,
    `          }}`,
    `          showCalendarSidebar={${showCalendarSidebar}}`,
    `          showCalendarRightSidebar={${showCalendarRightSidebar}}`,
    `        />`,
    `      </CalendarTheme>`,
    `    </div>`,
    `  );`,
    `}`,
    ``,
  ].join("\n");
}

export function CalendarLayoutPlayground() {
  const [activeView, setActiveView] = useState<View>("month");
  const [showCalendarSidebar, setShowCalendarSidebar] = useState(false);
  const [showCalendarRightSidebar, setShowCalendarRightSidebar] = useState(true);
  const [previewTab, setPreviewTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);
  const [accentColor, setAccentColor] = useState(DEFAULT_ACCENT);

  const onCreateSchedule = useCallback(async (_payload: CreateSchedulePayload) => {}, []);

  const code = useMemo(
    () =>
      generateCalendarLayoutCode({
        activeView,
        showCalendarSidebar,
        showCalendarRightSidebar,
        accentColor,
      }),
    [activeView, showCalendarSidebar, showCalendarRightSidebar, accentColor],
  );

  const copyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [code]);

  return (
    <div className={styles.root}>
    

      <div className={styles.layout}>
        <aside className={styles.panel} aria-label="Props">
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Controls</h2>
            <p className={styles.panelLead}>Props passed to CalendarLayout</p>
          </div>

          <div className={styles.section}>
            <span className={styles.sectionLabel}>Theme</span>
            <div className={styles.accentRow}>
              <input
                type="color"
                className={styles.accentSwatch}
                value={accentColor.match(/^#[0-9a-fA-F]{6}$/) ? accentColor : DEFAULT_ACCENT}
                onChange={(e) => setAccentColor(e.target.value)}
                aria-label="Accent color"
              />
              <input
                type="text"
                className={styles.accentInput}
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                placeholder={DEFAULT_ACCENT}
                spellCheck={false}
                aria-label="Accent color hex"
              />
            </div>
            <p className={styles.fieldHint}>CalendarTheme accentColor → --calendar-accent</p>
          </div>

          <div className={styles.section}>
            <span className={styles.sectionLabel}>View</span>
            <div className={styles.selectWrap}>
              <select
                className={styles.select}
                value={activeView}
                onChange={(e) => setActiveView(e.target.value as View)}
                aria-label="Calendar view"
              >
                <option value="today">Today</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </div>
          </div>

          <div className={styles.section}>
            <span className={styles.sectionLabel}>Sidebars</span>

            <div className={styles.toggleRow}>
              <div className={styles.toggleText}>
                <span className={styles.toggleTitle}>Left sidebar</span>
                <span className={styles.toggleMeta}>showCalendarSidebar</span>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  className={styles.toggleInput}
                  checked={showCalendarSidebar}
                  onChange={(e) => setShowCalendarSidebar(e.target.checked)}
                />
                <span className={styles.toggleTrack}>
                  <span className={styles.toggleThumb} />
                </span>
              </label>
            </div>

            <div className={styles.toggleRow}>
              <div className={styles.toggleText}>
                <span className={styles.toggleTitle}>Right sidebar</span>
                <span className={styles.toggleMeta}>showCalendarRightSidebar</span>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  className={styles.toggleInput}
                  checked={showCalendarRightSidebar}
                  onChange={(e) => setShowCalendarRightSidebar(e.target.checked)}
                />
                <span className={styles.toggleTrack}>
                  <span className={styles.toggleThumb} />
                </span>
              </label>
            </div>
          </div>

          <p className={styles.hint}>
            With the right sidebar on, the header control can collapse it.
          </p>
        </aside>

        <section className={styles.mainPanel} aria-label="Preview and code">
          <div className={styles.tabList} role="tablist" aria-label="Preview or code">
            <button
              type="button"
              role="tab"
              aria-selected={previewTab === "preview"}
              className={previewTab === "preview" ? styles.tabActive : styles.tab}
              onClick={() => setPreviewTab("preview")}
            >
              Live preview
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={previewTab === "code"}
              className={previewTab === "code" ? styles.tabActive : styles.tab}
              onClick={() => setPreviewTab("code")}
            >
              Code
            </button>
          </div>

          {previewTab === "preview" ? (
            <div className={styles.tabPanel}>
              <div className={styles.previewFrame}>
                <CalendarTheme accentColor={accentColor}>
                  <CalendarLayout
                    activeView={activeView}
                    onViewChange={setActiveView}
                    schedules={SAMPLE_SCHEDULES}
                    onCreateSchedule={onCreateSchedule}
                    showCalendarSidebar={showCalendarSidebar}
                    showCalendarRightSidebar={showCalendarRightSidebar}
                  />
                </CalendarTheme>
              </div>
            </div>
          ) : (
            <div className={styles.tabPanel}>
              <div className={styles.codeHeader}>
                <span className={styles.codeHint}>Generated usage</span>
                <button type="button" className={styles.copyBtn} onClick={copyCode}>
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className={styles.pre}>
                <code>{code}</code>
              </pre>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
