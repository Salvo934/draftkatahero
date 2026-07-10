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
    const photo = formData.get("photo");

    const { subject, body } = formatCardRequestEmail({
      ...payload,
      photoFileName:
        photo instanceof File ? photo.name : payload.photoFileName,
    });

    // Log strutturato per raccolta richieste (Vercel logs / future integrazione email)
    console.info("[card-request]", {
      to: CARD_REQUEST_WHATSAPP,
      subject,
      package: payload.package,
      athlete: `${payload.firstName} ${payload.lastName}`,
      email: payload.email,
      hasPhoto: photo instanceof File,
      photoSize: photo instanceof File ? photo.size : 0,
    });

    return Response.json({
      ok: true,
      whatsapp: `https://wa.me/${CARD_REQUEST_WHATSAPP}?text=${encodeURIComponent(body)}`,
    });
  } catch {
    return Response.json({ error: "Richiesta non valida" }, { status: 400 });
  }
}
