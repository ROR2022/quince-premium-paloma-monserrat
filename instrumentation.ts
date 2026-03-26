// Next.js ejecuta este archivo al iniciar el servidor, antes de cualquier ruta.
// Usamos esto para configurar el DNS de Node.js cuando el resolver del sistema
// (Windows 127.0.0.1) no reenvía queries SRV que necesita mongodb+srv://.

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.NODE_ENV !== 'production') {
    const dns = await import('dns');
    dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
    console.log('🌐 DNS servers configured for MongoDB SRV resolution');
  }
}
