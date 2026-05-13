export const dynamic = 'force-dynamic';
import { supabaseAdmin } from '@/app/supabaseAdmin';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const table = searchParams.get('table');

  const allowed = ['transittimes', 'statuses', 'packagetype', 'shippingtypes'];
  if (!allowed.includes(table)) {
    return Response.json({ error: 'Invalid table' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin.from(table).select('*');
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ data });
}
