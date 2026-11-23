/**
 * Sign-in / sign-up page -- minimal UI editorial design.
 * OAuth (Google/Apple) + email/password form.
 */

import { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { signIn, signUp } from "~/lib/auth-client";
import { useTranslation } from "~/hooks/useTranslation";
import { LogoMeem } from "./LogoMeem";
import { MuIcons } from "./icons";

interface LoginPageProps {
  redirect?: string;
}

export function LoginPageMinimal({ redirect }: LoginPageProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "signup") {
        const result = await signUp.email({ name: name || email.split("@")[0], email, password });
        if (result.error) {
          setError(t.auth.registerFailed);
          return;
        }
      } else {
        const result = await signIn.email({ email, password });
        if (result.error) {
          setError(t.auth.loginFailed);
          return;
        }
      }
      await router.invalidate();
      router.navigate({ to: redirect || "/" });
    } catch {
      setError(t.auth.genericError);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      const result = await signIn.social({ provider: "google", callbackURL: redirect || "/" });
      if (result?.error) {
        setError(t.auth.googleFailed);
      }
    } catch {
      setError(t.auth.googleFailed);
    }
  };

  return (
    <div className="mu-sover" style={{ animation: "none", background: "var(--mu-bg)" }}>
      <div className="mu-signin">
        <div className="mu-signin-head">
          <div style={{ marginBottom: 16 }}>
            <LogoMeem size={52} />
          </div>
          <h2>{mode === "signin" ? "Selamat datang kembali!" : "Bergabung dengan Mahfuz"}</h2>
          <p className="mu-muted" style={{ fontSize: 14, margin: 0, maxWidth: "34ch", marginLeft: "auto", marginRight: "auto" }}>
            {mode === "signin"
              ? "Simpan hafalan dan catatan belajarmu."
              : "Buat akun bersama ayah, bunda, atau pendampingmu."}
          </p>
        </div>

        {error && (
          <p style={{ color: "#b32020", fontSize: 13, textAlign: "center", margin: "0 0 16px" }}>
            {error}
          </p>
        )}

        {import.meta.env.VITE_GOOGLE_LOGIN_ENABLED === "true" && <div className="mu-signin-oauth">
          <button type="button" className="mu-oauth" onClick={handleGoogle}>
            {MuIcons.google}
            <span>{t.auth.continueWithGoogle}</span>
          </button>
        </div>}

        {import.meta.env.VITE_GOOGLE_LOGIN_ENABLED === "true" && <div className="mu-signin-or"><span>atau dengan email</span></div>}

        <form className="mu-signin-form" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <label className="mu-field">
              <span>{t.auth.namePlaceholder}</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama panggilan"
              />
            </label>
          )}
          <label className="mu-field">
            <span>{t.auth.emailPlaceholder}</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@contoh.id"
              required
            />
          </label>
          <label className="mu-field">
            <span>{t.auth.passwordPlaceholder}</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="--------"
              required
            />
          </label>
          <button
            type="submit"
            className="mu-btn primary"
            style={{ justifyContent: "center", marginTop: 8, width: "100%" }}
            disabled={loading}
          >
            {loading ? t.common.loading : mode === "signin" ? t.auth.login : t.auth.createAccount}
            {MuIcons.arrowRight}
          </button>
        </form>

        <p className="mu-signin-alt">
          {mode === "signin" ? t.auth.noAccount : t.auth.hasAccount}
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          >
            {mode === "signin" ? t.auth.register : t.auth.login}
          </button>
        </p>
        <Link to="/" className="mu-btn ghost" style={{ justifyContent: "center", width: "100%" }}>Belajar tanpa akun</Link>
      </div>
    </div>
  );
}
