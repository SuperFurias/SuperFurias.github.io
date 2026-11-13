# SuperFurias — personal site

A single-page, black-and-red vampire-themed personal site for **SuperFurias**: otaku, gamer, Minecraft modder, and Twitch streamer from Cosenza, Italy.

Pure static HTML, CSS, and vanilla JavaScript. No frameworks, no build step, no server code, no API secrets. Ready for GitHub Pages.

## File map

```text
/
├── index.html
├── styles.css
├── script.js
├── README.md
├── .nojekyll
├── robots.txt
├── sitemap.xml
└── assets/
    ├── avatar.jpg
    ├── avatar-240.jpg
    ├── apple-touch-icon.png
    ├── card-blendedcraft.jpg
    ├── card-genshin.jpg
    ├── card-minecraft.jpg
    ├── card-music.jpg
    ├── card-wuwa.jpg
    ├── favicon.svg
    ├── favicon-16.png
    ├── favicon-32.png
    ├── og-image.jpg
    └── fonts/
        ├── cinzel-latin.woff2
        └── outfit-latin.woff2
```

## Local preview

From the project root:

```bash
python -m http.server 8000
```

Open <http://localhost:8000>.

The Twitch embeds allow `localhost`, `127.0.0.1`, and `superfurias.github.io` as embed parents. Opening `index.html` directly with `file://` will load the page but Twitch will refuse the embed.

## Deploy to GitHub Pages

This is a **user site**, so the repository must be named exactly `SuperFurias.github.io`.

1. Create a **public** repository named `SuperFurias.github.io` under the `SuperFurias` account.
2. Push these files to the `main` branch.
3. On GitHub: **Settings → Pages → Build and deployment → Deploy from a branch**.
4. Select **main** and **/ (root)**, then **Save**.
5. Wait for the Pages build. The site will be live at:

   <https://superfurias.github.io/>

No custom domain is configured, so there is no `CNAME` file. If a custom domain is added later, create a `CNAME` file containing the bare domain and add that domain to the Twitch embed `parent` parameters in `index.html`.

## Updating content

- **Social links:** edit the footer list in `index.html` and the matching `sameAs` array in the JSON-LD block.
- **Twitch channel:** replace `superfuriasvt` in both iframe URLs, the Watch Live links, and `parent` parameters if the channel changes.
- **Games / cards:** replace the five cards inside `.bento` in `index.html`. Keep the `width` and `height` attributes to avoid layout shift.
- **Images:** swap files in `assets/` while keeping the same filenames, or update the `src` paths. Keep the avatar near 480×480 and card art near 960×540.
- **Meta / SEO:** update `<title>`, the description, Open Graph/Twitter tags, canonical URL, and `assets/og-image.jpg` if the site moves.
- **Schedule:** there is intentionally no weekly schedule section.
- **No Discord:** there is no Discord CTA or widget.

## Twitch notes

- The player and chat are the official Twitch iframes. No client ID, token, or secret is used.
- The embeds load **only after clicking “Load player & chat”**, so no Twitch scripts, cookies, or players run on first paint.
- The page does **not** claim the channel is live. Twitch itself renders the real online/offline state.
- The “hide player” control only collapses the embeds for the current view and never changes the channel.
- If the channel changes, remember to update the `parent` values if the site's domain changes.

## Accessibility and motion

- Semantic landmarks, one `h1`, ordered headings, skip link, visible focus rings.
- The mobile menu closes on Escape, traps focus, and returns focus to the trigger.
- Images have descriptive alt text and intrinsic dimensions.
- `prefers-reduced-motion` disables the ember canvas, floating card, reveals, smooth scrolling, and hover tilt.
- Twitch iframes have descriptive titles and lazy loading.

## Performance notes

- Local images are resized and compressed; below-the-fold images are lazy-loaded.
- Fonts are self-hosted (Cinzel and Outfit, SIL Open Font License) with `font-display: swap` and system fallbacks.
- Twitch embeds are click-to-load, so the initial page ships without third-party scripts or cookies.
- JavaScript is deferred and dependency-free.
- The layout is tested at 360 px, 768 px, 1024 px, and 1440 px.

## Assets and credits

The avatar, Twitch banner crop, YouTube thumbnails, and BlendedCraft screenshot originate from SuperFurias's own public profiles and videos. Game imagery remains the property of its respective owners.

Cinzel and Outfit are self-hosted from Google Fonts under the SIL Open Font License.

This is a personal fan/creator site. It is not affiliated with HoYoverse, Kuro Games, Mojang Studios, Microsoft, or Twitch.
