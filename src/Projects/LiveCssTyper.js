import React, { useRef, useState } from "react";

export default function LiveCssTyper() {
  const [cssCode, setCssCode] = useState("");
  const [htmlCode, setHtmlCode] = useState("");
  const iframeRef = useRef(null);

  const startTyping = () => {
    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow.document;

    doc.open();
    doc.write(`
      <html>
        <head>
          <style id="live-style"></style>
          <style>
            body { 
              font-family: sans-serif;
              color: #e0e0e0;
              padding: 20px;
              background-color: #2c2c2c;
            }
          </style>
        </head>
        <body>${htmlCode}</body>
      </html>
    `);
    doc.close();

    let i = 0;
    const interval = setInterval(() => {
      const typedCSS = cssCode.slice(0, i);
      const styleTag = doc.getElementById("live-style");
      if (styleTag) styleTag.innerHTML = typedCSS;
      i++;
      if (i > cssCode.length) clearInterval(interval);
    }, 20);
  };

  return (
    <div style={styles.container}>
      <style>{responsiveStyles}</style>

      <h1 style={styles.title}>💻 Live CSS Typer</h1>

      <div className="editor-wrapper">
        <div className="editor-block">
          <h2 style={styles.subheading}>🎨 styles.css</h2>
          <textarea
            value={cssCode}
            onChange={(e) => setCssCode(e.target.value)}
            rows={15}
            className="editor-textarea"
            placeholder="Paste or type CSS code here..."
          />
        </div>

        <div className="editor-block">
          <h2 style={styles.subheading}>⚛️ App.js (HTML only)</h2>
          <textarea
            value={htmlCode}
            onChange={(e) => setHtmlCode(e.target.value)}
            rows={15}
            className="editor-textarea"
            placeholder="Paste or type HTML structure here..."
          />
        </div>
      </div>

      <div style={styles.buttonWrapper}>
        <button
          onClick={startTyping}
          className="run-button"
        >
          ▶️ Start Autotyping
        </button>
      </div>

      <h2 style={styles.subheading}>🔍 Live Preview</h2>
      <iframe
        ref={iframeRef}
        title="Live Output"
        style={styles.iframe}
      />
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    background: "#1e1e1e",
    color: "#e0e0e0",
    minHeight: "100vh"
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#00b2ff",
    textShadow: "0 0 10px rgba(0, 178, 255, 0.3)"
  },
  subheading: {
    marginBottom: "10px"
  },
  buttonWrapper: {
    textAlign: "center",
    marginTop: "30px"
  },
  iframe: {
    width: "100%",
    height: "600px",
    border: "2px solid #00b2ff",
    borderRadius: "8px",
    backgroundColor: "#2c2c2c",
    marginTop: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)"
  }
};

const responsiveStyles = `
  .editor-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
  }

  .editor-block {
    flex: 1 1 45%;
    min-width: 300px;
  }

  .editor-textarea {
    width: 100%;
    padding: 15px;
    font-family: monospace;
    border-radius: 8px;
    border: 1px solid #444;
    background: #2d2d2d;
    color: #f8f8f2;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    resize: vertical;
  }

  .run-button {
    padding: 12px 30px;
    font-size: 16px;
    background-color: #00b2ff;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.1s ease;
    font-weight: bold;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }

  .run-button:hover {
    background-color: #0088cc;
  }

  .run-button:active {
    transform: scale(0.97);
  }

  @media (max-width: 768px) {
    .editor-wrapper {
      flex-direction: column;
    }

    .editor-block {
      flex: 1 1 100%;
    }

    iframe {
      height: 400px !important;
    }
  }

  @media (max-width: 480px) {
    .run-button {
      width: 100%;
      padding: 12px;
      font-size: 14px;
    }
  }
`;
