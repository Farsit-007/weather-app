/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#13223f",
          soft: "#3d4f73",
        },
        sky: {
          DEFAULT: "#2f7cf6",
          deep: "#1d5fd1",
          soft: "#eaf3ff",
          light: "#c8dcf8",
          deep2: "#174db3",
          mid: "#3d8bfa",
          tint: "#d9eaff",
        },
        orange: {
          DEFAULT: "#f59e0b",
          deep: "#d97706",
        },
        slate: {
          DEFAULT: "#5b6b85",
          light: "#8fa0b8",
        },
        line: "#e6edf7",
        danger: "#dc2626",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: "24px",
      },
      boxShadow: {
        'sm-soft': "0 6px 16px rgba(30, 60, 114, 0.08)",
        'md-soft': "0 16px 38px rgba(30, 60, 114, 0.14)",
        'lg-soft': "0 30px 70px rgba(23, 47, 90, 0.2)",
        'btn-primary': "0 14px 30px rgba(47, 124, 246, 0.38), inset 0 1px 0 rgba(255, 255, 255, 0.25)",
        'btn-primary-hover': "0 18px 36px rgba(47, 124, 246, 0.45)",
        'modal-icon': "0 12px 24px rgba(47, 124, 246, 0.35)",
        'focus-sky': "0 0 0 4px rgba(47, 124, 246, 0.12)",
      },
      backgroundImage: {
        'body-radial':
          "radial-gradient(1000px 460px at 85% -10%, #d9eaff 0%, transparent 60%), radial-gradient(800px 420px at -8% 25%, #e0ecff 0%, transparent 52%), radial-gradient(900px 480px at 110% 105%, #fdf0cf 0%, transparent 55%), #f8fbff",
        'btn-primary': "linear-gradient(135deg, #3d8bfa 0%, #1d5fd1 100%)",
        'btn-primary-hover': "linear-gradient(135deg, #1d5fd1, #174db3)",
        'hero-accent':
          "linear-gradient(135deg, #2f7cf6 0%, #7cb3ff 70%, #93c5fd 100%)",
        'modal-icon': "linear-gradient(135deg, #3d8bfa, #1d5fd1)",
        'rec-hot': "linear-gradient(135deg, #fff7ed, #ffedd5)",
        'rec-warm': "linear-gradient(135deg, #fff7ed, #fed7aa)",
        'rec-cold': "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
        'rec-sunny': "linear-gradient(135deg, #fffbeb, #fef3c7)",
        'rec-rain': "linear-gradient(135deg, #eff6ff, #dbeafe)",
        'rec-snow': "linear-gradient(135deg, #eef2ff, #e0e7ff)",
        'rec-fog': "linear-gradient(135deg, #f8fafc, #e2e8f0)",
        'rec-cloudy': "linear-gradient(135deg, #f8fafc, #e2e8f0)",
        'rec-pleasant': "linear-gradient(135deg, #f0fdf4, #dcfce7)",
      },
      letterSpacing: {
        tightish: "-0.045em",
        tightx: "-0.05em",
        tight4: "-0.04em",
        wideish: "0.01em",
        widelabel: "0.14em",
        widelabel2: "0.12em",
        widelabel3: "0.1em",
        widebadge: "0.08em",
      },
    },
  },
  plugins: [],
};
