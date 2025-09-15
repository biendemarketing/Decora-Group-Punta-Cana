import { createClient } from '@supabase/supabase-js';

// MUY IMPORTANTE:
// 1. Ve a tu panel de control de Supabase.
// 2. Ve a la configuración del proyecto (el ícono de engranaje).
// 3. Selecciona "API" en el menú lateral.
// 4. Copia la "URL del Proyecto" y pégala en la variable `supabaseUrl`.
// 5. Copia la "Clave anónima pública" (anon public key) y pégala en `supabaseAnonKey`.

const supabaseUrl = 'https://scmukmmzmfaqknrsgaam.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjbXVrbW16bWZhcWtucnNnYWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2MDk0OTEsImV4cCI6MjA3MzE4NTQ5MX0.bsAyIb-gzDVB7Ymj8ZcE9_t-myU-f4kZwNwBBBgv344';

// FIX: Removed obsolete check for placeholder credentials. This was causing a
// TypeScript error as the credentials are now configured, and the string literal
// types in the comparison would never overlap.

export const supabase = createClient(supabaseUrl, supabaseAnonKey);