// TODO: replace the placeholder prose below with your own writing.
// The structure and metadata (slug, role, timeframe, stack, links) are what
// the pages depend on. Adding a project = adding one object to this array.

export const projects = [
  {
    slug: 'setpiece',
    title: 'Setpiece',
    tagline: 'AI-generated football player-prop picks for the 2026 World Cup.',
    role: 'Founder',
    timeframe: '2025 – 2026',
    stack: ['Next.js', 'TypeScript', 'Python'],
    links: {
      live: 'https://setpiece.example.com',
      repo: '',
    },
    sections: [
      {
        heading: 'What it does',
        body: [
          'Setpiece is a consumer product that turns match data into a short daily list of player-prop picks: shots on target, tackles, passes, cards. It is built around the 2026 World Cup, where a compressed schedule and unfamiliar matchups make the usual gut-feel approach unreliable.',
          'Users open the app, see the picks for the day with a confidence level and a one-line rationale, and can drill into the numbers behind each one. The goal is to make a sound, data-backed pick legible in under ten seconds.',
        ],
      },
      {
        heading: 'How the picks engine works',
        body: [
          'A Python service ingests fixture, lineup, and per-player event data, then builds rolling per-90 features for each player against the opponent profile. A model layer scores each candidate prop and only surfaces picks where the modelled edge clears a threshold.',
          'The Next.js front end consumes a versioned JSON contract, so the model can be retrained or swapped without touching the UI. Every pick is stored with the inputs that produced it, which makes post-match review straightforward.',
        ],
      },
      {
        heading: 'What shipping it taught me',
        body: [
          'Being the only person on the project meant owning the full loop: data pipeline, model, product, and the boring parts like caching and error states. The hardest problems were not modelling problems; they were about deciding what not to show.',
          'The other lesson was about cadence. A live tournament is an unforgiving deadline, and shipping something narrow and correct every day beat shipping something ambitious once.',
        ],
      },
    ],
  },
  {
    slug: 'tailtech',
    title: 'TailTech',
    tagline: 'B2B white-label SaaS platform for pet care businesses.',
    role: 'Contributor',
    timeframe: '2025 – present',
    stack: ['Laravel', 'Livewire', 'MySQL', 'Flutter'],
    links: {
      live: '',
      repo: '',
    },
    sections: [
      {
        heading: 'The problem',
        body: [
          'Independent pet groomers and boarding businesses run on WhatsApp, notebooks, and memory. Bookings get double-scheduled, customers forget appointments, and there is no branded surface a business can point its customers to.',
          'TailTech gives each business its own branded booking experience and back office without requiring them to build or maintain software.',
        ],
      },
      {
        heading: 'Architecture',
        body: [
          'The platform is a multi-tenant Laravel application. A partner onboards through a guided wizard, uploads a logo and service photos, and receives a business code that customers use to reach their branded storefront. Tenant data is scoped at the query layer so a single deployment serves every partner.',
          'Livewire handles the interactive admin surfaces without a separate front-end build, which keeps the operational footprint small for a lean team.',
        ],
      },
      {
        heading: 'My contributions',
        body: [
          'I worked on the partner onboarding flow, including validation for required brand assets, the service-photo upload step, and the copy and UI changes that replaced a per-tenant app build with the shared business-code model.',
          'I also spent time on the mobile companion app and on consolidating diverging forks of the codebase into one maintainable repository.',
        ],
      },
    ],
  },
  {
    slug: 'client-sites',
    title: 'Freelance web development',
    tagline: 'Config-driven Next.js sites for F&B businesses in Bangalore.',
    role: 'Freelance developer',
    timeframe: '2024 – 2025',
    stack: ['Next.js', 'TypeScript', 'Tailwind'],
    links: {
      live: '',
      repo: '',
    },
    sections: [
      {
        heading: 'The offer',
        body: [
          'Small cafes and restaurants in Bangalore needed a fast, good-looking site with a menu, hours, location, and a way to reach them. Most had been quoted agency prices for a template. I offered a fixed-scope build with a short turnaround and handled everything from first outreach to final QA.',
          'Two to three clients shipped on this model, each with full ownership of their content after launch.',
        ],
      },
      {
        heading: 'The reusable architecture',
        body: [
          'Every site runs on the same Next.js and TypeScript codebase. Business-specific content lives in a single typed config: brand colours, menu sections, opening hours, social links, and imagery. Adding a client means adding a config file and a set of assets, not forking the code.',
          'Tailwind keeps styling consistent across clients while still allowing per-brand theming through the config. Builds are static, so hosting is cheap and pages are fast on mobile connections.',
        ],
      },
      {
        heading: 'Results',
        body: [
          'Clients went from no web presence, or an outdated listing, to a mobile-first site they could share directly with customers. Turnaround per site dropped with each iteration of the shared codebase.',
          'The bigger result was the process: scoping, communicating, and closing work end to end, which is not something a classroom project teaches.',
        ],
      },
    ],
  },
  {
    slug: 'data-quality-agent',
    title: 'AI data-quality agent',
    tagline: 'One agent in a multi-agent pipeline for enterprise master data.',
    role: 'Intern project',
    timeframe: 'Summer 2026',
    stack: ['Python', 'LLM tooling', 'SQL'],
    links: {
      live: '',
      repo: '',
    },
    sections: [
      {
        heading: 'The problem',
        body: [
          'Master data in large organisations accumulates inconsistencies over years: duplicate records, conflicting attributes, missing fields, and values that drift away from an agreed standard. Cleaning it manually does not scale, and rule-based checks miss anything the rules did not anticipate.',
        ],
      },
      {
        heading: 'Approach',
        body: [
          'The project was a multi-agent pipeline in which each agent owns one stage of the workflow. The data-quality agent I built sits early in that pipeline. It profiles incoming records, flags likely issues by category, proposes a correction with a confidence score, and hands ambiguous cases to a human reviewer rather than guessing.',
          'The design kept the language model at the reasoning layer and kept deterministic checks in code. Every proposed change carried a rationale, and nothing was written back without passing a validation step.',
        ],
      },
      {
        heading: 'What I took from it',
        body: [
          'Agents are most useful when their scope is narrow and their output is verifiable. The most valuable engineering time went into evaluation: building a labelled set of known issues and measuring precision before worrying about coverage.',
        ],
      },
    ],
  },
]

export function getProject(slug) {
  return projects.find((p) => p.slug === slug)
}
