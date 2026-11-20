# UNPAF Sri Lanka

Next.js (App Router, TypeScript, Tailwind) regional site modelled on https://www.unpaf.info/.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Copy `.env.example` to `.env.local` to enable form storage (Supabase) and the admin login.

## Media

All images and videos in `public/media` were downloaded from unpaf.info (Wix media CDN).
Use them only with UNPAF's permission.

| Folder | Used on |
| --- | --- |
| `brand/` | UNPAF emblem (header, footer) |
| `home/` | "Becoming a Peace Ambassador" video + poster, "UNPAF in Action" slides, core topics image |
| `about/` | rotating globe (animated WebP), learning / diversity images, 17 SDG images |
| `ambassadors/`, `flags/` | Board and International Ambassador portraits and round flag badges |
| `gallery/` | Gallery hero and 5 albums (84 photos) |
| `events/` | Event posters (Diplomatic Summit, Arts & Culture Symposium, Peace Congress) |
| `heroes/` | Join / Partner background videos + posters, Contact banner |
| `youth/` | Youth event image |

To re-download the images: `powershell -ExecutionPolicy Bypass -File scripts/media/fetch-media.ps1`
(entries live in `scripts/media/manifest.txt`; existing files are skipped).

Videos (`https://video.wixstatic.com/video/<id>/<quality>/mp4/file.mp4`):

- `home/becoming-a-peace-ambassador.mp4`: `bcefb4_c44c791d34184d778fa9196376c1bb61`, 480p
- `heroes/join.mp4`: `11062b_62f0356712544a87b392417662c4658d`, 720p
- `heroes/partner.mp4`: `11062b_c44d5e2206da4077a1df1db577bf626f`, 720p

To replace an image, overwrite the file at the same path, or change the path in `src/data/*.ts`.
