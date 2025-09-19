import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      semanticTokens: {
        colors: {
          // Background colors
          bg: {
            DEFAULT: {
              value: { base: "{colors.gray.100}", _dark: "{colors.gray.900}" },
            },
            surface: {
              value: { base: "{colors.white}", _dark: "{colors.gray.800}" },
            },
          },

          // Text colors
          text: {
            DEFAULT: {
              value: { base: "{colors.black}", _dark: "{colors.white}" },
            },
            secondary: {
              value: { base: "{colors.gray.600}", _dark: "{colors.gray.300}" },
            },
            muted: {
              value: { base: "{colors.gray.500}", _dark: "{colors.gray.400}" },
            },
          },

          // Progress bar colors
          progress: {
            bg: {
              value: { base: "{colors.gray.300}", _dark: "{colors.gray.700}" },
            },
            fill: {
              value: { base: "{colors.blue.400}", _dark: "{colors.blue.400}" },
            },
            tick: {
              value: { base: "{colors.gray.500}", _dark: "{colors.gray.400}" },
            },
          },

          // Control button colors
          control: {
            bg: {
              value: { base: "{colors.gray.400}", _dark: "{colors.gray.600}" },
            },
            hover: {
              value: { base: "{colors.gray.500}", _dark: "{colors.gray.500}" },
            },
            text: {
              DEFAULT: {
                value: { base: "{colors.white}", _dark: "{colors.white}" },
              },
              inverted: {
                value: { base: "{colors.black}", _dark: "{colors.white}" },
              },
            },
          },

          // Game complete section
          complete: {
            bg: {
              value: { base: "{colors.blue.100}", _dark: "{colors.blue.900}" },
            },
            text: {
              value: { base: "{colors.black}", _dark: "{colors.white}" },
            },
          },

          // Debug section
          debug: {
            bg: {
              value: { base: "{colors.gray.200}", _dark: "{colors.gray.700}" },
            },
            text: {
              value: { base: "{colors.black}", _dark: "{colors.gray.300}" },
            },
          },

          // Stats cards
          stats: {
            card: {
              bg: {
                value: {
                  base: "{colors.white}",
                  _dark: "{colors.gray.800}",
                },
              },
              text: {
                value: {
                  base: "{colors.gray.900}",
                  _dark: "{colors.gray.100}",
                },
              },
              border: {
                value: {
                  base: "{colors.gray.200}",
                  _dark: "{colors.gray.700}",
                },
              },
            },
            score: {
              datum: {
                value: {
                  base: "{colors.cyan.500}",
                  _dark: "{colors.cyan.400}",
                },
              },
              trendline: {
                value: {
                  base: "{colors.cyan.800}",
                  _dark: "{colors.cyan.200}",
                },
              },
            },
            duration: {
              datum: {
                value: {
                  base: "{colors.gray.400}",
                  _dark: "{colors.gray.500}",
                },
              },
            },
          },

          // Button variants
          button: {
            primary: {
              bg: {
                value: {
                  base: "{colors.blue.500}",
                  _dark: "{colors.blue.600}",
                },
              },
              hover: {
                value: {
                  base: "{colors.blue.600}",
                  _dark: "{colors.blue.700}",
                },
              },
              text: {
                value: "{colors.white}",
              },
              border: {
                value: {
                  base: "{colors.transparent}",
                  _dark: "{colors.transparent}",
                },
              },
            },
            secondary: {
              bg: {
                value: { base: "{colors.white}", _dark: "{colors.gray.800}" },
              },
              hover: {
                value: { base: "{colors.gray.50}", _dark: "{colors.gray.700}" },
              },
              text: {
                value: {
                  base: "{colors.gray.700}",
                  _dark: "{colors.gray.300}",
                },
              },
              border: {
                value: {
                  base: "transparent",
                  _dark: "transparent",
                },
              },
            },
            danger: {
              bg: {
                value: { base: "{colors.white}", _dark: "{colors.gray.800}" },
              },
              hover: {
                DEFAULT: {
                  value: { base: "{colors.red.50}", _dark: "{colors.red.900}" },
                },
                text: {
                  value: {
                    base: "{colors.red.500}",
                    _dark: "{colors.red.400}",
                  },
                },
              },
              text: {
                value: "{colors.red.500}",
              },
              border: {
                value: "{colors.red.500}",
              },
            },
            disabled: {
              bg: {
                value: {
                  base: "{colors.gray.200}",
                  _dark: "{colors.gray.800}",
                },
              },
              hover: {
                value: {
                  base: "{colors.gray.200}",
                  _dark: "{colors.gray.800}",
                },
              },
              text: {
                value: {
                  base: "{colors.gray.400}",
                  _dark: "{colors.gray.600}",
                },
              },
              border: {
                value: {
                  base: "{colors.gray.200}",
                  _dark: "{colors.gray.800}",
                },
              },
            },
          },
        },
      },
    },
  },

  // Global CSS
  globalCss: {
    html: {
      colorScheme: "light",
      _dark: {
        colorScheme: "dark",
      },
    },
    body: {
      bg: "bg",
      color: "text",
      transition: "background-color 0.3s ease, color 0.3s ease",
    },
  },

  // Conditions for dark mode
  conditions: {
    extend: {
      dark: ".dark &, [data-theme=dark] &",
      light: ".light &, [data-theme=light] &",
    },
  },

  // The output directory for your css system
  outdir: "src/styles",

  // Enable JSX
  jsxFramework: "react",
});
