// TODO: review the prose below before going live. Adding a project = adding one
// object to this array.
//
// `stats` is optional: [{ value, label }], shown under the tagline.
// `images` is optional: [{ src, alt, caption, width?, height? }]. Files live in
// public/projects/. width/height are the file's pixel size; they are optional but
// let the browser reserve space so lazy-loaded images do not shift the page. The
// first image doubles as the row thumbnail on /work.
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
    images: [
      {
        src: '/projects/tailtech-branding.webp',
        width: 1600,
        height: 1004,
        alt: 'Step 2 of 6 in the TailTech onboarding wizard, titled Brand your app, with fields for app name, tagline, primary, secondary and accent colors, and a logo upload.',
        caption: 'Onboarding step 2 — a partner picks their colors and logo',
      },
      {
        src: '/projects/tailtech-golive.webp',
        width: 1600,
        height: 1004,
        alt: 'Final step of the onboarding wizard, Review & Go Live, summarising the business name, brand colors, and one location, service and staff member, above a Complete Setup button.',
        caption: 'Step 6 — review and go live. Completing setup publishes the business and creates the admin login',
      },
      {
        src: '/projects/tailtech-tenants.webp',
        width: 1600,
        height: 1125,
        alt: 'Three phone screens sharing one home layout, branded for three businesses: Bark Avenue in navy, Bright Paws Studio in red, and Pawsome Care in teal, each with its own pets, services and accent color.',
        caption: 'The same screen, three different businesses — one app resolving branding at login',
      },
    ],
    sections: [
      {
        heading: 'The problem',
        body: [
          'Small pet care businesses in India were being asked to choose between a spreadsheet and enterprise pricing. Groomers and boarders run on WhatsApp and memory, and there is no branded surface they can point customers to.',
          'TailTech gives each business its own branded booking app and back office without them building or maintaining software. Revenue is 6% of GMV, split at source. The platform works end to end, from onboarding to a live branded app, and we\'re now in conversations with our first service providers.',
        ],
      },
      {
        heading: 'Architecture',
        body: [
          'The platform is a multi-tenant Laravel and Livewire application. An owner completes a six-step self-serve onboarding wizard. At go-live the business is published and gets a code its customers use to sign up. Every business runs on the same app, which loads the right branding at login.',
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
      {
        heading: 'A bug worth finding',
        body: [
          'While preparing this demo, I found that a partner changing their logo or colors in settings never reached the app. Branding only synced once, at onboarding. I moved app-facing branding onto the API so settings changes reach every customer\'s app, before the first real partner could hit it.',
        ],
      },
    ],
  },
  {
    slug: 'data-quality-agent',
    title: 'AI data-quality agent',
    tagline: 'One agent in a multi-agent pipeline for enterprise master data.',
    role: 'Data & AI Intern, KPMG Digital Lighthouse',
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
    stats: [
      { value: '80', label: 'picks published' },
      { value: '71%', label: 'hit rate' },
    ],
    role: 'Founder',
    timeframe: 'Summer 2026',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase', 'Anthropic API'],
    links: {
      live: 'https://setpiecepicks.com',
      repo: '',
    },
    images: [
      {
        src: '/projects/setpiece-results.webp',
        width: 1600,
        height: 1556,
        alt: 'Setpiece track record page headed Every pick. Every result. It shows a 71% hit rate across 80 picks, 57 won and 23 lost, above a table marking each pick won or lost with how many hours before kickoff it was posted.',
        caption: 'Public results log — 80 picks, 71% hit rate, every pick posted before kickoff',
      },
      {
        src: '/projects/setpiece-pick-card.webp',
        width: 968,
        height: 1668,
        alt: 'Pick card for Lionel Messi: more than 3.5 total shots at 82% confidence. A Scout Analysis paragraph explains the call, followed by his last five match totals and a footer showing the pick was posted 16.7 hours before kickoff and won.',
        caption: 'A pick with Scout\'s reasoning shown',
      },
      {
        src: '/projects/setpiece-home.webp',
        width: 1600,
        height: 1000,
        alt: 'Setpiece home page with the headline The analytical edge for fantasy football, an email signup, and a live Scout panel previewing two picks with their confidence levels.',
        caption: 'Setpiece landing page',
      },
    ],
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
    images: [
      {
        src: '/projects/orders-menu.webp',
        width: 1600,
        height: 1004,
        alt: 'Menu page of a bakery ordering site. A pink banner reads Something for every sweet tooth with a notice about a 10 to 12 day fulfilment delay, above a Cookies section where each item has an Add to Cart button.',
        caption: 'The menu customers order from',
      },
      {
        src: '/projects/orders-checkout.webp',
        width: 1600,
        height: 1004,
        alt: 'Checkout page with three cart items on the left, each with a quantity stepper and a customisation notes field, and a delivery details form on the right with a calendar open to choose a delivery date.',
        caption: 'Checkout with delivery scheduling',
      },
      {
        src: '/projects/orders-alert-email.webp',
        width: 1600,
        height: 729,
        alt: 'Plain email titled New Order Placed, listing the customer\'s contact details, delivery address and date, a three-row item table totalling ₹2398, and a note asking for a birthday message in the box.',
        caption: 'Order alert to the owner — deliberately plain, it gets read on a phone mid-service',
      },
    ],
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
          'They place an order on the site, get an automated confirmation, and pay via UPI. Payment goes directly to the owner through a QR code, UPI ID, or phone number, and the owner confirms the order once it lands.',
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
