import type { Metadata } from "next";
import { CalendarLayoutPlayground } from "../../components/builder/CalendarLayoutPlayground";
import styles from "./builder.module.css";

export const metadata: Metadata = {
  title: "CalendarLayout · Component builder",
  description: "Tweak props, preview live, copy usage code.",
};

export default function BuilderPage() {
  return (
    <div className={styles.page}>
      <CalendarLayoutPlayground />
    </div>
  );
}
