import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Create Supabase client with service role key for server-side operations
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseServiceRoleKey);

let DB_ENABLED = true;

// Helper function to test connection
export async function testConnection(): Promise<boolean> {
  try {
    // Test connection by querying a system table or a simple select
    const { data, error } = await supabase.from('users').select('id').limit(1);
    if (error) throw error;
    console.log('Database connected successfully');
    DB_ENABLED = true;
    return true;
  } catch (error: any) {
    DB_ENABLED = false;
    // Detect common connection errors and provide actionable logs
    if (error && error.message?.includes('connection')) {
      console.error('Database connection refused. Check the host/port and that the database accepts remote connections.');
    }
    console.error('Database connection failed:', error.message || error);
    return false;
  }
}

// Safe query helper: returns null if DB isn't enabled
export async function safeQuery(table: string, operation: 'select' | 'insert' | 'update' | 'delete', options: any) {
  if (!DB_ENABLED) {
    console.warn('safeQuery skipped because DB is not enabled');
    return null;
  }

  try {
    let result;
    switch (operation) {
      case 'select':
        result = await supabase.from(table).select(options.select).match(options.match || {}).limit(options.limit || 1000);
        break;
      case 'insert':
        result = await supabase.from(table).insert(options.data);
        break;
      case 'update':
        result = await supabase.from(table).update(options.data).match(options.match);
        break;
      case 'delete':
        result = await supabase.from(table).delete().match(options.match);
        break;
      default:
        throw new Error('Invalid operation');
    }
    if (result.error) throw result.error;
    return result.data;
  } catch (err) {
    console.error('safeQuery error:', err);
    // Flip DB_ENABLED if connection error
    if ((err as any)?.message?.includes('connection')) DB_ENABLED = false;
    return null;
  }
}

export function isDbEnabled() {
  return DB_ENABLED;
}

export default supabase;

// Run a non-blocking startup check so the server logs DB availability on boot.
(async function startupDbInit() {
  console.log('Starting DB connection check...');
  try {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY === 'your_service_role_key_here') {
      console.warn('SUPABASE_SERVICE_ROLE_KEY not set or is placeholder — skipping DB check');
      DB_ENABLED = false;
      return;
    }
    const ok = await testConnection();
    if (ok) {
      console.log('DB reachable at startup');
    } else {
      console.warn('DB not reachable at startup');
    }
  } catch (err) {
    console.error('Startup DB check failed:', err);
  }
})();