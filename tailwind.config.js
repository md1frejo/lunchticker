/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {
	  fontFamily: {
              grace: ["'Covered By Your Grace'", "cursive"],
	      merienda: ["'Merienda SC'", "cursive"],
	      meriendac: ["'Merienda'", "cursive"],
              madi: ["'Ms Madi'", "cursive"],
              gochi: ["'Gochi Hand'", "cursive"],
              playwrite: ["'Playwrite Australia Tasmania'", "cursive"],
              rancho: ["'Rancho'", "cursive"],
              schoolbell: ["'Schoolbell'", "cursive"],
              comingsoon: ["'Coming Soon'", "cursive"],
              bubblegum: ["'Bubblegum Sans'", "cursive"],
              // You can also keep your earlier ones if you want:
              amatic: ["'Amatic SC'", "cursive"],
              badscript: ["'Bad Script'", "cursive"],
              gloria: ["'Gloria Hallelujah'", "cursive"],
              indie: ["'Indie Flower'", "cursive"],
              pangolin: ["'Pangolin'", "cursive"],
	      roboto: ["'Roboto'", "sans-serif"],  // clean UI fallback
	  },
	  fontWeight: {
	      thin: 100,
	      extraLight: 200,
	      light: 300,
	      normal: 400,
	      medium: 500,
	      semibold: 600,
	      bold1: 100,
	      bold2: 600,
	      extrabold: 800,
	      black: 900,
	  },
	  colors: {
	      green4g: {
		  100: "#008b00",
		  200: "#199619",
		  300: "#32a232",
		  400: "#4cad4c",
		  500: "#66b966",
		  600: "#7fc47f",
		  700: "#99d099",
		  800: "#b2dcb2",
		  900: "#cce7cc",
		  1000: "#e5f3e5",
	      },
	      red4g: {
		  100: "#8b0000",
		  200: "#961919",
		  300: "#a23232",
		  400: "#ad4c4c",
		  500: "#b96666",
		  600: "#c47f7f",
		  700: "#d09999",
		  800: "#dcb2b2",
		  900: "#e7cccc",
		  1000: "#f3e5e5",
	      },
	      WhiteSmokeg: {
		  100: "#f5f5f5",
		  200: "#f6f6f6",
		  300: "#f7f7f7",
		  400: "#f8f8f8",
		  500: "#f9f9f9",
		  600: "#fafafa",
		  700: "#fbfbfb",
		  800: "#fcfcfc",
		  900: "#fdfdfd",
		  1000: "#fefefe",
	      },
	      SkyBlueg: {
		  100: "#87ceeb",
		  200: "#93d2ec",
		  300: "#9fd7ef",
		  400: "#abdcf1",
		  500: "#b7e1f3",
		  600: "#c3e6f4",
		  700: "#cfebf7",
		  800: "#dbf0f9",
		  900: "#e7f5fb",
		  1000: "#f3fafd",
	      },
	      blue3g: {
		  100: "#0000cd",
		  200: "#1919d2",
		  300: "#3232d7",
		  400: "#4c4cdc",
		  500: "#6666e1",
		  600: "#7f7fe6",
		  700: "#9999eb",
		  800: "#b2b2f0",
		  900: "#ccccf5",
		  1000: "#e5e5fa",
	      },
	      cyang: {
		  100: "#00ffff",
		  200: "#19ffff",
		  300: "#32ffff",
		  400: "#4cffff",
		  500: "#66ffff",
		  600: "#7fffff",
		  700: "#99ffff",
		  800: "#b2ffff",
		  900: "#ccffff",
		  1000: "#e5ffff",
	      },
	      brown4g: {
		  100: "#8b2323",
		  200: "#963838",
		  300: "#a24e4e",
		  400: "#ad6565",
		  500: "#b97b7b",
		  600: "#c49191",
		  700: "#d0a7a7",
		  800: "#dcbdbd",
		  900: "#e7d3d3",
		  1000: "#f3e9e9",
	      },
	  },
	  fontSize: {
	      'tp1': ['60pt', { lineHeight: '1.2', fontWeight: '100', letterSpacing: '0em' }],
	      'tp2': ['25pt', { lineHeight: '1.2', fontWeight: '100', letterSpacing: '0em' }],
	      'he1': ['40pt', { lineHeight: '1.2', fontWeight: '100', letterSpacing: '0em' }],
	      'ra1': ['40pt', { lineHeight: '1.2', fontWeight: '100', letterSpacing: '0em' }],
	      'hw2': ['25pt', { lineHeight: '1.2', fontWeight: '100', letterSpacing: '0em' }],
	      'gm1': ['40pt', { lineHeight: '1.2', fontWeight: '100', letterSpacing: '0em' }],
	      'gm2': ['30pt', { lineHeight: '1.2', fontWeight: '100', letterSpacing: '0em' }],
	      'gm3': ['20pt', { lineHeight: '1.2', fontWeight: '100', letterSpacing: '0em' }],
	  },
      },
  },
    plugins: [require("daisyui")],
    daisyui: {
	themes: [
	    {
		mytheme: {
		    "primary": "#4ade80",      // lime green
		    "secondary": "#facc15",    // yellow
		    "accent": "#38bdf8",       // sky blue
		    "neutral": "#1f2937",      // gray-800
		    "base-100": "#ffffff",     // background
		    "info": "#3abff8",
		    "success": "#36d399",
		    "warning": "#fbbd23",
		    "error": "#f87272",
		    "--btn-text-case": "none",
		    "--rounded-box": "1rem",
		    "--rounded-btn": "1rem",
		    "--animation-btn": "0.25s",
		    "--btn-font-family": "'Covered By Your Grace', cursive",
		},
	    },
	    "dark", // include built-in themes too
	],
	darkTheme: "dark", // default dark theme
	base: true,        // add background color & text color to <body>
	styled: true,      // include DaisyUI's prebuilt component styles
	utils: true,       // include utility classes like `btn`, `card`, etc.
	rtl: false,        // enable right-to-left support
	prefix: "",        // optionally prefix DaisyUI classes
	logs: true,        // log DaisyUI version in console
    },
}

