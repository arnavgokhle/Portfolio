// TODO: review the prose below before going live. Adding a project = adding one
// object to this array.
//
// Note on "data-quality-agent": keep it at the architecture level. No client
// names, internal project names, specific tables, or rule counts.

export const projects = [
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
    slug: 'orders-system',
    title: 'Orders management system',
    tagline: 'Replacing Instagram DMs and a notebook with an automated order chain',
    role: 'Sole designer and developer',
    timeframe: 'June 2026 — present',
    stack: ['Next.js', 'Supabase', 'Resend'],
    links: {},
    sections: [
      {
        heading: 'The problem',
        body: [
          'One of those clients was taking every order through Instagram DMs — no menu structure, no order history, nothing that didn\'t live in a chat thread.',
        ],
      },
      {
        heading: 'What the customer sees',
        body: [
          'They place an order on the site, get an automated confirmation, and pay via UPI. Direct payment from qr code or upi id or phone number. verified by the business owner, once payment comes in.',
        ],
      },
      {
        heading: "Why there's no dashboard",
        body: [
          'There\'s no staff dashboard — deliberately. Orders trigger an email to the owner and land in a tracking spreadsheet automatically, which matched how they already worked rather than asking them to learn a new tool.',
        ],
      },
      {
        heading: 'The hard part',
        body: [
          'The hard part wasn\'t the ordering flow, it was replacing everything that used to happen by hand around it: reading an order out of a DM, typing a confirmation back, and manually adding it to a tracking sheet. I automated that whole chain — order in, confirmation out, sheet updated — so the only manual step left is the owner packing what\'s on the screen. Built with Next.js, Supabase, and Resend. In production since June 2026.',
        ],
      },
    ],
  },
  {
    slug: 'freelance-web',
    title: 'Websites for F&B businesses',
    tagline: 'Config-driven sites for cafes in Bangalore, run end to end',
    role: 'Freelance — design, build, and client management',
    timeframe: 'May–August 2026',
    stack: ['Next.js', 'TypeScript', 'Tailwind'],
    links: {},
    sections: [
      {
        heading: 'What it was',
        body: [
          'Between May and August 2026, I designed and shipped websites for two cafes in Bangalore. I ran each engagement end to end: cold outreach, the discovery call, scoping and pricing, sourcing and vetting the photos and menu data, architecture, and QA before launch.',
        ],
      },
      {
        heading: 'The constraint',
        body: [
          'The interesting constraint was economic, not technical. Sites at this price point stop being worth building if every content change means a developer. So I built on a config-driven architecture in Next.js and TypeScript where branding, menu, hours, and copy live in a typed config file separate from the components. A new client is a new config and an asset folder rather than a new codebase, and an owner who wants to change a price on Tuesday doesn\'t wait on me.',
        ],
      },
      {
        heading: 'A note on clients',
        body: [
          'I\'m not naming clients here, but the sites are live and I\'m happy to send links or walk through the code on a call.',
        ],
      },
    ],
  },
]

export function getProject(slug) {
  return projects.find((p) => p.slug === slug)
}
