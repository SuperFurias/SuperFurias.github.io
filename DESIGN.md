# Design direction: SuperFurias

Reading this as: a personal creator homepage for SuperFurias, in an elegant gothic black-and-red visual language, dial ENERGY 2 / RHYTHM 2 / MOTION 2.

## Identity

SuperFurias is an Italian otaku, gamer, and Minecraft modder from Cosenza. The site is nocturnal and elegant, not horror-gore. The white-haired, red-eyed, black-dressed vampire is a visual archetype, not a portrait of the owner. No character illustration is used. The mood comes from the palette, the crescent mark, the type, and the ember layer.

## Personality

Quiet confidence, dry warmth, late-night focus. The page should feel like a private corner of the internet after midnight, not a product launch.

## Palette

- Near-black `#050507` for the page and elevated surfaces.
- Blood red `#dc2626` and `#ef4444` for the accent, links, and the single focal glow.
- Warm ivory `#f4eeea` for primary text.
- Muted rose-grey for secondary text.
- Ember `#f97316` only inside the particle layer.

No purple, cyan, neon, or pure `#000`/`#ff0000`.

## Type

- **Cinzel** for display: a gothic serif that matches the vampire and occult identity. It is used at large sizes where it stays readable.
- **Outfit** for body and UI: a clean sans that keeps long paragraphs and small labels readable against the denser display type.

## Dials

**ENERGY 2 / RHYTHM 2 / MOTION 2**

- Energy: a bold hero, restrained surfaces elsewhere.
- Rhythm: hero, live panel, split about, content grid, community panel, footer. The sections change composition; they do not repeat one card template.
- Motion: embers, scroll reveals, hover transitions, and a slow floating profile card. No parallax, pinning, or pointer tilt.

## Reasons

- **Navbar glass:** the fixed nav is the only blurred surface. It needs legibility while content scrolls under it.
- **Background:** one deep red radial and a near-black gradient create the nocturnal light. The ember canvas adds slow motion without competing with the content.
- **Hero card glow:** the profile card is the single glow accent and the focal point of the first screen. Other surfaces use borders and dark elevation instead.
- **Shadows:** reserved for the hero card, the two wide panels, the portrait, the live facade, and hover elevation. Links, tags, and rules use borders instead of floating.
- **Section labels:** small uppercase Outfit at 0.18em tracking separates labels from headings without turning every label into display type.
- **Icons:** only for real actions: play for streams, pin for location, chevron for the player toggle, and five glyphs for the chat rules.
- **Bento layout:** five real content items with different weights. Minecraft is the feature; Genshin, Wuthering Waves, BlendedCraft, and the lyre covers support it. The asymmetry carries that hierarchy.
- **One arrow:** only the in-page "Enter the Night" action gets a directional arrow. External links are plain text so the page does not read as a wall of decorative arrows.
- **Embers:** the identity motif. Sparse, slow, low-opacity, and disabled under reduced motion.
- **Dark theme:** chosen for the vampire identity, not as a default "tech" treatment.
- **Live band:** click-to-load. No fake live badge or invented status. A loading state and a fallback link cover the real network states.

## Reference conflict

The original layout reference asked for glass cards, layered glows, a bento grid, and a capsule hero badge. Applying antislop:

- Glass is limited to the navbar.
- Glow is limited to the hero card.
- The capsule hero badge is removed.
- The bento stays because it carries five real items with a clear feature/support hierarchy.
