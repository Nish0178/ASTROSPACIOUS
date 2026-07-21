import SpaceBg from "./Extra/Space-bg.tsx";
import "./css/base.css";

export default function Contact() {
  return (
    <main>
<SpaceBg />

      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1 className="gradient textclip centered">
          CONTACT US
        </h1>

        <h3 className="centered">
          This page is under development.
        </h3>
      </div>
    </main>
  );
}