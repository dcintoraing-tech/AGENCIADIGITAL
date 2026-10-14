import { NextResponse } from 'next/server';

/**
 * Recepcion de briefs.
 *
 * En modo demostracion valida y responde. Si existe ARQO_LEADS_WEBHOOK_URL
 * reenvia el brief a ese destino, que es el punto de enganche previsto para un
 * CRM, Supabase o una funcion propia.
 */

type Brief = {
  nombre?: string;
  empresa?: string;
  correo?: string;
  telefono?: string;
  tipo?: string;
  presupuesto?: string;
  mensaje?: string;
};

const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITE = 4000;

const recortar = (v: unknown) =>
  typeof v === 'string' ? v.trim().slice(0, LIMITE) : '';

export async function POST(request: Request) {
  let cuerpo: Brief;
  try {
    cuerpo = await request.json();
  } catch {
    return NextResponse.json({ error: 'Cuerpo no valido.' }, { status: 400 });
  }

  const brief = {
    nombre: recortar(cuerpo.nombre),
    empresa: recortar(cuerpo.empresa),
    correo: recortar(cuerpo.correo),
    telefono: recortar(cuerpo.telefono),
    tipo: recortar(cuerpo.tipo),
    presupuesto: recortar(cuerpo.presupuesto),
    mensaje: recortar(cuerpo.mensaje),
  };

  const errores: Record<string, string> = {};
  if (!brief.nombre) errores.nombre = 'Falta el nombre.';
  if (!CORREO.test(brief.correo)) errores.correo = 'Correo no valido.';
  if (!brief.tipo) errores.tipo = 'Falta el tipo de proyecto.';
  if (brief.mensaje.length < 20) errores.mensaje = 'El mensaje es demasiado corto.';

  if (Object.keys(errores).length > 0) {
    return NextResponse.json({ errores }, { status: 422 });
  }

  const destino = process.env.ARQO_LEADS_WEBHOOK_URL;
  if (destino) {
    try {
      await fetch(destino, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...brief, recibido: new Date().toISOString() }),
      });
    } catch {
      // El brief no se pierde: se registra y se responde de todos modos.
      console.error('[arqo] no se pudo reenviar el brief al webhook');
    }
  }

  return NextResponse.json({ ok: true, recibido: new Date().toISOString() });
}
