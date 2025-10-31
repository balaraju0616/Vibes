import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { inngest, functions } from './inngest/index.js'
import { serve } from 'inngest/express';
import userRouter from './routes/userRoutes.js';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import postRouter from './routes/postRoutes.js';
import storyRouter from './routes/storyRoutes.js';
import messageRouter from './routes/messageRoutes.js';

import dotenv from 'dotenv';

dotenv.config();

// DEBUG: Check if Clerk env vars are loaded
console.log('CLERK_SECRET_KEY exists:', !!process.env.CLERK_SECRET_KEY);
console.log('CLERK_SECRET_KEY length:', process.env.CLERK_SECRET_KEY?.length);
console.log('CLERK_PUBLISHABLE_KEY exists:', !!process.env.CLERK_PUBLISHABLE_KEY);

const app = express();

await connectDB();

app.use(express.json());
app.use(cors());

// MAKE CLERK OPTIONAL - Only use if environment variables exist
if (process.env.CLERK_SECRET_KEY && process.env.CLERK_PUBLISHABLE_KEY) {
  console.log('Initializing Clerk middleware');
  app.use(ClerkExpressWithAuth());
} else {
  console.log('Clerk environment variables missing - skipping Clerk middleware');
  // Create a mock auth middleware
  app.use((req, res, next) => {
    req.auth = { userId: 'mock-user-id' };
    next();
  });
}

// Test routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is working on Vercel',
    timestamp: new Date().toISOString(),
    env: {
      clerkSecret: !!process.env.CLERK_SECRET_KEY,
      clerkPublishable: !!process.env.CLERK_PUBLISHABLE_KEY,
      mongoUri: !!process.env.MONGO_URI
    }
  });
});

app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Test route working - no auth required',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => res.send('Server is running'));
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/story', storyRouter);
app.use('/api/message', messageRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));