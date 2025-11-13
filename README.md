# Hook.AI (Vercel Ready)

### 🚀 Deploy Steps
1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Upload this ZIP or connect GitHub repo.
3. In **Settings → Environment Variables**, add:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
   - (optional) VITE_STRIPE_PUBLISHABLE_KEY
4. Deploy — done!

### 🧠 Notes
- Supabase Auth is preconfigured.
- Stripe Checkout mock redirect is included (ready for real API keys later).
- Build command: `npm run build`
- Output directory: `dist`
