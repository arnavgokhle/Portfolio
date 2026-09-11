// TODO: review the prose below before going live. Adding a project = adding one
// object to this array.
//
// Note on "data-quality-agent": keep it at the architecture level. No client
// names, internal project names, specific tables, or rule counts.

export const projects = [
  {
    slug: 'setpiece',
    title: 'Setpiece',
    tagline: 'AI player-prop picks for DFS players, with the reasoning shown before kickoff.',
    role: 'Founder',
    timeframe: 'Summer 2026',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase', 'Anthropic API'],
    links: {
      live: 'https://setpiecepicks.com',
      repo: '',
    },
    sections: [
      {
        heading: 'What it does',
        body: [
          'Setpiece publishes football player-prop picks for daily fantasy players on PrizePicks, Underdog, and Betr. Each pick goes out before kickoff with the reasoning behind it, and every result is tracked publicly with a timestamp, so the record is there for anyone to check.',
          'DFS picks are usually sold with confidence nobody has earned. Setpiece is built on the opposite premise: show the work, and stay quiet when the data does not support a call. That restraint is the product.',
        ],
      },
      {
        heading: 'How Scout works',
        body: [
          'The picks engine is called Scout. It pulls player data for roughly 4,300 players across seven leagues, plus tournament data from the 2018 and 2022 World Cups, Euro 2024, and Copa America 2024. Data comes from FBref, API-Football, and The Odds API.',
          'For each fixture Scout builds a player profile against the opponent, compares it to the posted line, and drafts a pick with its reasoning through the Anthropic API. If the modelled edge or the underlying sample is thin, it skips the prop rather than publishing a weak call. Picks, reasoning, and results are stored in Supabase and served by a Next.js front end.',
        ],
      },
      {
        heading: 'What shipping it taught me',
        body: [
          'The hard part was not generating picks. It was deciding when not to, and building the product so that restraint is visible instead of looking like a gap in coverage.',
          'A live tournament is an unforgiving deadline. Publishing something narrow and defensible every match day beat publishing something ambitious once.',
        ],
      },
    ],
  },
  {
    slug: 'tailtech',
    title: 'TailTech',
    tagline: 'B2B white-label SaaS for pet care businesses in India.',
    role: 'Technical co-founder',
    timeframe: '2025 – present',
    stack: ['Laravel', 'Livewire', 'Flutter', 'GitHub Actions'],
    links: {
      live: '',
      repo: '',
    },
    sections: [
      {
        heading: 'The problem',
        body: [
          'Small pet care businesses in India were being asked to choose between a spreadsheet and enterprise pricing. Groomers and boarders run on WhatsApp and memory, and there is no branded surface they can point customers to.',
          'TailTech gives each business its own branded booking app and back office without them building or maintaining software. Revenue is 6% of GMV, split at source. The product is currently pre-revenue with the app in a staging environment.',
        ],
      },
      {
        heading: 'Architecture',
        body: [
          'The platform is a multi-tenant Laravel and Livewire application. An owner completes a six-step self-serve onboarding wizard, and their branded app provisions automatically through GitHub Actions.',
          'The mobile app started as per-tenant Gradle flavors, one build per business. That did not scale, so it moved to a single Flutter app that brands itself at runtime from the tenant configuration. One build now serves every partner.',
        ],
      },
      {
        heading: 'My contributions',
        body: [
          'I built the onboarding pipeline end to end: the wizard, its validation, and the automated provisioning behind it. I led the pivot from per-tenant builds to the runtime-branded Flutter app.',
          'On the app side I built the business-switching UX, role-based access, and a token-based design system so tenant branding is applied consistently instead of overridden screen by screen.',
        ],
      },
    ],
  },
  {
    slug: 'data-quality-agent',
    title: 'AI data-quality agent',
    tagline: 'One agent in a multi-agent pipeline for enterprise master data.',
    role: 'Analyst, KPMG Digital Lighthouse',
    timeframe: 'June – August 2026',
    stack: ['Python', 'FastAPI', 'React', 'LLM tooling'],
    links: {
      live: '',
      repo: '',
    },
    sections: [
      {
        heading: 'The problem',
        body: [
          'Master data in large organisations accumulates inconsistencies over years: duplicates, conflicting attributes, missing fields, and values drifting from an agreed standard. Generic null checks catch almost none of the issues that matter to the business.',
          'This agent is one stage in a multi-agent pipeline for enterprise master data. Its job is to generate data-quality rules that reflect how the business actually uses the data.',
        ],
      },
      {
        heading: 'Approach',
        body: [
          'The agent generates rules across six data-quality dimensions using business-grounded logic rather than structural checks alone. It runs on a FastAPI backend with a React front end, and the LLM layer is model-agnostic so the underlying model can be swapped without touching the pipeline.',
          'The part worth writing about is the schema architecture. The first version had a hardcoded list of tables. That became an uploadable schema file that hot-reloads on the server, so the agent adapts to a new client instance without a code change or a restart.',
        ],
      },
      {
        heading: 'What I took from it',
        body: [
          'Generating rules was not the interesting problem. Making the system adapt to a new client with no engineering work was. The most valuable time went into that boundary between configuration and code.',
        ],
      },
    ],
  },
]

export function getProject(slug) {
  return projects.find((p) => p.slug === slug)
}
