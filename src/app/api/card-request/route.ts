import {
  CARD_REQUEST_WHATSAPP,
  formatCardRequestEmail,
  type CardRequestPayload,
} from "@/lib/card-request";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const raw = formData.get("payload");

    if (typeof raw !== "string") {
      return Response.json({ error: "Payload mancante" }, { status: 400 });
    }

    const payload = JSON.parse(raw) as CardRequestPayload;

    const { subject, body } = formatCardRequestEmail(payload);

    // Log strutturato per raccolta richieste (Vercel logs / future integrazione email)
    console.info("[card-request]", {
      to: CARD_REQUEST_WHATSAPP,
      subject,
      package: payload.package,
      athlete: `${payload.firstName} ${payload.lastName}`,
      email: payload.email,
    });

    return Response.json({
      ok: true,
      whatsapp: `https://wa.me/${CARD_REQUEST_WHATSAPP}?text=${encodeURIComponent(body)}`,
    });
  } catch {
    return Response.json({ error: "Richiesta non valida" }, { status: 400 });
  }
}
