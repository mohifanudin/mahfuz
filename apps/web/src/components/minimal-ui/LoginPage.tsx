/**
 * Sign-in / sign-up page -- minimal UI editorial design.
 * OAuth (Google/Apple) + email/password form.
 */

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useRouter } from "@tanstack/react-router";
import { signIn, signUp } from "~/lib/auth-client";
import { useTranslation } from "~/hooks/useTranslation";
import { LogoMeem } from "./LogoMeem";
import { MuIcons } from "./icons";
import { getAuthProviders } from "~/lib/auth-session";

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
  const { data: providers, isPending } = useQuery({ queryKey: ["auth-providers"], queryFn: () => getAuthProviders(), staleTime: 60_000 });
  const googleEnabled = providers?.google === true;

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
    setLoading(true);
    try {
      const result = await signIn.social({ provider: "google", callbackURL: redirect || "/" });
      if (result?.error) {
        setError(t.auth.googleFailed);
      }
    } catch {
      setError(t.auth.googleFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-pro-shell">
      <div className="auth-pro-card">
        <div className="auth-pro-brand"><LogoMeem size={39} /><span>imtiyaz<small>digital studio</small></span></div>
        <div className="auth-pro-art" aria-hidden="true"><span>✦</span><span>{MuIcons.book}</span><span>✧</span></div>
        <div className="auth-pro-head">
          <span className="auth-pro-kicker">MUROJAAH</span>
          <h1>{mode === "signin" || googleEnabled ? "Ayo, lanjutkan belajar!" : "Mulai petualanganmu"}</h1>
          <p>Hafalan, catatan, dan pencapaianmu tetap tersimpan.</p>
        </div>

        {error && (
          <p style={{ color: "#b32020", fontSize: 13, textAlign: "center", margin: "0 0 16px" }}>
            {error}
          </p>
        )}

        {isPending ? <div className="auth-pro-loading" role="status">Memuat cara masuk…</div> : googleEnabled ? <div className="auth-pro-actions">
          <button type="button" className="auth-pro-google" onClick={handleGoogle} disabled={loading}>
            {MuIcons.google}
            <span>{loading ? "Menghubungkan…" : "Masuk dengan Google"}</span>
            {MuIcons.arrowRight}
          </button>
          <p className="auth-pro-privacy">Anak-anak dapat menggunakan akun orang tua atau pendamping.</p>
        </div> : <>
        <form className="auth-pro-form" onSubmit={handleSubmit}>
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
            className="auth-pro-submit"
            disabled={loading}
          >
            {loading ? t.common.loading : mode === "signin" ? t.auth.login : t.auth.createAccount}
            {MuIcons.arrowRight}
          </button>
        </form>

        <p className="auth-pro-alt">
          {mode === "signin" ? t.auth.noAccount : t.auth.hasAccount}
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          >
            {mode === "signin" ? t.auth.register : t.auth.login}
          </button>
        </p></>}
        <Link to="/" className="auth-pro-guest">Belajar tanpa akun {MuIcons.chev}</Link>
        <div className="auth-pro-note"><span>{MuIcons.lock}</span> Data belajarmu tetap privat.</div>
      </div>
    </div>
  );
}
