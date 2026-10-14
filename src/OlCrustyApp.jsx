import React, { useState, useEffect } from "react";
import {
  Settings, UserPlus, History, Clock, Gift, Wallet, ChevronRight, ChevronLeft,
  Sparkles, Anchor, Gem, Crown, X, Compass, Flame, Copy, Megaphone, Headphones,
  Bell, User, EyeOff, ShieldOff, FileText, LogOut, ArrowUpRight, ArrowDownLeft,
  Plus, Check, AlertTriangle, Pencil, ClipboardPaste, Users, TrendingUp, Rocket, Share2, Search, Eye, Lock
} from "lucide-react";

const COLORS = {
  bg: "#0A1420",
  panel: "#0F1E2C",
  panelAlt: "#152836",
  gold: "#D9A854",
  goldDim: "#8C7239",
  coral: "#FF6F51",
  seafoam: "#3FAE95",
  cream: "#F3E9D6",
  muted: "#7C93A3",
  line: "rgba(217,168,84,0.16)",
};

function FontLoader() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700;9..144,800&family=Manrope:wght@400;500;600;700;800&display=swap');
      .font-display { font-family: 'Fraunces', serif; }
      .font-body { font-family: 'Manrope', sans-serif; }
      @keyframes tideRing {
        0% { transform: scale(0.85); opacity: 0.55; }
        100% { transform: scale(1.65); opacity: 0; }
      }
      @keyframes bob {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-6px); }
      }
      @keyframes shimmer {
        0% { opacity: 0.35; }
        50% { opacity: 1; }
        100% { opacity: 0.35; }
      }
    `}</style>
  );
}

function TopBar({ title, handle, onHandleClick, onInvite, onSettings, onFriends, friendsCount = 0 }) {
  return (
    <div className="flex items-start justify-between px-5 pt-6">
      <div>
        <h1 className="font-display text-3xl" style={{ color: COLORS.cream, fontWeight: 700 }}>
          {title}
        </h1>
        {handle && (
          <button onClick={onHandleClick} className="flex items-center gap-0.5 mt-1">
            <span className="font-body" style={{ fontSize: 12, color: COLORS.muted }}>{handle}</span>
            <ChevronRight size={13} color={COLORS.muted} />
          </button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <button onClick={onFriends} className="flex items-center gap-1 pr-4" style={{ color: COLORS.cream }}>
            <Users size={15} />
            <span className="font-body text-xs font-bold" style={{ color: COLORS.coral }}>{friendsCount}</span>
          </button>
          <button
            onClick={onInvite}
            className="flex items-center gap-1 font-body text-xs font-bold px-3 py-2 rounded-full"
            style={{ background: COLORS.cream, color: COLORS.bg, marginLeft: -14 }}
          >
            <Plus size={14} strokeWidth={2.75} />
            Invite
          </button>
        </div>
        <button
          onClick={onSettings}
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: COLORS.panelAlt }}
        >
          <Settings size={15} color={COLORS.muted} />
        </button>
      </div>
    </div>
  );
}

function BackHeader({ title, onBack }) {
  return (
    <div className="flex items-center gap-3 px-5 pt-6 pb-2">
      <button onClick={onBack} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: COLORS.panelAlt }}>
        <ChevronLeft size={17} color={COLORS.cream} />
      </button>
      <h1 className="font-display text-xl font-bold" style={{ color: COLORS.cream }}>
        {title}
      </h1>
    </div>
  );
}

function BottomNav({ active, setActive }) {
  const items = [
    { key: "mine", label: "Farm", icon: Anchor },
    { key: "haul", label: "Leaderboard", icon: Crown },
    { key: "wallet", label: "Wallet", icon: Wallet },
  ];
  return (
    <div
      className="flex items-center justify-around px-6 py-3 border-t"
      style={{ background: "#08111C", borderColor: COLORS.line }}
    >
      {items.map(({ key, label, icon: Icon }) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => setActive(key)}
            className="flex flex-col items-center gap-1"
            style={{ width: 72 }}
          >
            <Icon
              size={20}
              color={isActive ? COLORS.gold : COLORS.muted}
              fill={isActive && key === "mine" ? COLORS.gold : "none"}
              strokeWidth={isActive ? 2.4 : 2}
            />
            <span
              className="font-body"
              style={{
                color: isActive ? COLORS.cream : COLORS.muted,
                fontWeight: isActive ? 700 : 500, fontSize: 10 }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function BoosterTile({ icon: Icon, time, tint, onClick, active, locked }) {
  return (
    <button
      onClick={onClick}
      disabled={locked && !active}
      className="flex flex-col items-center justify-center gap-1 rounded-2xl relative"
      style={{
        width: 62, height: 62,
        background: active ? `${tint}22` : COLORS.panelAlt,
        border: `1.5px solid ${active ? tint : COLORS.line}`,
        opacity: locked && !active ? 0.5 : 1,
      }}
    >
      <Icon size={16} color={tint} />
      <span className="font-body font-bold" style={{ color: tint, fontSize: 10 }}>
        {active ? "Active" : locked ? "Used" : time}
      </span>
    </button>
  );
}

function AdSequenceModal({ title, tint, onComplete, onCancel }) {
  const [step, setStep] = useState(0); // ads watched so far
  const [watching, setWatching] = useState(false);

  const watchAd = () => {
    setWatching(true);
    setTimeout(() => {
      setWatching(false);
      const next = step + 1;
      setStep(next);
      if (next >= 3) {
        setTimeout(onComplete, 300);
      }
    }, 1400);
  };

  return (
    <div className="absolute inset-0 flex items-end justify-center z-50" style={{ background: "rgba(0,0,0,0.75)" }}>
      <div className="w-full rounded-t-3xl px-6 pt-5 pb-6 flex flex-col items-center" style={{ background: "#101E2C", border: `1px solid ${COLORS.line}` }}>
        <div className="flex justify-between items-center w-full mb-5">
          <p className="font-display font-bold" style={{ fontSize: 18, color: COLORS.cream }}>{title}</p>
          <button onClick={onCancel}><X size={18} color={COLORS.muted} /></button>
        </div>

        <div className="flex gap-2 mb-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-full"
              style={{ width: 44, height: 6, background: i < step ? tint : COLORS.panelAlt }}
            />
          ))}
        </div>

        <div
          className="rounded-2xl flex items-center justify-center mb-5"
          style={{ width: 140, height: 140, background: COLORS.panelAlt, border: `2px solid ${watching ? tint : COLORS.line}` }}
        >
          <span style={{ fontSize: 40 }}>{watching ? "📺" : "▶️"}</span>
        </div>

        <p className="font-body text-center mb-5" style={{ fontSize: 13, color: COLORS.muted }}>
          {step >= 3 ? "All done — applying your reward…" : watching ? "Playing ad…" : `Ad ${step + 1} of 3`}
        </p>

        {step < 3 && (
          <button
            onClick={watchAd}
            disabled={watching}
            className="w-full py-3.5 rounded-2xl font-body font-bold"
            style={{ fontSize: 14, background: watching ? COLORS.panelAlt : tint, color: watching ? COLORS.muted : COLORS.bg }}
          >
            {watching ? "Watching…" : `Watch Ad ${step + 1}`}
          </button>
        )}

        <p className="font-body text-center mt-3" style={{ fontSize: 11, color: COLORS.muted }}>
          Closing early loses your progress — you'll need to start over.
        </p>
      </div>
    </div>
  );
}

function LevelPopup({ onClose, onInvite }) {
  const rows = [
    { icon: Crown, label: "My Rank", value: "Hatchling (1)" },
    { icon: Users, label: "Friends to rank up", value: "3" },
    { icon: TrendingUp, label: "Current Mining Power", value: "x1.0" },
    { icon: Rocket, label: "Next Rank Mining Power", value: "x1.2" },
  ];
  return (
    <div className="absolute inset-0 flex items-end justify-center" style={{ background: "rgba(0,0,0,0.65)" }} onClick={onClose}>
      <div
        className="w-full rounded-t-3xl p-5 pb-6"
        style={{ background: "#101E2C", border: `1px solid ${COLORS.line}` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end mb-1">
          <button onClick={onClose}><X size={18} color={COLORS.muted} /></button>
        </div>
        <p className="font-display font-bold text-center mb-4" style={{ fontSize: 18, color: COLORS.cream }}>
          @olcrusty
        </p>

        <div className="flex flex-col gap-2.5 mb-5">
          {rows.map((r, i) => (
            <div key={i} className="flex items-center justify-between rounded-2xl px-4 py-3.5" style={{ background: COLORS.panelAlt }}>
              <div className="flex items-center gap-2.5">
                <r.icon size={16} color={COLORS.gold} />
                <span className="font-body" style={{ fontSize: 14, color: COLORS.cream }}>{r.label}</span>
              </div>
              <span className="font-body font-bold" style={{ fontSize: 14, color: COLORS.cream }}>{r.value}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onInvite}
          className="w-full py-3.5 rounded-2xl font-body font-bold mb-2.5"
          style={{ fontSize: 14, background: COLORS.coral, color: COLORS.bg }}
        >
          Invite friend to boost your farming speed
        </button>
      </div>
    </div>
  );
}

function MiningScreen({ onInvite, onSettings, onHistory, onInvitedFriends, tokens, onEarnToken, onSpendToken }) {
  const SESSION_LENGTH = 21600; // 6 hours
  const [seconds, setSeconds] = useState(SESSION_LENGTH);
  const [sessionActive, setSessionActive] = useState(false);
  const [showLevelPopup, setShowLevelPopup] = useState(false);
  const [tideBoostActive, setTideBoostActive] = useState(false);
  const [squallUsed, setSquallUsed] = useState(false);
  const [adModal, setAdModal] = useState(null); // "tide" | "squall" | null
  const [showDriftbox, setShowDriftbox] = useState(false);
  const [driftboxNotice, setDriftboxNotice] = useState(false);

  useEffect(() => {
    if (!sessionActive) return;
    const t = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          // session ends — reset everything for the next one
          setSessionActive(false);
          setTideBoostActive(false);
          setSquallUsed(false);
          return SESSION_LENGTH;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [sessionActive]);

  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  const progressPct = Math.round(((SESSION_LENGTH - seconds) / SESSION_LENGTH) * 100);

  const baseRate = 2.08;
  const displayRate = tideBoostActive ? (baseRate * 2.5).toFixed(2) : baseRate.toFixed(2);

  const handleTideBoostComplete = () => {
    setAdModal(null);
    setTideBoostActive(true);
  };
  const handleSquallComplete = () => {
    setAdModal(null);
    setSquallUsed(true);
    onEarnToken();
  };
  const handleDriftboxTap = () => {
    if (tokens <= 0) {
      setDriftboxNotice(true);
      setTimeout(() => setDriftboxNotice(false), 2200);
      return;
    }
    onSpendToken();
    setShowDriftbox(true);
  };

  return (
    <div className="relative flex flex-col h-full">
      <TopBar
        title="Crusty"
        handle="@olcrusty"
        onHandleClick={() => setShowLevelPopup(true)}
        onInvite={onInvite}
        onSettings={onSettings}
        onFriends={onInvitedFriends}
        friendsCount={0}
      />

      <div className="px-5 mt-5">
        <div
          className="flex items-center justify-between rounded-2xl px-4 py-3.5"
          style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}` }}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center font-display font-bold text-sm" style={{ background: COLORS.gold, color: COLORS.bg }}>C</div>
            <span className="font-display text-2xl" style={{ color: COLORS.cream, fontWeight: 700 }}>428.6</span>
            <span className="font-body text-xs" style={{ color: COLORS.muted }}>CLAW</span>
          </div>
          <button onClick={onHistory} className="flex items-center gap-1 font-body text-xs" style={{ color: COLORS.muted }}>
            <History size={13} />
            History
          </button>
        </div>
      </div>

      <div className="flex-1 relative flex items-center justify-center mt-2">
        <div className="absolute right-5 top-2 flex flex-col gap-2.5">
          <BoosterTile
            icon={Sparkles} tint={COLORS.coral} time="Tap"
            active={tideBoostActive}
            locked={tideBoostActive || squallUsed === null}
            onClick={() => !tideBoostActive && sessionActive && setAdModal("tide")}
          />
          <BoosterTile
            icon={Compass} tint={COLORS.seafoam} time="Tap"
            active={false}
            locked={squallUsed}
            onClick={() => !squallUsed && sessionActive && setAdModal("squall")}
          />
          <BoosterTile
            icon={Gift} tint={COLORS.gold} time={String(tokens)}
            active={false}
            locked={false}
            onClick={handleDriftboxTap}
          />
        </div>

        {driftboxNotice && (
          <div className="absolute top-2 left-5 right-24 rounded-xl px-3 py-2" style={{ background: COLORS.panelAlt, border: `1px solid ${COLORS.line}` }}>
            <p className="font-body" style={{ fontSize: 11, color: COLORS.cream }}>No tokens yet — earn one from Squall.</p>
          </div>
        )}

        <div className="relative flex flex-col items-center">
          <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>
            {sessionActive && [0, 1, 2].map((i) => (
              <div key={i} className="absolute rounded-full border" style={{ width: 150, height: 150, borderColor: COLORS.gold, animation: `tideRing 3.2s ease-out infinite`, animationDelay: `${i * 1.05}s` }} />
            ))}
            <button
              onClick={() => !sessionActive && setSessionActive(true)}
              className="relative rounded-full flex items-end justify-center overflow-hidden"
              style={{ width: 150, height: 150, background: `radial-gradient(circle at 35% 30%, #1C3244, ${COLORS.bg})`, border: `2px solid ${COLORS.goldDim}`, animation: sessionActive ? "bob 4s ease-in-out infinite" : "none" }}
            >
              <div className="absolute bottom-0 w-full" style={{ height: 46, background: "linear-gradient(180deg, #B8863E, #7C5A26)", borderTop: `2px solid ${COLORS.gold}` }} />
              <span style={{ fontSize: 64, marginBottom: 8, filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.4))" }}>🦀</span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 pb-5 pt-2">
        <div className="flex items-center justify-center gap-1.5 mb-2">
          <span className="font-display text-lg font-bold" style={{ color: tideBoostActive ? COLORS.coral : COLORS.cream }}>+{displayRate}</span>
          <span className="font-body text-xs" style={{ color: COLORS.muted }}>/ hr</span>
          {tideBoostActive && (
            <span className="font-body font-bold px-2 py-0.5 rounded-full" style={{ fontSize: 10, background: `${COLORS.coral}22`, color: COLORS.coral }}>2.5x active</span>
          )}
        </div>

        {sessionActive ? (
          <>
            <div className="relative h-2 rounded-full" style={{ background: COLORS.panelAlt }}>
              <div className="absolute left-0 top-0 h-2 rounded-full" style={{ width: `${progressPct}%`, background: `linear-gradient(90deg, ${COLORS.coral}, ${COLORS.gold})` }} />
              <div className="absolute top-1/2 -translate-y-1/2 rounded-lg flex items-center justify-center" style={{ left: `calc(${progressPct}% - 14px)`, width: 28, height: 28, background: COLORS.coral, border: `2px solid ${COLORS.bg}` }}>
                <span style={{ fontSize: 14 }}>🦀</span>
              </div>
            </div>
            <p className="text-center font-display text-2xl mt-4 font-bold" style={{ color: COLORS.coral }}>{h}:{m}:{s}</p>
          </>
        ) : (
          <button
            onClick={() => setSessionActive(true)}
            className="w-full py-4 rounded-2xl font-body font-bold text-center"
            style={{ fontSize: 15, background: COLORS.gold, color: COLORS.bg }}
          >
            Start Farming
          </button>
        )}
      </div>

      {adModal === "tide" && (
        <AdSequenceModal title="Tide Boost" tint={COLORS.coral} onComplete={handleTideBoostComplete} onCancel={() => setAdModal(null)} />
      )}
      {adModal === "squall" && (
        <AdSequenceModal title="Squall" tint={COLORS.seafoam} onComplete={handleSquallComplete} onCancel={() => setAdModal(null)} />
      )}
      {showDriftbox && <DriftboxRevealPopup onClose={() => setShowDriftbox(false)} />}

      {showLevelPopup && (
        <LevelPopup
          onClose={() => setShowLevelPopup(false)}
          onInvite={() => { setShowLevelPopup(false); onInvite(); }}
        />
      )}
    </div>
  );
}

function RewardCard({ icon: Icon, label, value, actionLabel, tint, onClick }) {
  return (
    <div className="flex-1 rounded-2xl p-4" style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}` }}>
      <div className="flex items-center justify-between mb-3">
        <Icon size={18} color={tint} />
        <span className="font-body" style={{ color: COLORS.muted, fontSize: 10 }}>?</span>
      </div>
      <p className="font-body text-xs mb-1" style={{ color: COLORS.muted }}>{label}</p>
      <p className="font-display text-2xl font-bold mb-3" style={{ color: COLORS.cream }}>{value}</p>
      <button onClick={onClick} className="w-full py-2 rounded-xl font-body text-xs font-bold" style={{ background: COLORS.panelAlt, color: tint }}>{actionLabel}</button>
    </div>
  );
}

const DRIFTBOX_CARDS = [
  { name: "Common Haul", tier: "common", odds: 0.60, weight: "2.0x", value: 25.0, color: "#8CA0AE", emoji: "🦀" },
  { name: "Rare Haul", tier: "rare", odds: 0.30, weight: "2.25x", value: 28.125, color: "#3FAE95", emoji: "🐚" },
  { name: "Legendary Haul", tier: "legendary", odds: 0.10, weight: "2.5x", value: 31.25, color: "#D9A854", emoji: "👑" },
];

function drawDriftboxCard() {
  const roll = Math.random();
  if (roll < 0.10) return DRIFTBOX_CARDS[2]; // Legendary, 10%
  if (roll < 0.40) return DRIFTBOX_CARDS[1]; // Rare, 30%
  return DRIFTBOX_CARDS[0]; // Common, 60%
}

function DriftboxRevealPopup({ onClose }) {
  const [revealed, setRevealed] = useState(false);
  const [card, setCard] = useState(null);

  const handleOpen = () => {
    const drawn = drawDriftboxCard();
    setCard(drawn);
    setTimeout(() => setRevealed(true), 400);
  };

  return (
    <div className="absolute inset-0 flex items-end justify-center" style={{ background: "rgba(0,0,0,0.7)" }} onClick={onClose}>
      <div
        className="w-full rounded-t-3xl px-6 pt-5 pb-6 relative flex flex-col items-center"
        style={{ background: "#101E2C", border: `1px solid ${COLORS.line}`, minHeight: 340 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: COLORS.panelAlt }}>
          <X size={15} color={COLORS.muted} />
        </button>

        <p className="font-display font-bold mt-2 mb-6" style={{ fontSize: 18, color: COLORS.cream }}>Driftbox</p>

        {!card ? (
          <>
            <button
              onClick={handleOpen}
              className="rounded-full flex items-center justify-center mb-6"
              style={{
                width: 130, height: 130,
                background: `radial-gradient(circle at 35% 30%, #3A2F60, #101E2C)`,
                border: `2px solid ${COLORS.goldDim}`,
                animation: "bob 3s ease-in-out infinite",
              }}
            >
              <span style={{ fontSize: 56 }}>🎁</span>
            </button>
            <p className="font-body text-center" style={{ fontSize: 13, color: COLORS.muted }}>Tap the box to open — 1 token</p>
          </>
        ) : (
          <>
            <div
              className="rounded-2xl flex flex-col items-center justify-center mb-5 transition-all"
              style={{
                width: 160, height: 200,
                background: `linear-gradient(160deg, ${card.color}33, #101E2C)`,
                border: `2px solid ${card.color}`,
                opacity: revealed ? 1 : 0,
                transform: revealed ? "scale(1) rotateY(0deg)" : "scale(0.85) rotateY(90deg)",
                transitionDuration: "400ms",
              }}
            >
              <span style={{ fontSize: 48, marginBottom: 8 }}>{card.emoji}</span>
              <p className="font-display font-bold" style={{ fontSize: 16, color: card.color }}>{card.name}</p>
              <p className="font-body mt-1" style={{ fontSize: 11, color: COLORS.muted }}>{card.weight} farm rate</p>
            </div>
            {revealed && (
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full font-body font-bold"
                style={{ fontSize: 13, background: COLORS.panelAlt, color: COLORS.cream }}
              >
                Nice
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function LeaderboardScreen({ onBack }) {
  const [query, setQuery] = useState("");
  const fullBoard = [
    { rank: 1, name: "reeftide", amt: "12,480" },
    { rank: 2, name: "sandbar_kx", amt: "10,910" },
    { rank: 3, name: "clawson", amt: "9,225" },
    { rank: 4, name: "you (olcrusty)", amt: "428.6", isYou: true },
    { rank: 5, name: "tidepool_mo", amt: "7,640" },
    { rank: 6, name: "shellshock22", amt: "6,980" },
    { rank: 7, name: "briny_deep", amt: "6,120" },
    { rank: 8, name: "hermit_hq", amt: "5,875" },
    { rank: 9, name: "lowtide.lena", amt: "5,410" },
    { rank: 10, name: "crabcake_jt", amt: "4,990" },
    { rank: 11, name: "seasalt_ade", amt: "4,320" },
    { rank: 12, name: "barnacle_bo", amt: "3,875" },
  ];

  const visible = fullBoard.filter((r) => r.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="flex flex-col h-full">
      <BackHeader title="Colony Leaderboard" onBack={onBack} />

      <div className="px-5 pt-1 pb-3">
        <div className="flex items-center gap-2 rounded-2xl px-3.5 py-2.5" style={{ background: COLORS.panelAlt, border: `1px solid ${COLORS.line}` }}>
          <Search size={15} color={COLORS.muted} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search colony members"
            className="flex-1 bg-transparent outline-none font-body"
            style={{ fontSize: 14, color: COLORS.cream }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5">
        {visible.length === 0 ? (
          <p className="text-center font-body mt-10" style={{ fontSize: 13, color: COLORS.muted }}>
            No colony member found
          </p>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}` }}>
            {visible.map((row, i) => (
              <div
                key={row.rank}
                className="flex items-center justify-between px-4 py-3.5"
                style={{ borderBottom: i < visible.length - 1 ? `1px solid ${COLORS.line}` : "none", background: row.isYou ? COLORS.panelAlt : "transparent" }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="font-display text-sm font-bold w-6 text-center"
                    style={{ color: row.rank <= 3 ? COLORS.gold : COLORS.muted }}
                  >
                    {row.rank}
                  </span>
                  <span className="font-body text-sm" style={{ color: COLORS.cream, fontWeight: row.isYou ? 700 : 500 }}>
                    {row.name}
                  </span>
                </div>
                <span className="font-body text-sm font-bold" style={{ color: COLORS.gold }}>{row.amt}</span>
              </div>
            ))}
          </div>
        )}
        <div className="pb-6" />
      </div>
    </div>
  );
}

function ClaimSuccessPopup({ onClose, title = "Task complete!", subtitle = "Nice work.", reward = "+10 CLAW", rewardNote = "Added to your balance" }) {
  return (
    <div className="absolute inset-0 flex items-end justify-center" style={{ background: "rgba(0,0,0,0.65)" }} onClick={onClose}>
      <div
        className="w-full rounded-t-3xl px-6 pt-5 pb-6 relative"
        style={{ background: "#101E2C", border: `1px solid ${COLORS.line}` }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: COLORS.panelAlt }}>
          <X size={15} color={COLORS.muted} />
        </button>

        <div className="flex justify-center mt-2 mb-5">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: `radial-gradient(circle at 35% 30%, #FFD98E, ${COLORS.gold})`, boxShadow: "0 0 40px rgba(217,168,84,0.35)" }}
          >
            <span style={{ fontSize: 40 }}>🦀</span>
          </div>
        </div>

        <p className="font-display font-bold text-center leading-snug mb-2" style={{ fontSize: 22, color: COLORS.cream }}>
          {title}
        </p>
        <p className="font-body text-center mb-6" style={{ fontSize: 14, color: COLORS.muted }}>
          {subtitle}
        </p>

        <div className="flex items-center justify-between rounded-2xl px-4 py-3.5" style={{ background: COLORS.panelAlt }}>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: COLORS.panel }}>
              <Flame size={16} color={COLORS.coral} />
            </div>
            <div>
              <p className="font-body font-bold" style={{ fontSize: 14, color: COLORS.cream }}>{reward}</p>
              <p className="font-body" style={{ fontSize: 11, color: COLORS.muted }}>{rewardNote}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskCard({ task, onOpen }) {
  const buttonLabel = task.completed ? "Done" : task.action;

  return (
    <button
      onClick={() => !task.completed && onOpen(task)}
      className="w-full text-left rounded-2xl p-4 flex items-center justify-between"
      style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}`, opacity: task.completed ? 0.6 : 1 }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: COLORS.panelAlt }}>
          <Flame size={17} color={COLORS.coral} />
        </div>
        <div>
          <p className="font-body text-sm font-bold" style={{ color: COLORS.cream }}>{task.title}</p>
          <p className="font-body" style={{ color: COLORS.muted, fontSize: 11 }}>{task.description}</p>
        </div>
      </div>
      <span
        className="px-4 py-2 rounded-full font-body text-xs font-bold"
        style={{ background: task.completed ? COLORS.panelAlt : COLORS.coral, color: task.completed ? COLORS.muted : COLORS.bg }}
      >
        {buttonLabel}
      </span>
    </button>
  );
}

function TaskModal({ task, onClose, onConfirm }) {
  const [done, setDone] = useState(false);

  return (
    <div className="absolute inset-0 flex items-end justify-center z-50" style={{ background: "rgba(0,0,0,0.75)" }}>
      <div className="w-full rounded-t-3xl px-6 pt-5 pb-6 flex flex-col items-center" style={{ background: "#101E2C", border: `1px solid ${COLORS.line}` }}>
        <div className="flex justify-between items-center w-full mb-6">
          <p className="font-display font-bold" style={{ fontSize: 18, color: COLORS.cream }}>{task.title}</p>
          <button onClick={onClose}><X size={18} color={COLORS.muted} /></button>
        </div>

        <div
          className="rounded-2xl flex items-center justify-center mb-5"
          style={{ width: 140, height: 140, background: COLORS.panelAlt, border: `2px solid ${done ? COLORS.seafoam : COLORS.line}` }}
        >
          <span style={{ fontSize: 48 }}>{done ? "✅" : task.emoji}</span>
        </div>

        <p className="font-body text-center mb-5" style={{ fontSize: 13, color: COLORS.muted }}>
          {done ? (task.reward ? `You earned ${task.reward}` : "Marked as complete") : task.description}
        </p>

        {!done ? (
          <button
            onClick={() => setDone(true)}
            className="w-full py-3.5 rounded-2xl font-body font-bold"
            style={{ fontSize: 14, background: COLORS.coral, color: COLORS.bg }}
          >
            {task.action}
          </button>
        ) : (
          <button
            onClick={() => onConfirm(task)}
            className="w-full py-3.5 rounded-2xl font-body font-bold"
            style={{ fontSize: 14, background: COLORS.panelAlt, color: COLORS.cream }}
          >
            Nice
          </button>
        )}

        {!done && (
          <p className="font-body text-center mt-3" style={{ fontSize: 11, color: COLORS.muted }}>
            We trust you on this one — abusing it may get your account flagged.
          </p>
        )}
      </div>
    </div>
  );
}

function HaulScreen({ onOpenLeaderboard, tokens, onGoToFarm }) {
  const [activeTask, setActiveTask] = useState(null);
  const [tasks, setTasks] = useState([
    { id: "t1", title: "Follow @olcrusty on X", description: "Stay updated with colony news", action: "Follow", emoji: "🐦", completed: false },
    { id: "t2", title: "Join the Ol' Crusty Telegram", description: "Connect with the colony", action: "Join", emoji: "✈️", completed: false },
    { id: "t3", title: "Watch the launch trailer", description: "See what's coming for Ol' Crusty", action: "Watch", emoji: "🎬", completed: false },
    { id: "t4", title: "Colony welcome bonus", description: "One-time reward for new members", action: "Claim", reward: "+10 CLAW", emoji: "🎁", completed: false },
  ]);

  const handleTaskConfirm = (task) => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
    setActiveTask(null);
  };

  const board = [
    { rank: 1, name: "reeftide", amt: "12,480" },
    { rank: 2, name: "sandbar_kx", amt: "10,910" },
    { rank: 3, name: "clawson", amt: "9,225" },
    { rank: 4, name: "you (olcrusty)", amt: "428.6", isYou: true },
  ];
  return (
    <div className="relative flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <div className="relative px-5 pt-6">
          <span className="absolute top-4 right-8 text-2xl" style={{ animation: "bob 3.4s ease-in-out infinite" }}>🐚</span>
          <h1 className="font-display text-3xl font-bold" style={{ color: COLORS.cream }}>Leaderboard</h1>
        </div>

        <div className="px-5 mt-4 flex gap-3">
          <RewardCard icon={Compass} label="Squall tokens" value={String(tokens)} actionLabel="Earned on Farm" tint={COLORS.seafoam} onClick={onGoToFarm} />
          <RewardCard
            icon={Gift} label="Driftbox" value={String(tokens)}
            actionLabel={tokens > 0 ? "Open Driftbox" : "Need a token"}
            tint={COLORS.gold}
            onClick={onGoToFarm}
          />
        </div>

        <div className="px-5 mt-6 mb-2 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold" style={{ color: COLORS.cream }}>Colony Leaderboard</h2>
          <button onClick={onOpenLeaderboard} className="flex items-center gap-0.5 font-body font-bold" style={{ fontSize: 12, color: COLORS.gold }}>
            See all
            <ChevronRight size={14} color={COLORS.gold} />
          </button>
        </div>

        <div className="px-5">
          <button
            onClick={onOpenLeaderboard}
            className="w-full text-left rounded-2xl overflow-hidden"
            style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}` }}
          >
            {board.map((row, i) => (
              <div
                key={row.rank}
                className="flex items-center justify-between px-4 py-3.5"
                style={{ borderBottom: i < board.length - 1 ? `1px solid ${COLORS.line}` : "none", background: row.isYou ? COLORS.panelAlt : "transparent" }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="font-display text-sm font-bold w-6 text-center"
                    style={{ color: row.rank <= 3 ? COLORS.gold : COLORS.muted }}
                  >
                    {row.rank}
                  </span>
                  <span className="font-body text-sm" style={{ color: COLORS.cream, fontWeight: row.isYou ? 700 : 500 }}>
                    {row.name}
                  </span>
                </div>
                <span className="font-body text-sm font-bold" style={{ color: COLORS.gold }}>{row.amt}</span>
              </div>
            ))}
          </button>
        </div>

        <div className="px-5 mt-6 pb-6">
          <h2 className="font-display text-lg font-bold mb-3" style={{ color: COLORS.cream }}>Missions</h2>
          <div className="flex flex-col gap-2.5">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onOpen={setActiveTask} />
            ))}
          </div>
        </div>
      </div>

      {activeTask && (
        <TaskModal
          task={activeTask}
          onClose={() => setActiveTask(null)}
          onConfirm={handleTaskConfirm}
        />
      )}
    </div>
  );
}

function truncateAddress(addr) {
  if (!addr) return "";
  return `${addr.slice(0, 6)}…${addr.slice(-5)}`;
}

function WalletScreen({ walletAddress, onAddAddress, onChangeAddress }) {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const txns = []; // no real transactions exist yet — cleared placeholder farming/mission entries

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="px-5 pt-6">
        <h1 className="font-display text-3xl font-bold" style={{ color: COLORS.cream }}>Wallet</h1>
      </div>

      <div className="px-5 mt-5">
        <div className="rounded-2xl p-5" style={{ background: `linear-gradient(135deg, ${COLORS.panel}, ${COLORS.panelAlt})`, border: `1px solid ${COLORS.line}` }}>
          <p className="font-body text-xs" style={{ color: COLORS.muted }}>Total balance</p>
          <p className="font-display text-3xl font-bold mt-1" style={{ color: COLORS.cream }}>428.6 <span className="text-base font-body" style={{ color: COLORS.muted }}>CLAW</span></p>
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setShowComingSoon(true)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-body text-xs font-bold"
              style={{ background: COLORS.panelAlt, color: COLORS.muted, border: `1px solid ${COLORS.line}` }}
            >
              <ArrowDownLeft size={14} /> Deposit
            </button>
            <button
              onClick={() => setShowComingSoon(true)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-body text-xs font-bold"
              style={{ background: COLORS.panelAlt, color: COLORS.muted, border: `1px solid ${COLORS.line}` }}
            >
              <ArrowUpRight size={14} /> Withdraw
            </button>
          </div>
        </div>

        {showComingSoon && (
          <div className="mt-3 rounded-2xl p-3.5 flex items-start gap-2.5" style={{ background: COLORS.panelAlt, border: `1px solid ${COLORS.line}` }}>
            <AlertTriangle size={15} color={COLORS.gold} className="shrink-0 mt-0.5" />
            <p className="font-body leading-relaxed flex-1" style={{ fontSize: 12, color: COLORS.cream }}>
              Deposits and withdrawals opens at TGE
            </p>
            <button onClick={() => setShowComingSoon(false)}>
              <X size={14} color={COLORS.muted} />
            </button>
          </div>
        )}
      </div>

      <div className="px-5 mt-5">
        <h2 className="font-display text-base font-bold mb-1" style={{ color: COLORS.cream }}>Wallet address</h2>
        {!walletAddress ? (
          <button
            onClick={onAddAddress}
            className="w-full rounded-2xl p-4 flex items-center gap-3"
            style={{ background: COLORS.panel, border: `1.5px dashed ${COLORS.goldDim}` }}
          >
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: COLORS.panelAlt }}>
              <Plus size={16} color={COLORS.gold} />
            </div>
            <div className="text-left">
              <p className="font-body text-sm font-bold" style={{ color: COLORS.cream }}>Add wallet address</p>
              <p className="font-body" style={{ color: COLORS.muted, fontSize: 11 }}>Add your SOL USDT address here</p>
            </div>
          </button>
        ) : (
          <div className="rounded-2xl p-4" style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}` }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: COLORS.panelAlt }}>
                  <Wallet size={15} color={COLORS.seafoam} />
                </div>
                <div>
                  <p className="font-body text-sm font-bold" style={{ color: COLORS.cream }}>{truncateAddress(walletAddress)}</p>
                  <span className="font-body px-1.5 py-0.5 rounded" style={{ background: COLORS.panelAlt, color: COLORS.seafoam, fontSize: 10 }}>USDT · SOL</span>
                </div>
              </div>
              <button onClick={onChangeAddress} className="flex items-center gap-1 font-body text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: COLORS.panelAlt, color: COLORS.gold }}>
                <Pencil size={11} /> Change
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="px-5 mt-6 pb-6">
        <h2 className="font-display text-lg font-bold mb-3" style={{ color: COLORS.cream }}>Recent activity</h2>
        {txns.length === 0 ? (
          <div className="rounded-2xl p-6 flex flex-col items-center text-center" style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}` }}>
            <p className="font-body text-sm font-bold" style={{ color: COLORS.cream }}>No activity yet</p>
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}` }}>
            {txns.map((t, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3.5" style={{ borderBottom: i < txns.length - 1 ? `1px solid ${COLORS.line}` : "none" }}>
                <span className="font-body text-sm" style={{ color: COLORS.cream }}>{t.label}</span>
                <span className="font-body text-sm font-bold" style={{ color: t.up ? COLORS.seafoam : COLORS.coral }}>{t.amt}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AddWalletScreen({ onBack, onSave, existingAddress }) {
  const isEditing = Boolean(existingAddress);
  const [value, setValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const isValid = value.trim().length >= 32;

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setValue(text.trim());
    } catch (e) {
      // clipboard unavailable — user can type/paste manually
    }
  };

  return (
    <div className="flex flex-col h-full">
      <BackHeader title={isEditing ? "Change Wallet Address" : "Add Wallet Address"} onBack={onBack} />

      <div className="flex-1 overflow-y-auto px-5 pt-2">
        {isEditing && (
          <div className="rounded-2xl p-3.5 mb-5 flex items-center justify-between" style={{ background: COLORS.panelAlt, border: `1px solid ${COLORS.line}` }}>
            <div>
              <p className="font-body" style={{ color: COLORS.muted, fontSize: 10 }}>Current address</p>
              <p className="font-body text-sm font-bold mt-0.5" style={{ color: COLORS.cream }}>{truncateAddress(existingAddress)}</p>
            </div>
            <span className="font-body px-2 py-1 rounded-full" style={{ background: COLORS.panel, color: COLORS.seafoam, fontSize: 10 }}>Active</span>
          </div>
        )}

        <div
          className="rounded-2xl p-3.5 flex items-start gap-2"
          style={{ background: COLORS.panel, border: `1.5px solid ${value ? (isValid ? COLORS.seafoam : COLORS.coral) : COLORS.line}` }}
        >
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Paste your wallet address"
            rows={3}
            className="flex-1 bg-transparent outline-none resize-none font-body text-sm"
            style={{ color: COLORS.cream }}
          />
          <button onClick={handlePaste} className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: COLORS.panelAlt }}>
            <ClipboardPaste size={14} color={COLORS.gold} />
          </button>
        </div>

        {value.length > 0 && !isValid && (
          <p className="font-body mt-2 flex items-center gap-1" style={{ color: COLORS.coral, fontSize: 11 }}>
            <AlertTriangle size={12} /> That doesn't look like a full address yet
          </p>
        )}

        <div className="mt-3 flex items-center gap-2">
          <span className="font-body px-2.5 py-1 rounded-full font-bold" style={{ background: COLORS.panelAlt, color: COLORS.seafoam, fontSize: 10 }}>
            Network: USDT (SOL)
          </span>
        </div>

        <div className="rounded-2xl p-3.5 mt-5 flex gap-2.5" style={{ background: "rgba(255,111,81,0.08)", border: `1px solid rgba(255,111,81,0.25)` }}>
          <AlertTriangle size={15} color={COLORS.coral} className="shrink-0 mt-0.5" />
          <p className="font-body leading-relaxed" style={{ color: COLORS.cream, fontSize: 11 }}>
            Only send a Solana USDT address. Sending a wrong network, or mistyping a character, will lead to loss token.
          </p>
        </div>

        <button
          onClick={() => setConfirmed((c) => !c)}
          className="w-full flex items-center gap-3 mt-5 text-left"
        >
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
            style={{ background: confirmed ? COLORS.seafoam : "transparent", border: `1.5px solid ${confirmed ? COLORS.seafoam : COLORS.muted}` }}
          >
            {confirmed && <Check size={13} color={COLORS.bg} strokeWidth={3} />}
          </div>
          <span className="font-body text-xs" style={{ color: COLORS.muted }}>
            I've confirmed this address is correct and on the Solana network
          </span>
        </button>
      </div>

      <div className="px-5 pb-6 pt-3">
        <button
          disabled={!isValid || !confirmed}
          onClick={() => onSave(value.trim())}
          className="w-full py-3.5 rounded-2xl font-body text-sm font-bold transition-opacity"
          style={{
            background: isValid && confirmed ? COLORS.gold : COLORS.panelAlt,
            color: isValid && confirmed ? COLORS.bg : COLORS.muted,
          }}
        >
          {isEditing ? "Save New Address" : "Save Address"}
        </button>
      </div>
    </div>
  );
}

function HistoryScreen({ onBack }) {
  const [filter, setFilter] = useState("All");
  const tabs = ["All", "Mining", "Invites", "Others", "Migration"];

  const groups = [
    {
      date: "2026.08.28",
      entries: [
        { label: "Claw Harvest", time: "17:50:19", amt: "+1.2", cat: "Mining" },
      ],
    },
    {
      date: "2026.05.31",
      entries: [
        { label: "Claw Harvest", time: "18:21:25", amt: "+1.2", cat: "Mining" },
      ],
    },
    {
      date: "2026.05.30",
      entries: [
        { label: "Claw Harvest", time: "16:07:59", amt: "+1.2", cat: "Mining" },
        { label: "Driftbox Reward", time: "08:23:42", amt: "+5", cat: "Others" },
        { label: "Claw Harvest", time: "08:19:10", amt: "+1.2", cat: "Mining" },
        { label: "Welcome Reward", time: "08:19:04", amt: "+10", cat: "Others" },
      ],
    },
  ];

  const visibleGroups = groups
    .map((g) => ({
      ...g,
      entries: filter === "All" ? g.entries : g.entries.filter((e) => e.cat === filter),
    }))
    .filter((g) => g.entries.length > 0);

  return (
    <div className="flex flex-col h-full">
      <BackHeader title="History" onBack={onBack} />

      <div className="flex-1 overflow-y-auto px-5 pt-2 pb-6">
        <div
          className="rounded-2xl p-5"
          style={{ background: `linear-gradient(135deg, #2A2154, #17233A)`, border: `1px solid ${COLORS.line}` }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="font-body text-sm" style={{ color: "#C9BFE8" }}>Total Mined</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span style={{ fontSize: 16 }}>🦀</span>
              <span className="font-display text-2xl font-bold" style={{ color: COLORS.cream }}>428.6</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className="px-4 py-2 rounded-full font-body font-bold shrink-0"
              style={{
                fontSize: 13,
                background: filter === t ? COLORS.cream : COLORS.panelAlt,
                color: filter === t ? COLORS.bg : COLORS.muted,
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {visibleGroups.length === 0 ? (
          <p className="font-body text-sm text-center mt-10" style={{ color: COLORS.muted }}>
            Nothing here yet
          </p>
        ) : (
          visibleGroups.map((g) => (
            <div key={g.date} className="mt-6">
              <p className="font-body mb-2" style={{ fontSize: 12, color: COLORS.muted }}>{g.date}</p>
              <div className="h-px mb-1" style={{ background: COLORS.line }} />
              {g.entries.map((e, i) => (
                <div key={i} className="flex items-center justify-between py-3.5" style={{ borderBottom: i < g.entries.length - 1 ? `1px solid ${COLORS.line}` : "none" }}>
                  <div>
                    <p className="font-body text-sm" style={{ color: COLORS.cream }}>{e.label}</p>
                    <p className="font-body mt-0.5" style={{ fontSize: 12, color: COLORS.muted }}>{e.time}</p>
                  </div>
                  <span className="font-body text-sm font-bold" style={{ color: COLORS.seafoam }}>{e.amt}</span>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={onChange}
      className="rounded-full relative shrink-0"
      style={{ width: 42, height: 24, background: on ? COLORS.seafoam : COLORS.panelAlt, border: `1px solid ${on ? COLORS.seafoam : COLORS.line}` }}
    >
      <span
        className="absolute top-0.5 rounded-full bg-white transition-all"
        style={{ width: 18, height: 18, left: on ? 21 : 3 }}
      />
    </button>
  );
}

const NOTICE_BODY = {
  wave2: [
    { type: "p", text: "Hello Ol' Crusty colony 🦀" },
    { type: "p", text: "Based on the August 27 snapshot (14:00 UTC+1), a total of 58 new Colony Slots have been distributed in this wave." },
    { type: "section", emoji: "🎯", heading: "Colony Slot Criteria", items: [
      "Rank 5+ divers",
      "Invited crew must maintain genuine and consistent mining activity",
      "(Exact criteria are not disclosed to prevent abuse)",
    ]},
    { type: "section", emoji: "⚠️", heading: "Notes", items: [
      "Abusive accounts were excluded",
      "Some accounts are on hold due to invite activity checks",
      "If you received a Colony Slot, please check your Admin Message",
    ]},
    { type: "p", text: "If you received fewer slots than expected, it means your invited crew's activity has not fully met the criteria yet." },
  ],
  update: [
    { type: "p", text: "The tide's in — Ol' Crusty v2.0.23 is live for everyone." },
    { type: "section", emoji: "🛠️", heading: "What's new", items: [
      "Faster claw compass animation on the Mine screen",
      "Fixed a bug where Driftbox timers could freeze after a Rank up",
      "Wallet address validation now catches more typo patterns before you save",
      "Small performance improvements across Haul and History",
    ]},
    { type: "p", text: "As always, thank you for building this colony with us." },
  ],
  meetupLive: [
    { type: "p", text: "We're live right now! 🔴" },
    { type: "p", text: "The Lagos meetup stream has started — join us as we walk through the roadmap, answer community questions, and share what's coming for Ol' Crusty." },
    { type: "p", text: "Link is pinned in the Colony channel. See you in there." },
  ],
  meetupD1: [
    { type: "p", text: "One day to go 🦀" },
    { type: "p", text: "Tomorrow we go live on YouTube for the Lagos meetup — a full walkthrough of the ownership vertical, colony reward mechanics, and a live Q&A." },
    { type: "p", text: "Set a reminder so you don't miss it. Stream link drops in Notices the moment we go live." },
  ],
  wave1: [
    { type: "p", text: "Hello Ol' Crusty colony 🦀" },
    { type: "p", text: "Based on the August 13 snapshot, a total of 41 new Colony Slots were distributed in this wave." },
    { type: "section", emoji: "🎯", heading: "Colony Slot Criteria", items: [
      "Rank 5+ divers",
      "Invited crew must maintain genuine and consistent mining activity",
    ]},
    { type: "p", text: "Wave 2 is already scheduled — keep your crew active." },
  ],
  migrationProgress1: [
    { type: "p", text: "Hello, Ol' Crusty colony." },
    { type: "p", text: "CLAW migration to the live network is now underway. Mining and Haul continue to work as normal during this period." },
    { type: "p", text: "Pending balances shown in History will update automatically once migration completes for your account. No action is needed on your part." },
    { type: "p", text: "Thank you for your patience." },
  ],
  migrationProgress2: [
    { type: "p", text: "Hello, Ol' Crusty colony." },
    { type: "p", text: "An update on CLAW migration: verified balance snapshots have been re-synced across all colonies after a brief sync delay earlier this week." },
    { type: "p", text: "If your Total Mined amount looks different from before, it has been corrected to your accurate mined amount — nothing was lost." },
    { type: "p", text: "Thank you." },
  ],
};

function NoticeDetailScreen({ notice, onClose }) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-6 pb-2">
        <button onClick={onClose}><X size={22} color={COLORS.cream} /></button>
      </div>
      <div className="flex-1 overflow-y-auto px-5">
        <p className="font-body font-bold" style={{ fontSize: 13, color: COLORS.coral }}>{notice.cat}</p>
        <p className="font-body font-bold leading-snug mt-2" style={{ fontSize: 22, color: COLORS.cream }}>
          {notice.emoji} {notice.title}
        </p>
        <p className="font-body mt-2 mb-6" style={{ fontSize: 12, color: COLORS.muted }}>{notice.date}</p>

        {notice.body.map((block, i) => {
          if (block.type === "p") {
            return (
              <p key={i} className="font-body leading-relaxed mb-4" style={{ fontSize: 14, color: COLORS.cream }}>
                {block.text}
              </p>
            );
          }
          return (
            <div key={i} className="mb-4">
              <p className="font-body font-bold mb-2" style={{ fontSize: 14, color: COLORS.cream }}>
                {block.emoji} {block.heading}
              </p>
              {block.items.map((it, j) => (
                <div key={j} className="flex gap-2 mb-1">
                  <span style={{ color: COLORS.muted }}>▪</span>
                  <p className="font-body leading-relaxed" style={{ fontSize: 14, color: COLORS.cream }}>{it}</p>
                </div>
              ))}
            </div>
          );
        })}
        <div className="pb-8" />
      </div>
    </div>
  );
}

function NoticesScreen({ onBack }) {
  const [tab, setTab] = useState("All");
  const [selected, setSelected] = useState(null);
  const tabs = ["All", "Maintenance", "Event", "Announcement"];

  const notices = [
    { cat: "Event", isNew: true, emoji: "📣", title: "[Aug 2026 Wave 2] Colony Reward Update", date: "2026-08-28", body: NOTICE_BODY.wave2 },
    { cat: "Update", isNew: true, emoji: "🚀", title: "Ol' Crusty v2.0.23 Update Now Live", date: "2026-08-28", body: NOTICE_BODY.update },
    { cat: "Event", isNew: true, emoji: "🔴", title: "Lagos Meetup LIVE — The Link Is Here!", date: "2026-08-26", body: NOTICE_BODY.meetupLive },
    { cat: "Event", isNew: true, emoji: "📣", title: "Lagos Meetup D-1 — YouTube Live Stream", date: "2026-08-25", body: NOTICE_BODY.meetupD1 },
    { cat: "Event", isNew: false, emoji: "📣", title: "[Aug 2026 Wave 1] Colony Reward Update", date: "2026-08-14", body: NOTICE_BODY.wave1 },
    { cat: "Announcement", isNew: false, emoji: "📣", title: "CLAW Migration In Progress", date: "2026-08-10", body: NOTICE_BODY.migrationProgress1 },
    { cat: "Announcement", isNew: false, emoji: "📣", title: "CLAW Migration Progress Update", date: "2026-08-05", body: NOTICE_BODY.migrationProgress2 },
  ];

  if (selected) {
    return <NoticeDetailScreen notice={selected} onClose={() => setSelected(null)} />;
  }

  const visible = tab === "All" ? notices : notices.filter((n) => n.cat === tab);

  return (
    <div className="flex flex-col h-full">
      <BackHeader title="Notices" onBack={onBack} />
      <div className="flex gap-5 px-5 border-b" style={{ borderColor: COLORS.line }}>
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="pb-3 font-body font-bold relative"
            style={{ fontSize: 14, color: tab === t ? COLORS.coral : COLORS.muted }}
          >
            {t}
            {tab === t && <span className="absolute left-0 right-0 bottom-0 h-0.5" style={{ background: COLORS.coral }} />}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto px-5">
        {visible.map((n, i) => (
          <button
            key={i}
            onClick={() => setSelected(n)}
            className="w-full text-left py-4"
            style={{ borderBottom: `1px solid ${COLORS.line}` }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-body" style={{ fontSize: 12, color: COLORS.muted }}>{n.cat}</span>
              {n.isNew && <span className="font-body font-bold" style={{ fontSize: 12, color: COLORS.coral }}>new</span>}
            </div>
            <p className="font-body font-bold leading-snug" style={{ fontSize: 16, color: COLORS.cream }}>
              {n.emoji} {n.title}
            </p>
            <p className="font-body mt-1.5" style={{ fontSize: 12, color: COLORS.muted }}>{n.date}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function SupportCenterScreen({ onBack }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3" style={{ background: "#1A2A38" }}>
        <button onClick={onBack}><X size={20} color={COLORS.cream} /></button>
        <div className="text-center">
          <p className="font-body font-bold" style={{ fontSize: 14, color: COLORS.cream }}>Ol' Crusty Support</p>
          <p className="font-body" style={{ fontSize: 10, color: COLORS.muted }}>olcrusty.zendesk.com</p>
        </div>
        <div style={{ width: 20 }} />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="relative h-40 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1C1032, #0A1420)" }}>
          <span className="absolute top-4 left-6" style={{ fontSize: 20 }}>🦀</span>
          <span className="absolute top-6 right-8" style={{ fontSize: 18 }}>✨</span>
          <span className="absolute bottom-8 left-10" style={{ fontSize: 16 }}>🐚</span>
          <span className="absolute bottom-6 right-6" style={{ fontSize: 18 }}>💰</span>
          <p className="font-body tracking-widest" style={{ fontSize: 11, color: COLORS.muted }}>D O N ' T &nbsp; M I S S &nbsp; O U T !</p>
        </div>

        <div className="px-5 mt-5 space-y-3">
          <div className="rounded-xl p-4 text-center" style={{ border: `1px solid ${COLORS.coral}` }}>
            <p className="font-body font-bold" style={{ fontSize: 15, color: COLORS.coral }}>Frequently Asked Questions</p>
            <p className="font-body mt-1" style={{ fontSize: 12, color: COLORS.coral }}>Check common questions here first!</p>
          </div>
        </div>

        <div className="px-5 mt-6">
          <p className="font-display font-bold" style={{ fontSize: 20, color: COLORS.cream }}>Promoted articles</p>
          <div className="mt-3">
            {[
              "🔐 Ol' Crusty KYC Verification Guide",
              "When will CLAW be listed on exchanges?",
              "How do I change my withdrawal address?",
              "Why is my mining rate different from others?",
            ].map((a, i) => (
              <div key={i} className="py-3" style={{ borderBottom: `1px solid ${COLORS.line}` }}>
                <p className="font-body" style={{ fontSize: 14, color: "#B7A6FF" }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MyProfileScreen({ onBack }) {
  return (
    <div className="flex flex-col h-full">
      <BackHeader title="My Profile" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-5 pt-4">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center font-display font-bold"
              style={{ background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.gold})`, color: COLORS.bg, fontSize: 32 }}
            >
              O
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: COLORS.bg, border: `2px solid ${COLORS.panel}` }}>
              <span style={{ fontSize: 12 }}>📷</span>
            </div>
          </div>
        </div>

        <p className="font-body mb-2" style={{ fontSize: 13, color: COLORS.muted }}>Nickname</p>
        <div className="flex items-center gap-2 mb-6">
          <div className="flex-1 rounded-xl px-4 py-3" style={{ background: COLORS.panelAlt }}>
            <span className="font-body" style={{ fontSize: 14, color: COLORS.cream }}>Ol' Crusty</span>
          </div>
          <button className="px-4 py-3 rounded-xl font-body font-bold" style={{ fontSize: 13, background: COLORS.gold, color: COLORS.bg }}>Edit</button>
        </div>

        <p className="font-body mb-2" style={{ fontSize: 13, color: COLORS.muted }}>My Invitation Code</p>
        <div className="flex items-center justify-between rounded-xl px-4 py-3 mb-6" style={{ background: COLORS.panelAlt }}>
          <span className="font-body" style={{ fontSize: 14, color: COLORS.cream }}>olcrusty92</span>
          <Copy size={15} color={COLORS.muted} />
        </div>

        <p className="font-body mb-2" style={{ fontSize: 13, color: COLORS.muted }}>Email</p>
        <div className="rounded-xl px-4 py-3" style={{ background: COLORS.panelAlt }}>
          <span className="font-body" style={{ fontSize: 14, color: COLORS.cream }}>daddy.crab@gmail.com</span>
        </div>
      </div>
    </div>
  );
}

function NotifRow({ title, subtitle, on, onChange }) {
  return (
    <div className="flex items-start justify-between gap-3 py-4">
      <div className="pr-1 min-w-0 flex-1">
        <p className="font-body font-bold" style={{ fontSize: 15, color: COLORS.cream }}>{title}</p>
        <p className="font-body mt-1 leading-snug" style={{ fontSize: 12, color: COLORS.muted }}>{subtitle}</p>
      </div>
      <Toggle on={on} onChange={onChange} />
    </div>
  );
}

function NotificationsScreen({ onBack }) {
  const [state, setState] = useState({
    all: true,
    mining: true,
    attendance: true,
    chat: true,
    mentions: true,
    channelPosts: true,
    channelMentions: true,
    notices: true,
    events: true,
  });
  const flip = (key) => setState((s) => ({ ...s, [key]: !s[key] }));

  return (
    <div className="flex flex-col h-full">
      <BackHeader title="Notifications" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-5">
        <NotifRow title="All Notifications" subtitle="Manage all notifications at once" on={state.all} onChange={() => flip("all")} />

        <SectionLabel>Rewards</SectionLabel>
        <div className="h-px mb-1" style={{ background: COLORS.line }} />
        <NotifRow title="Mining Alert" subtitle="We'll notify you when your CLAW are ready to collect" on={state.mining} onChange={() => flip("mining")} />
        <NotifRow title="Attendance Alert" subtitle="We'll remind you not to miss your daily dredge" on={state.attendance} onChange={() => flip("attendance")} />

        <SectionLabel>Community</SectionLabel>
        <div className="h-px mb-1" style={{ background: COLORS.line }} />
        <NotifRow title="Chat Messages" subtitle="Don't miss important messages" on={state.chat} onChange={() => flip("chat")} />
        <NotifRow title="Chat Message Mentions" subtitle="We'll notify you whenever your conversation continues" on={state.mentions} onChange={() => flip("mentions")} />
        <NotifRow title="New Channel Posts" subtitle="Get the latest updates from your favorite channels" on={state.channelPosts} onChange={() => flip("channelPosts")} />
        <NotifRow title="Channel Chat Mentions" subtitle="Don't miss the chance to join active conversations" on={state.channelMentions} onChange={() => flip("channelMentions")} />

        <SectionLabel>Marketing &amp; Info</SectionLabel>
        <div className="h-px mb-1" style={{ background: COLORS.line }} />
        <NotifRow title="Notices" subtitle="Get important updates quickly" on={state.notices} onChange={() => flip("notices")} />
        <NotifRow title="Events" subtitle="Get early access to special events and offers" on={state.events} onChange={() => flip("events")} />
        <div className="pb-6" />
      </div>
    </div>
  );
}

function LanguageScreen({ onBack }) {
  const [selected, setSelected] = useState("English");
  const languages = ["English", "Français", "Español", "Português", "Kiswahili", "Yorùbá", "Hausa"];

  return (
    <div className="flex flex-col h-full">
      <BackHeader title="Menu Language" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-5 pt-2">
        {languages.map((lang, i) => (
          <button
            key={lang}
            onClick={() => setSelected(lang)}
            className="w-full flex items-center justify-between py-4"
            style={{ borderBottom: i < languages.length - 1 ? `1px solid ${COLORS.line}` : "none" }}
          >
            <span className="font-body" style={{ fontSize: 16, color: COLORS.cream }}>{lang}</span>
            {selected === lang && <Check size={18} color={COLORS.coral} strokeWidth={2.5} />}
          </button>
        ))}
      </div>
    </div>
  );
}

const LEGAL_CONTENT = {
  tos: [
    "Welcome to Ol' Crusty, part of the Omnexia Network ecosystem.",
    "Your use of Ol' Crusty is subject to these Terms of Service (the \"Terms\"). Thank you for taking the time to read them — we hope you enjoy building your colony with us.",
    "If you have questions about these Terms, you can reach us anytime through Settings → Support Center.",
    "Compliance with the Terms",
    "By using Ol' Crusty, you agree to be bound by this agreement between you and Omnexia Network.",
    "Eligibility",
    "You must be able to form a binding contract in your jurisdiction to use Ol' Crusty. Points earned through mining are not a token and carry no monetary value or conversion guarantee unless and until stated otherwise in an official update.",
    "Changes to These Terms",
    "We may update these Terms as the product evolves. Continued use of Ol' Crusty after an update means you accept the revised Terms.",
  ],
  privacy: [
    "This Privacy Policy explains what information Ol' Crusty collects and how it's used.",
    "Information We Collect",
    "Account details you provide (nickname, email), activity within the app (mining sessions, invites, missions completed), and technical information needed to keep the service running securely.",
    "How We Use Your Information",
    "To operate core features like mining, rewards, and the leaderboard; to prevent abuse of the invite and reward systems; and to communicate important updates about your account.",
    "What We Don't Do",
    "We don't sell your personal information to third parties.",
    "Your Choices",
    "You can review and update your profile information at any time from Settings, and you can request account deletion from the Delete Account screen.",
  ],
  community: [
    "These guidelines exist to keep the Ol' Crusty colony a place people actually want to be part of.",
    "Be Genuine",
    "Invite real people who are genuinely interested in the ecosystem. Fake accounts, bots, or coordinated invite abuse put your rewards and account at risk.",
    "Be Respectful",
    "Harassment, hate speech, and targeted abuse toward other members are not tolerated in Chat or Colony channels.",
    "No Market Manipulation",
    "Don't spread false claims about token pricing, listings, or timelines that Omnexia Network has not officially confirmed.",
    "Enforcement",
    "Violations may result in warnings, feature restrictions, or account suspension, depending on severity.",
  ],
};

function LegalDetailScreen({ title, paragraphs, onBack }) {
  return (
    <div className="flex flex-col h-full">
      <BackHeader title={title} onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-5 pt-4">
        {paragraphs.map((p, i) => {
          const isHeading = p.length < 40 && !p.endsWith(".") && !p.endsWith("!") && !p.endsWith("?");
          return isHeading ? (
            <p key={i} className="font-body font-bold mt-5 mb-2" style={{ fontSize: 14, color: COLORS.gold }}>{p}</p>
          ) : (
            <p key={i} className="font-body leading-relaxed mb-4" style={{ fontSize: 14, color: COLORS.cream }}>{p}</p>
          );
        })}
        <div className="pb-8" />
      </div>
    </div>
  );
}

function TermsRow({ title, subtitle, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-start justify-between gap-3 py-4">
      <div className="text-left min-w-0">
        <p className="font-body font-bold" style={{ fontSize: 16, color: COLORS.cream }}>{title}</p>
        <p className="font-body mt-1 leading-snug" style={{ fontSize: 13, color: COLORS.muted }}>{subtitle}</p>
      </div>
      <ChevronRight size={16} color={COLORS.muted} className="shrink-0 mt-1" />
    </button>
  );
}

function TermsScreen({ onBack }) {
  const [open, setOpen] = useState(null);

  if (open) {
    const map = {
      tos: { title: "Terms of Service", content: LEGAL_CONTENT.tos },
      privacy: { title: "Privacy Policy", content: LEGAL_CONTENT.privacy },
      community: { title: "Community Guidelines", content: LEGAL_CONTENT.community },
    };
    return <LegalDetailScreen title={map[open].title} paragraphs={map[open].content} onBack={() => setOpen(null)} />;
  }

  return (
    <div className="flex flex-col h-full">
      <BackHeader title="Terms & Policies" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-5 pt-2">
        <TermsRow title="Terms of Service" subtitle="Ol' Crusty Service Usage Rules" onClick={() => setOpen("tos")} />
        <TermsRow title="Privacy Policy" subtitle="Information on Collection and Use of Personal Data" onClick={() => setOpen("privacy")} />
        <TermsRow title="Community Guidelines" subtitle="Rules for Healthy Colony Operation" onClick={() => setOpen("community")} />
      </div>
    </div>
  );
}

function DeleteAccountScreen({ onBack, onProceed }) {
  return (
    <div className="flex flex-col h-full">
      <BackHeader title="Delete Account" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-5 pt-2">
        <p className="font-body" style={{ fontSize: 14, color: COLORS.muted }}>
          Your assets will be lost and cannot be recovered if you delete your account.
        </p>

        <h3 className="font-display font-bold mt-7 mb-3" style={{ fontSize: 18, color: COLORS.cream }}>Your Assets</h3>

        <div className="rounded-2xl px-4 py-4 mb-3 flex items-center justify-between" style={{ background: COLORS.panelAlt }}>
          <span className="font-body" style={{ fontSize: 14, color: COLORS.cream }}>CLAW</span>
          <span className="font-display font-bold" style={{ fontSize: 18, color: COLORS.cream }}>428.6</span>
        </div>

        <div className="rounded-2xl px-4 py-4 mb-5 flex items-center justify-between" style={{ background: COLORS.panelAlt }}>
          <span className="font-body" style={{ fontSize: 14, color: COLORS.cream }}>Credits</span>
          <span className="font-display font-bold" style={{ fontSize: 18, color: COLORS.cream }}>10</span>
        </div>

        <div className="rounded-2xl p-4" style={{ background: COLORS.panelAlt }}>
          {[
            "CLAW and Credits deleted after deactivation cannot be recovered.",
            "You will not be able to access your Ol' Crusty Wallet.",
            "Some records may be retained for legal or security reasons.",
          ].map((line, i) => (
            <div key={i} className="flex gap-2 py-1.5">
              <span style={{ color: COLORS.coral }}>•</span>
              <p className="font-body leading-snug" style={{ fontSize: 13, color: COLORS.coral }}>{line}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 pb-6 pt-3 flex gap-3">
        <button onClick={onBack} className="flex-1 py-3.5 rounded-2xl font-body font-bold" style={{ fontSize: 14, background: COLORS.panelAlt, color: COLORS.cream }}>
          Cancel
        </button>
        <button onClick={onProceed} className="flex-1 py-3.5 rounded-2xl font-body font-bold" style={{ fontSize: 14, background: COLORS.coral, color: COLORS.bg }}>
          Proceed
        </button>
      </div>
    </div>
  );
}

function BenefitTierChips({ claimed, pending }) {
  return (
    <div className="flex gap-3 justify-center my-4">
      {[claimed, pending].map((state, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <div
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-full font-body text-sm font-bold"
            style={{ background: state.active ? "#3D3466" : COLORS.panelAlt, color: state.active ? COLORS.cream : COLORS.muted }}
          >
            <span>🦀</span> {state.value}
          </div>
          <div className="w-9 h-9 rounded-full border flex items-center justify-center" style={{ borderColor: state.active ? COLORS.cream : COLORS.muted }}>
            <span style={{ fontSize: 15 }}>{i === 0 ? "🙂" : "😄"}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function InvitedFriendsScreen({ onBack, onInviteFriends }) {
  const friends = [
    { name: "sandbar_kx", rank: "Deckhand" },
    { name: "clawson", rank: "Hatchling" },
  ];

  return (
    <div className="flex flex-col h-full">
      <BackHeader title={`Invited Friends (${friends.length})`} onBack={onBack} />

      <div className="mx-5 mt-2 rounded-2xl p-4" style={{ background: "linear-gradient(135deg, #2A2154, #17233A)", border: `1px solid ${COLORS.line}` }}>
        <p className="font-body leading-relaxed" style={{ fontSize: 15, color: COLORS.cream }}>
          To activate the <span className="font-bold" style={{ color: COLORS.coral }}>farming boost</span>, invite <span className="font-bold" style={{ color: COLORS.gold }}>3</span> more friends.
        </p>
      </div>

      {friends.length > 0 ? (
        <div className="flex-1 overflow-y-auto px-5 mt-5">
          <div className="rounded-2xl overflow-hidden" style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}` }}>
            {friends.map((f, i) => (
              <div
                key={f.name}
                className="flex items-center justify-between px-4 py-3.5"
                style={{ borderBottom: i < friends.length - 1 ? `1px solid ${COLORS.line}` : "none" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: COLORS.panelAlt }}>
                    <span style={{ fontSize: 16 }}>🦀</span>
                  </div>
                  <span className="font-body text-sm" style={{ color: COLORS.cream }}>{f.name}</span>
                </div>
                <span
                  className="font-body font-bold px-2.5 py-1 rounded-full"
                  style={{ fontSize: 11, background: COLORS.panelAlt, color: COLORS.gold }}
                >
                  {f.rank}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={onInviteFriends}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-body font-bold mt-5"
            style={{ fontSize: 14, background: COLORS.coral, color: COLORS.bg }}
          >
            Invite More Friends
            <Share2 size={15} />
          </button>
          <div className="pb-6" />
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <div className="relative mb-4">
            <span className="absolute -top-8 -left-6" style={{ fontSize: 26, animation: "bob 3.6s ease-in-out infinite" }}>🪸</span>
            <span style={{ fontSize: 64 }}>🎁</span>
          </div>
          <p className="font-display font-bold mb-2" style={{ fontSize: 20, color: COLORS.cream }}>No invited friends</p>
          <p className="font-body text-center leading-relaxed mb-6" style={{ fontSize: 14, color: COLORS.muted }}>
            The more friends you invite, the more farming boost you get
          </p>
          <button
            onClick={onInviteFriends}
            className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-body font-bold"
            style={{ fontSize: 15, background: COLORS.coral, color: COLORS.bg }}
          >
            Invite Friends
            <Share2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

function InviteScreen({ onBack }) {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <BackHeader title="Invite Friends" onBack={onBack} />

      <div className="px-5 mt-2">
        <div className="rounded-2xl p-4 flex" style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}` }}>
          <div className="flex-1">
            <p className="font-body" style={{ color: COLORS.muted, fontSize: 11 }}>My Invitation ID</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="font-body text-sm font-bold" style={{ color: COLORS.cream }}>olcrusty92</span>
              <Copy size={12} color={COLORS.muted} />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-body" style={{ color: COLORS.muted, fontSize: 11 }}>Inviter's ID</p>
            <p className="font-body text-sm font-bold mt-1" style={{ color: COLORS.cream }}>reeftide</p>
          </div>
        </div>
      </div>

      <div className="px-6 mt-8 text-center">
        <p className="font-body text-xs font-bold tracking-wide" style={{ color: "#B7A6FF" }}>1st benefit</p>
        <p className="font-display text-3xl font-bold mt-2" style={{ color: COLORS.cream }}>🦀 +100 CLAW</p>
        <p className="font-body text-sm mt-2" style={{ color: COLORS.cream }}>Instant reward on your first invite</p>
        <span className="inline-block mt-3 px-3 py-1.5 rounded-full font-body text-xs" style={{ background: COLORS.panelAlt, color: COLORS.muted }}>
          Same as 42 mining sessions!
        </span>

        <BenefitTierChips
          claimed={{ value: "+100", active: true }}
          pending={{ value: "+100", active: true }}
        />
      </div>

      <div className="mx-5 my-2 h-px" style={{ background: COLORS.line }} />

      <div className="px-6 mt-4 text-center pb-4">
        <p className="font-body text-xs font-bold tracking-wide" style={{ color: "#B7A6FF" }}>2nd benefit</p>
        <p className="font-display text-3xl font-bold mt-2" style={{ color: COLORS.cream }}>🦀 +50 CLAW</p>
        <p className="font-body text-sm mt-2" style={{ color: COLORS.cream }}>Unlimited bonus for every invite after</p>
        <span className="inline-block mt-3 px-3 py-1.5 rounded-full font-body text-xs" style={{ background: COLORS.panelAlt, color: COLORS.muted }}>
          Same as 21 mining sessions!
        </span>

        <BenefitTierChips
          claimed={{ value: "+0", active: false }}
          pending={{ value: "+0", active: false }}
        />
      </div>

      <div className="px-5 pb-6 sticky bottom-0">
        <button className="w-full py-3.5 rounded-2xl font-body text-sm font-bold" style={{ background: COLORS.coral, color: COLORS.bg }}>
          Get 100 CLAW Now
        </button>
      </div>
    </div>
  );
}

function SettingsRow({ label, value, icon: Icon, showChevron = true, danger = false, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-between gap-3 px-4 py-4 text-left">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {Icon && <Icon size={16} color={danger ? COLORS.coral : COLORS.muted} className="shrink-0" />}
        <span
          className="font-body block truncate"
          style={{ fontSize: 14, color: danger ? COLORS.coral : COLORS.cream }}
        >
          {label}
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0" style={{ maxWidth: "45%" }}>
        {value && (
          <span className="font-body truncate" style={{ fontSize: 13, color: COLORS.muted }}>
            {value}
          </span>
        )}
        {showChevron && <ChevronRight size={15} color={COLORS.muted} className="shrink-0" />}
      </div>
    </button>
  );
}

function SectionLabel({ children }) {
  return <p className="font-body text-xs px-5 mb-2 mt-6" style={{ color: COLORS.muted }}>{children}</p>;
}

function Divider() {
  return <div className="mx-4 h-px" style={{ background: COLORS.line }} />;
}

function SettingsScreen({ onBack, onNotices, onSupport, onProfile, onNotifications, onLanguage, onTerms, onDeleteAccount, onLogOut }) {
  const [confirmLogout, setConfirmLogout] = useState(false);

  return (
    <div className="relative flex flex-col h-full">
      <BackHeader title="Settings" onBack={onBack} />

      <div className="flex-1 overflow-y-auto">
        <div className="px-5 mt-2 flex gap-3">
          <button onClick={onNotices} className="flex-1 relative rounded-2xl p-4 flex flex-col items-center gap-2" style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}` }}>
            <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full" style={{ background: COLORS.coral }} />
            <Megaphone size={20} color={COLORS.gold} />
            <span className="font-body text-sm font-bold" style={{ color: COLORS.cream }}>Notices</span>
          </button>
          <button onClick={onSupport} className="flex-1 rounded-2xl p-4 flex flex-col items-center gap-2" style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}` }}>
            <Headphones size={20} color={COLORS.seafoam} />
            <span className="font-body text-sm font-bold" style={{ color: COLORS.cream }}>Support Center</span>
          </button>
        </div>

        <SectionLabel>Settings</SectionLabel>
        <div className="mx-5 rounded-2xl overflow-hidden" style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}` }}>
          <SettingsRow label="My Profile" icon={User} onClick={onProfile} />
          <Divider />
          <SettingsRow label="Notifications" icon={Bell} onClick={onNotifications} />
        </div>

        <SectionLabel>Language Settings</SectionLabel>
        <div className="mx-5 rounded-2xl overflow-hidden" style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}` }}>
          <SettingsRow label="Language" value="English" onClick={onLanguage} />
        </div>

        <SectionLabel>More Settings</SectionLabel>
        <div className="mx-5 rounded-2xl overflow-hidden" style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}` }}>
          <SettingsRow label="Terms and Policies" icon={FileText} onClick={onTerms} />
          <Divider />
          <SettingsRow label="App Version" value="2.0.18" showChevron={false} />
          <Divider />
          <SettingsRow label="Log Out" icon={LogOut} onClick={() => setConfirmLogout(true)} />
        </div>

        <button onClick={onDeleteAccount} className="mx-auto mt-6 mb-8 font-body text-xs block" style={{ color: COLORS.muted }}>
          Delete Account
        </button>
      </div>

      {confirmLogout && (
        <div className="absolute inset-0 flex items-center justify-center px-8" style={{ background: "rgba(0,0,0,0.6)" }}>
          <div className="w-full rounded-2xl p-6 text-center" style={{ background: "#1C2B3A" }}>
            <p className="font-display font-bold leading-snug mb-5" style={{ fontSize: 19, color: COLORS.cream }}>
              Are you sure you want to log out?
            </p>
            <button
              onClick={onLogOut}
              className="w-full py-3 rounded-xl font-body font-bold mb-2.5"
              style={{ fontSize: 15, background: COLORS.coral, color: COLORS.bg }}
            >
              Log Out
            </button>
            <button
              onClick={() => setConfirmLogout(false)}
              className="w-full py-3 rounded-xl font-body font-bold"
              style={{ fontSize: 15, background: COLORS.panelAlt, color: COLORS.cream }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function GoogleG({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 3l6-6C34.5 5.5 29.5 3.5 24 3.5 12.7 3.5 3.5 12.7 3.5 24S12.7 44.5 24 44.5 44.5 35.3 44.5 24c0-1.2-.1-2.4-.3-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.1 8.1 3l6-6C34.5 5.5 29.5 3.5 24 3.5 16.3 3.5 9.6 7.9 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44.5c5.4 0 10.3-1.8 14.1-5l-6.5-5.5C29.5 35.6 26.9 36.5 24 36.5c-5.3 0-9.7-3.4-11.3-8.1l-6.6 5.1C9.5 40 16.2 44.5 24 44.5z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.5 5.5C41.4 36 44.5 30.5 44.5 24c0-1.2-.1-2.4-.3-3.5z"/>
    </svg>
  );
}

function SignUpScreen({ onComplete }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [referral, setReferral] = useState("");
  const [legalView, setLegalView] = useState(null); // "tos" | "privacy" | null

  const isValid = /\S+@\S+\.\S+/.test(email) && password.length >= 6;

  if (legalView) {
    const map = {
      tos: { title: "Terms of Service", content: LEGAL_CONTENT.tos },
      privacy: { title: "Privacy Policy", content: LEGAL_CONTENT.privacy },
    };
    return (
      <LegalDetailScreen
        title={map[legalView].title}
        paragraphs={map[legalView].content}
        onBack={() => setLegalView(null)}
      />
    );
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto px-6 pt-10 pb-8">
      <div className="flex justify-center mb-6">
        <span style={{ fontSize: 44 }}>🦀</span>
      </div>

      <h1 className="font-display font-bold mb-1" style={{ fontSize: 26, color: COLORS.cream }}>Sign Up</h1>
      <p className="font-body mb-7" style={{ fontSize: 13, color: COLORS.muted }}>
        Already have an account? <span style={{ color: COLORS.gold, fontWeight: 700 }}>Sign in</span>
      </p>

      <label className="font-body mb-1.5" style={{ fontSize: 12, color: COLORS.muted }}>Email Address</label>
      <div className="flex items-center gap-2.5 rounded-2xl px-4 py-3.5 mb-4" style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}` }}>
        <User size={16} color={COLORS.muted} />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="flex-1 bg-transparent outline-none font-body"
          style={{ color: COLORS.cream, fontSize: 14 }}
        />
      </div>

      <label className="font-body mb-1.5" style={{ fontSize: 12, color: COLORS.muted }}>Password</label>
      <div className="flex items-center gap-2.5 rounded-2xl px-4 py-3.5 mb-4" style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}` }}>
        <Lock size={16} color={COLORS.muted} />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          placeholder="At least 6 characters"
          className="flex-1 bg-transparent outline-none font-body"
          style={{ color: COLORS.cream, fontSize: 14 }}
        />
        <button onClick={() => setShowPassword((v) => !v)}>
          {showPassword ? <EyeOff size={16} color={COLORS.muted} /> : <Eye size={16} color={COLORS.muted} />}
        </button>
      </div>

      <label className="font-body mb-1.5" style={{ fontSize: 12, color: COLORS.muted }}>Referral Code</label>
      <div className="flex items-center gap-2.5 rounded-2xl px-4 py-3.5 mb-6" style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}` }}>
        <UserPlus size={16} color={COLORS.muted} />
        <input
          value={referral}
          onChange={(e) => setReferral(e.target.value)}
          placeholder="Referral code (optional)"
          className="flex-1 bg-transparent outline-none font-body"
          style={{ color: COLORS.cream, fontSize: 14 }}
        />
      </div>

      <button
        onClick={onComplete}
        disabled={!isValid}
        className="w-full py-4 rounded-2xl font-body font-bold"
        style={{ fontSize: 15, background: isValid ? COLORS.gold : COLORS.panelAlt, color: isValid ? COLORS.bg : COLORS.muted }}
      >
        Sign Up
      </button>

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px" style={{ background: COLORS.line }} />
        <span className="font-body" style={{ fontSize: 12, color: COLORS.muted }}>or</span>
        <div className="flex-1 h-px" style={{ background: COLORS.line }} />
      </div>

      <p className="font-body text-center mb-4" style={{ fontSize: 12, color: COLORS.muted }}>
        Join With Your Favourite Social Media Account
      </p>
      <div className="flex justify-center">
        <button
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}` }}
        >
          <GoogleG size={20} />
        </button>
      </div>

      <p className="font-body text-center mt-8" style={{ fontSize: 11, color: COLORS.muted, lineHeight: 1.6 }}>
        By signing up with an account, you agree to Ol' Crusty's<br />
        <button onClick={() => setLegalView("tos")} style={{ color: COLORS.gold, fontWeight: 600 }}>Terms of Service</button>
        {" "}and{" "}
        <button onClick={() => setLegalView("privacy")} style={{ color: COLORS.gold, fontWeight: 600 }}>Privacy Policy</button>.
      </p>
    </div>
  );
}

export default function OlCrustyApp() {
  const [onboarded, setOnboarded] = useState(false);
  const [active, setActive] = useState("mine");
  const [overlay, setOverlay] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [tokens, setTokens] = useState(0);

  const handleSaveAddress = (addr) => {
    setWalletAddress(addr);
    setOverlay(null);
  };

  if (!onboarded) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center" style={{ background: "#000" }}>
        <FontLoader />
        <div
          className="relative w-full font-body"
          style={{ maxWidth: 390, height: 780, background: COLORS.bg, overflow: "hidden", borderRadius: 32, border: "8px solid #000" }}
        >
          <SignUpScreen onComplete={() => setOnboarded(true)} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center" style={{ background: "#000" }}>
      <FontLoader />
      <div
        className="relative w-full font-body"
        style={{ maxWidth: 390, height: 780, background: COLORS.bg, overflow: "hidden", borderRadius: 32, border: "8px solid #000" }}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-hidden">
            {overlay === "invite" && <InviteScreen onBack={() => setOverlay(null)} />}
            {overlay === "invited-friends" && (
              <InvitedFriendsScreen
                onBack={() => setOverlay(null)}
                onInviteFriends={() => setOverlay("invite")}
              />
            )}
            {overlay === "settings" && (
              <SettingsScreen
                onBack={() => setOverlay(null)}
                onNotices={() => setOverlay("notices")}
                onSupport={() => setOverlay("support")}
                onProfile={() => setOverlay("profile")}
                onNotifications={() => setOverlay("notifications")}
                onLanguage={() => setOverlay("language")}
                onTerms={() => setOverlay("terms")}
                onDeleteAccount={() => setOverlay("delete-account")}
                onLogOut={() => { setActive("mine"); setOverlay(null); setOnboarded(false); }}
              />
            )}
            {overlay === "notices" && <NoticesScreen onBack={() => setOverlay("settings")} />}
            {overlay === "support" && <SupportCenterScreen onBack={() => setOverlay("settings")} />}
            {overlay === "profile" && <MyProfileScreen onBack={() => setOverlay("settings")} />}
            {overlay === "notifications" && <NotificationsScreen onBack={() => setOverlay("settings")} />}
            {overlay === "language" && <LanguageScreen onBack={() => setOverlay("settings")} />}
            {overlay === "terms" && <TermsScreen onBack={() => setOverlay("settings")} />}
            {overlay === "delete-account" && (
              <DeleteAccountScreen
                onBack={() => setOverlay("settings")}
                onProceed={() => { setActive("mine"); setOverlay(null); setOnboarded(false); }}
              />
            )}
            {overlay === "wallet-address" && (
              <AddWalletScreen
                onBack={() => setOverlay(null)}
                onSave={handleSaveAddress}
                existingAddress={walletAddress}
              />
            )}
            {overlay === "history" && <HistoryScreen onBack={() => setOverlay(null)} />}
            {!overlay && active === "mine" && (
              <MiningScreen
                onInvite={() => setOverlay("invite")}
                onSettings={() => setOverlay("settings")}
                onHistory={() => setOverlay("history")}
                onInvitedFriends={() => setOverlay("invited-friends")}
                tokens={tokens}
                onEarnToken={() => setTokens((t) => t + 1)}
                onSpendToken={() => setTokens((t) => Math.max(0, t - 1))}
              />
            )}
            {overlay === "leaderboard" && <LeaderboardScreen onBack={() => setOverlay(null)} />}
            {!overlay && active === "haul" && (
              <HaulScreen
                onOpenLeaderboard={() => setOverlay("leaderboard")}
                tokens={tokens}
                onGoToFarm={() => setActive("mine")}
              />
            )}
            {!overlay && active === "wallet" && (
              <WalletScreen
                walletAddress={walletAddress}
                onAddAddress={() => setOverlay("wallet-address")}
                onChangeAddress={() => setOverlay("wallet-address")}
              />
            )}
          </div>
          {!overlay && <BottomNav active={active} setActive={setActive} />}
        </div>
      </div>
    </div>
  );
}
