import { Link } from "@tanstack/react-router";
import { useTranslation } from "~/hooks/useTranslation";
import { MuIcons } from "./icons";
import type { ReactNode } from "react";

function Tile({ icon, label, subtitle }: { icon: ReactNode; label: string; subtitle: string }) {
  return <><span className="home-tile-icon" aria-hidden="true">{icon}</span><span className="home-tile-copy"><strong>{label}</strong><small>{subtitle}</small></span><span className="home-tile-arrow" aria-hidden="true">{MuIcons.chev}</span></>;
}

function Shelf({ title, subtitle, icon, tone, children, action }: { title: string; subtitle: string; icon: ReactNode; tone: string; children: ReactNode; action?: ReactNode }) {
  return <section className={`home-shelf home-shelf-${tone}`}><header className="home-shelf-head"><span className="home-shelf-badge" aria-hidden="true">{icon}</span><div><h2>{title}</h2><p>{subtitle}</p></div>{action}</header><div className="home-shelf-grid">{children}</div></section>;
}

export function HomeShelves() {
  const { t } = useTranslation();
  const s = t.home.shelves;
  const c = t.home.chips;
  return <div className="home-shelves-pro">
    <div className="home-shelves-intro"><span className="kid-kicker">✦ Petualangan mengaji</span><h2>Jelajahi lebih banyak</h2><p>Pilih kegiatan yang paling kamu suka hari ini.</p></div>
    <Shelf title={s.read} subtitle="Temukan ayat favoritmu" icon={MuIcons.book} tone="read">
      <Link to="/fihrist" className="home-tile"><Tile icon={MuIcons.book} label={c.surahList} subtitle="114 surah" /></Link>
      <Link to="/page/$pageNumber" params={{ pageNumber: "1" }} search={{ ayah: undefined }} className="home-tile"><Tile icon={MuIcons.note} label={c.pageView} subtitle="604 halaman" /></Link>
      <Link to="/juz/$juzId" params={{ juzId: "1" }} search={{ ayah: undefined }} className="home-tile"><Tile icon={MuIcons.bookmark} label={c.juzView} subtitle="30 juz" /></Link>
      <Link to="/discover" className="home-tile"><Tile icon={MuIcons.compass} label={c.discover} subtitle="Temukan ilmu baru" /></Link>
    </Shelf>
    <Shelf title={s.learn} subtitle="Dasar membaca dengan baik" icon={MuIcons.alif} tone="learn">
      <Link to="/alifba" className="home-tile"><Tile icon={MuIcons.alif} label={c.alifba} subtitle="Kenali huruf" /></Link>
      <Link to="/tajweed" className="home-tile"><Tile icon={MuIcons.mic} label={c.tajweed} subtitle="Belajar aturan baca" /></Link>
    </Shelf>
    <Shelf title={s.practice} subtitle="Selangkah demi selangkah" icon={MuIcons.star} tone="practice">
      <Link to="/hifz" className="home-tile"><Tile icon={MuIcons.brain} label={c.hifz} subtitle="Latihan ingatan" /></Link>
      <Link to="/recite" className="home-tile"><Tile icon={MuIcons.mic} label={c.recite} subtitle="Latihan membaca" /></Link>
      <Link to="/notes" className="home-tile"><Tile icon={MuIcons.note} label={c.notes} subtitle="Catat pelajaran" /></Link>
      <Link to="/bookmarks" className="home-tile"><Tile icon={MuIcons.bookmark} label={c.bookmarks} subtitle="Ayat favorit" /></Link>
      <Link to="/stats" className="home-tile"><Tile icon={MuIcons.chart} label={c.stats} subtitle="Lihat capaianmu" /></Link>
    </Shelf>
    <Shelf title={s.games} subtitle="Latihan seru, mengejar bintang" icon={MuIcons.gameController} tone="play" action={<Link to="/games" className="home-shelf-all">{t.home.viewAll} {MuIcons.chev}</Link>}>
      <Link to="/games/verse-chain" className="home-tile"><Tile icon="🔗" label={t.gamesHub.verseChainTitle} subtitle="Lanjutkan ayat" /></Link>
      <Link to="/games/fill-blank" className="home-tile"><Tile icon="🧩" label={c.fillBlank} subtitle="Temukan kata" /></Link>
      <Link to="/games/kelime-tahmini" className="home-tile"><Tile icon="💡" label={c.wordGuess} subtitle="Tebak huruf" /></Link>
      <Link to="/games/ayah-2048" className="home-tile"><Tile icon="✨" label={c.ayah2048} subtitle="Susun ubin" /></Link>
      <Link to="/games/surah-guess" className="home-tile"><Tile icon="🎯" label={c.surahGuess} subtitle="Kenali surah" /></Link>
    </Shelf>
    <Shelf title={s.community} subtitle="Semangat bersama teman" icon={MuIcons.usersThree} tone="community">
      <Link to="/khatm" className="home-tile"><Tile icon={MuIcons.book} label={c.khatm} subtitle="Baca bersama" /></Link>
      <Link to="/games/scoreboard" className="home-tile"><Tile icon={MuIcons.games} label={c.scoreboard} subtitle="Lihat pencapaian" /></Link>
    </Shelf>
  </div>;
}
