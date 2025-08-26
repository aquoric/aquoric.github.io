import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Disc,
  Terminal,
  Box,
  Code,
  Cpu,
  Globe,
  Mail,
  Volume2,
  VolumeX,
  Link as LinkIcon,
} from "lucide-react";

// --- Components ---

// --- SkillCard with dropdown ---
function SkillCard({ title, details }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <GlowCard
        className="cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        {title}
      </GlowCard>
      {open && (
        <div className="absolute left-0 mt-2 w-56 rounded-xl border border-white/20 bg-black/70 backdrop-blur-md p-3 shadow-lg z-10">
          <p className="text-sm text-zinc-300">{details}</p>
        </div>
      )}
    </div>
  );
}


function Divider() {
  return (
    <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
  );
}

function NeonBadge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs tracking-wide text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.25)]">
      <Disc className="h-3.5 w-3.5 animate-spin-slow" />
      {children}
    </span>
  );
}

function GlowCard({ children, className = "" }) {
  return (
    <div
      className={`group rounded-2xl border border-white/20 bg-white/5 p-5 backdrop-blur-lg
      bg-gradient-to-br from-white/10 to-cyan-500/5 shadow-[0_0_40px_rgba(34,211,238,0.15)]
      transition-all duration-300 hover:border-cyan-400/60 hover:shadow-[0_0_60px_rgba(34,211,238,0.3)] ${className}`}
    >
      {children}
    </div>
  );
}

// --- Snow/Rain Effect ---
function Snowfall() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-70 animate-fall"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${5 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}

// --- Main Component ---

export default function AquoricPortfolio() {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [entered, setEntered] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const [audioSourceIndex, setAudioSourceIndex] = useState(0);

  const audioSources = [
    "https://archive.org/download/tek-itswowed/%F0%9D%99%A9%F0%9D%99%9A%F0%9D%99%A0%20%F0%9D%99%9E%F0%9D%99%A9%20-%20%F0%9D%99%98%F0%9D%99%96%F0%9D%99%9B%F0%9D%99%AA%F0%9D%99%A3%F0%9D%99%9A%20_%20%F0%9D%99%A8%F0%9D%99%A1%F0%9D%99%A4%F0%9D%99%AC%F0%9D%99%9A%F0%9D%99%99%20_%20-%20%F0%9D%98%B4%F0%9D%98%B1%F0%9D%98%A9%F0%9D%98%AA%F0%9D%98%AF%F0%9D%98%B9%F0%9D%98%B0%20-%20SoundLoadMate.com.mp3",
    "https://archive.org/details/tek-itswowed", // Fallback audio source
  ];

  // Preload silently on mount
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.src = audioSources && audioSources.length > audioSourceIndex ? audioSources[audioSourceIndex] : "";
      audio.muted = true;
      audio.load();
      audio.play().catch(() => {
        // ignore autoplay block
      });
    }
  }, [audioSourceIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && entered && !muted) {
      audio.play().catch(e => {
        console.error("Audio playback error after source change:", e);
        setAudioError("Could not play the new audio source. Check URL.");
      });
    }
  }, [audioSourceIndex, entered, muted]);

  const handleEnter = async () => {
    setEntered(true);
    const audio = audioRef.current;
    if (audio) {
      audio.muted = false;
      try {
        await audio.play();
        setMuted(false);
        setAudioError(null);
      } catch (e) {
        console.warn("Initial audio playback failed:", e);
        setAudioError("Failed to play audio. Trying fallback source...");
        switchAudioSource();
      }
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
    if (!audio.muted) {
      audio.play().catch((e) => {
        console.warn("Audio playback failed on unmute:", e);
        setAudioError("Failed to play audio. Please try again.");
      });
    }
  };

  const switchAudioSource = () => {
    const audio = audioRef.current;
    const nextIndex = audioSourceIndex + 1;
    if (audio && nextIndex < audioSources.length) {
      setAudioSourceIndex(nextIndex);
    } else {
      setAudioError("All audio sources failed. Please check network or source URLs.");
    }
  };

  const projects = [
    {
      title: "aquo's ssing-tool",
      description: "Python-based anticheat tool for minecraft",
      link: "#",
      icon: <Terminal className="h-5 w-5" />,
    },
    {
      title: "Project Two",
      description: "Another fantastic project with a different purpose.",
      link: "#",
      icon: <Box className="h-5 w-5" />,
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/aquoric",
      icon: <Github className="h-5 w-5" />,
    },
    {
      name: "Discord",
      url: "https://discord.com/users/809764498797756417",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      name: "Email",
      url: "mailto:you@example.com",
      icon: <Mail className="h-5 w-5" />,
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden text-zinc-100">
      {/* Black fallback background behind the image */}
      <div className="fixed inset-0 -z-30 h-screen w-screen bg-zinc-950" aria-hidden />

      {/* Background image layer */}
      <div
        className="fixed inset-0 -z-20 h-screen w-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://i.pinimg.com/736x/b1/5e/f0/b15ef0cb1cdee8c551b411cf8f82a56f.jpg')`,
          opacity: 0.25,
        }}
        aria-hidden
      />

      {/* Snowfall effect */}
      <Snowfall />

      <audio
        ref={audioRef}
        preload="auto"
        loop
        playsInline
        onError={(e) => {
          console.error("Audio loading error:", e);
          setAudioError("Audio file could not be loaded. Trying fallback source...");
          switchAudioSource();
        }}
      />

      {!entered && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/60">
          <button
            onClick={handleEnter}
            className="px-6 py-3 text-lg font-semibold text-white rounded-2xl
            bg-gradient-to-br from-white/10 to-cyan-500/10 backdrop-blur-lg
            border border-white/20 shadow-[0_0_30px_rgba(34,211,238,0.2)]
            hover:bg-gradient-to-br hover:from-cyan-400/20 hover:to-cyan-600/20
            hover:border-cyan-400/60 hover:shadow-[0_0_50px_rgba(34,211,238,0.4)]
            transition-all duration-300"
          >
            click to enter...
          </button>
        </div>
      )}

      {entered && (
        <>
          <div className="fixed right-4 top-4 z-40 flex items-center gap-2">
            <GlowCard className="flex items-center gap-3 p-2">
              <button
                onClick={toggleMute}
                className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-lg
                bg-gradient-to-br from-white/10 to-cyan-500/5 p-2
                hover:border-cyan-400/60 hover:bg-gradient-to-br hover:from-cyan-400/20 hover:to-cyan-600/20"
              >
                {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
            </GlowCard>
          </div>

          {audioError && (
            <div className="fixed top-16 right-4 z-50 p-3 text-sm text-red-300 bg-red-900/20 rounded-lg">
              {audioError}
            </div>
          )}

          <main className="relative mx-auto max-w-6xl px-5 pb-24 pt-24 md:pt-28">
            <section id="top" className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div>
                  <NeonBadge>tek it • cafune</NeonBadge>
                  <div className="mt-4 flex items-center gap-4">
                    <img
                      src="https://cdn.discordapp.com/avatars/809764498797756417/e53f395c4d25f6e54b44d86a13f33d36?size=1024"
                      alt="aquoric_ profile"
                      className="h-16 w-16 rounded-full border border-white/20 bg-gradient-to-br from-white/10 to-cyan-500/10
                      shadow-[0_0_20px_rgba(34,211,238,0.3)] object-cover"
                    />
                    <h1 className="text-4xl font-black tracking-tight text-white drop-shadow md:text-6xl">
                      aquoric_<span className="text-cyan-400">_</span>
                    </h1>
                  </div>
                  <p className="mt-3 max-w-xl text-zinc-300">
                    Dev • Minecraft Skripts & Plugins • Servers • Python • C++ •
                    HTML. <br></br>
                    im js tuff in general 🤷‍♂️
                  </p>
                </div>
              </motion.div>
            </section>

            <Divider />

            <section id="about" className="mb-16 pt-12">
              <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">
                About Me
              </h2>
              <p className="max-w-3xl text-zinc-300">
                I’m <span className="text-white">aquoric_</span>, a developer
                who blends game-server engineering with clean tooling.
              </p>
            </section>

            <Divider />

              <section id="skills" className="mb-12 pt-12">
                <h2 className="mb-6 text-2xl font-semibold tracking-tight text-white">
                  Skills
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <SkillCard title="Minecraft Skripts" details="Experience creating automation and custom server features with Skript." />
                  <SkillCard title="Minecraft Servers" details="Setup, optimize, and manage multiplayer servers." />
                  <SkillCard title="Minecraft Plugins" details="Developed plugins in Java for advanced gameplay mechanics." />
                  <SkillCard title="Python" details="Built tools, scripts, and automation projects." />
                  <SkillCard title="C++" details="Worked on performance-heavy applications and systems programming." />
                  <SkillCard title="HTML" details="Created responsive front-ends and web layouts." />
                </div>
              </section>


            <Divider />

            <section id="projects" className="mb-12 pt-12">
              <h2 className="mb-6 text-2xl font-semibold tracking-tight text-white">
                Projects
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {projects.map((project, index) => (
                  <GlowCard key={index} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      {project.icon}
                      <h3 className="text-lg font-bold text-white">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-300">
                      {project.description}
                    </p>
                    <a
                      href={project.link}
                      className="mt-2 inline-flex items-center gap-1 text-sm text-cyan-400 hover:underline"
                    >
                      View Project <LinkIcon className="h-4 w-4" />
                    </a>
                  </GlowCard>
                ))}
              </div>
            </section>

            <Divider />

            <section id="contact" className="pt-12">
              <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">
                Contact
              </h2>
              <div className="flex flex-wrap items-center gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-white transition-colors hover:border-cyan-400/60 hover:text-cyan-400"
                  >
                    {link.icon}
                    {link.name}
                  </a>
                ))}
              </div>
            </section>
          </main>

          <footer className="relative mx-auto max-w-6xl px-5 pb-10">
            <Divider />
            <p className="mt-6 text-xs text-zinc-400">
              © {new Date().getFullYear()} aquoric_ • Built with React + Tailwind
            </p>
          </footer>
        </>
      )}

      <style>{`
        .animate-spin-slow { animation: spin 6s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes fall { to { transform: translateY(100vh); opacity: 0; } }
        .animate-fall { animation-name: fall; animation-timing-function: linear; animation-iteration-count: infinite; }
      `}</style>
    </div>
  );
}
