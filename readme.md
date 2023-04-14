# First thing you must do before starting a server

1. Create file name ```.env.local```
2. In your ```.env.local``` must have this

   ```env
   - BOOK_API_KEY=<YOUR_BOOK_API_KEY_FROM_GOOGLE>
   Book API = https://developers.google.com/books/docs/overview

   - MONGODB_URI=<YOUR_MONGODB_URI>
   ```
3. Start your server
   - If you do not change some path in the code this will be run on http://localhost:3000