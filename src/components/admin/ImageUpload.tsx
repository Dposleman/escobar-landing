import { useId, useState } from "react";
import { uploadImage, type UploadedImage } from "../../services/mediaService";

interface ImageUploadButtonProps {
  label?: string;
  onUploaded: (image: UploadedImage) => void;
}

/** A button that opens the file picker, uploads the picture and reports where it ended up. */
export function ImageUploadButton({ label = "Upload photo", onUploaded }: ImageUploadButtonProps) {
  const inputId = useId();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      onUploaded(await uploadImage(file));
    } catch (problem) {
      setError(problem instanceof Error ? problem.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <span className="admin-upload">
      <label className="admin-upload__button" htmlFor={inputId} aria-disabled={busy}>
        {busy ? "Uploading…" : label}
      </label>
      <input
        id={inputId}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        hidden
        disabled={busy}
        onChange={(event) => {
          void handleFile(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
      {error ? <span className="admin-upload__error">{error}</span> : null}
    </span>
  );
}

interface ImageFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

/** Picture address plus an upload button and a small preview. */
export function ImageField({ label, value, onChange }: ImageFieldProps) {
  return (
    <div className="admin-field admin-image-field">
      {label ? <span>{label}</span> : null}
      <div className="admin-image-field__row">
        {value ? <img className="admin-image-field__preview" src={value} alt="" /> : null}
        <input type="text" value={value} placeholder="Picture address or upload" onChange={(event) => onChange(event.target.value)} />
        <ImageUploadButton onUploaded={(image) => onChange(image.url)} />
      </div>
    </div>
  );
}
