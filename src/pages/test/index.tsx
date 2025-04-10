import React, { useState } from "react";
import nacl from "tweetnacl";
import { Buffer } from "buffer";

const styles = {
  container: {
    overflow: "scroll",
    height: "100dvh",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  title: {
    color: "#333",
    marginBottom: "20px",
    textAlign: "center" as const,
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
    backgroundColor: "black",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
    margin: "15px 0",
  },
  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s",
  },
  encryptButton: {
    backgroundColor: "#4CAF50",
    color: "white",
  },
  decryptButton: {
    backgroundColor: "#2196F3",
    color: "white",
  },
  toggleButton: {
    backgroundColor: "#666",
    color: "white",
  },
  output: {
    padding: "15px",
    backgroundColor: "black",
    borderRadius: "4px",
    margin: "10px 0",
    wordBreak: "break-all" as const,
    border: "1px solid #eee",
  },
  keyDisplay: {
    padding: "15px",
    backgroundColor: "black",
    borderRadius: "4px",
    margin: "10px 0",
    fontSize: "14px",
  },
};

const AdvancedEncryptionPage: React.FC = () => {
  const [message, setMessage] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const [showKeys, setShowKeys] = useState(false);

  // Generate key pairs for Alice and Bob
  const [aliceKeys] = useState(() => nacl.box.keyPair());
  const [bobKeys] = useState(() => nacl.box.keyPair());

  const handleEncrypt = () => {
    try {
      const nonce = nacl.randomBytes(nacl.box.nonceLength);
      const messageUint8 = new TextEncoder().encode(message);
      const encrypted = nacl.box(
        messageUint8,
        nonce,
        bobKeys.publicKey,
        aliceKeys.secretKey,
      );

      // Combine nonce and encrypted message for easier decryption
      const fullMessage = new Uint8Array(nonce.length + encrypted.length);
      fullMessage.set(nonce);
      fullMessage.set(encrypted, nonce.length);

      const encryptedBase64 = Buffer.from(fullMessage).toString("base64");
      setEncryptedMessage(encryptedBase64);
      setDecryptedMessage("");
    } catch (error) {
      console.error("Encryption error:", error);
      setEncryptedMessage("Error during encryption");
    }
  };

  const handleDecrypt = () => {
    try {
      const fullMessage = Buffer.from(encryptedMessage, "base64");
      const nonce = fullMessage.subarray(0, nacl.box.nonceLength);
      const encrypted = fullMessage.subarray(nacl.box.nonceLength);

      const decrypted = nacl.box.open(
        encrypted,
        nonce,
        aliceKeys.publicKey,
        bobKeys.secretKey,
      );

      if (!decrypted) {
        setDecryptedMessage("Decryption failed");
        return;
      }

      const decryptedText = new TextDecoder().decode(decrypted);
      setDecryptedMessage(decryptedText);
    } catch (error) {
      console.error("Decryption error:", error);
      setDecryptedMessage("Error during decryption");
    }
  };

  const publicKeyToString = (key: Uint8Array) =>
    Buffer.from(key).toString("hex");
  const secretKeyToString = (key: Uint8Array) =>
    Buffer.from(key).toString("hex");

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Advanced Encryption Demo</h2>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your secret message"
        style={styles.input}
      />

      <div style={styles.buttonContainer}>
        <button
          onClick={handleEncrypt}
          style={{ ...styles.button, ...styles.encryptButton }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#45a049")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#4CAF50")
          }
        >
          Encrypt Message
        </button>
        <button
          onClick={handleDecrypt}
          style={{ ...styles.button, ...styles.decryptButton }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#1e88e5")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#2196F3")
          }
          disabled={!encryptedMessage}
        >
          Decrypt Message
        </button>
        <button
          onClick={() => setShowKeys(!showKeys)}
          style={{ ...styles.button, ...styles.toggleButton }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#555")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#666")}
        >
          {showKeys ? "Hide" : "Show"} Keys
        </button>
      </div>

      {showKeys && (
        <div style={styles.keyDisplay}>
          <p>
            <strong>Alice's Public Key:</strong>{" "}
            {publicKeyToString(aliceKeys.publicKey)}
          </p>
          <p>
            <strong>Bob's Public Key:</strong>{" "}
            {publicKeyToString(bobKeys.publicKey)}
          </p>
        </div>
      )}

      {encryptedMessage && (
        <div style={styles.output}>
          <strong>Encrypted Message:</strong>
          <p>{encryptedMessage}</p>
        </div>
      )}

      {decryptedMessage && (
        <div style={styles.output}>
          <strong>Decrypted Message:</strong>
          <p>{decryptedMessage}</p>
        </div>
      )}
    </div>
  );
};

export default AdvancedEncryptionPage;
