import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
(window as any).Pusher = Pusher;


const echo = new Echo({
    broadcaster: 'reverb',
    key: process.env.NEXT_PUBLIC_REVERB_APP_KEY as string,
    wsHost: process.env.NEXT_PUBLIC_REVERB_HOST as string,
    wsPort: parseInt(process.env.NEXT_PUBLIC_REVERB_PORT ?? '80', 10),
    wssPort: parseInt(process.env.NEXT_PUBLIC_REVERB_PORT ?? '443', 10),
    forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
});

export default echo;
