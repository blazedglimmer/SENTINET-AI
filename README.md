# Next-Generation AI Model Playground

A sophisticated real-time AI model interaction platform with streaming capabilities, built with Next.js 15 and React 19.

## Features

- ✨ Real-time AI model interaction with streaming responses
- 📊 Live metrics tracking (tokens/sec, total tokens)
- 🔄 Automatic retry logic with exponential backoff
- 🔧 Configurable model parameters
- 📱 Progressive Web App (PWA) support
- 🔌 Offline functionality
- ⚡ Performance optimized with React memoization
- 📐 LaTeX equation support
- 🎨 Dark/Light mode support

## Quick Start

```bash
# Install dependencies (use legacy peer deps due to React 19 RC)
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Architecture Overview

### Core Components

1. **Playground (`components/playground/playground.tsx`)**

   - Main interface component
   - Handles user input and AI interactions
   - Manages conversation state

2. **Message System**

   - `MessageWindow`: Virtualized message display
   - `MessageItem`: Individual message rendering
   - LaTeX equation support via KaTeX
   - Code syntax highlighting

3. **Model Controls**

   - Temperature adjustment
   - Top-P configuration
   - Frequency/Presence penalty settings

4. **Error Handling**
   - Error boundaries for component isolation
   - Automatic retry logic
   - Sentry integration for monitoring

### State Management

- React hooks for local state
- IndexedDB for conversation persistence
- Local storage for user preferences

## Performance Considerations

1. **Optimizations**

   - Component memoization
   - Virtualized list rendering
   - Service worker for offline support
   - Asset caching strategies

2. **Memory Management**
   - Message virtualization
   - Efficient state updates
   - Cleanup on unmount

## Error Handling

1. **Retry Logic**

   - Exponential backoff
   - Configurable attempts
   - Error context preservation

2. **Monitoring**
   - Sentry integration
   - Error logging
   - User feedback

## Future Improvements

1. **Features**

   - Multiple model support
   - Conversation branching
   - Export/Import conversations
   - Collaborative features

2. **Technical**
   - WebSocket implementation
   - Stream compression
   - Worker thread processing
   - Enhanced caching strategies

## Known Limitations

1. **Browser Support**

   - Service workers require HTTPS
   - IndexedDB storage limits
   - PWA installation requirements

2. **Performance**
   - Initial load time with full bundle
   - Memory usage with long conversations
   - Mobile device considerations

## Edge Cases

1. **Network**

   - Intermittent connectivity
   - Failed retry attempts
   - Partial message delivery

2. **User Input**

   - Large message handling
   - Special character processing
   - Rate limiting

3. **Storage**
   - Quota exceeded handling
   - Data corruption recovery
   - Cross-device sync limitations

## Development

### Prerequisites

- Node.js 18+
- npm or yarn
- Modern browser with service worker support

### Environment Setup

1. Clone the repository
2. Install dependencies with `npm install --legacy-peer-deps`
3. Create `.env.local` with required variables
4. Start development server

### Testing

```bash
npm run test        # Run unit tests
npm run test:e2e    # Run end-to-end tests
npm run lint        # Run linting
```

## License

MIT License - see LICENSE file for details
