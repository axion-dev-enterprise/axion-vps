import Stripe from "stripe";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    // Retorno mock quando as chaves ainda não estão injetadas no ambiente de preview
    return res.status(200).json({
      ok: true,
      url: "https://checkout.stripe.com/mock-vps-checkout?plan=" + (req.body?.planId || "beta"),
      mock: true
    });
  }

  try {
    const stripe = new Stripe(secretKey);
    const { planId, billingCycle, customerEmail } = req.body || {};

    const planPrices = {
      alpha: { name: "AXION VPS Alpha", monthly: 7900, annual: 79000 },
      beta: { name: "AXION VPS Beta", monthly: 14900, annual: 149000 },
      ultra: { name: "AXION VPS Ultra", monthly: 29900, annual: 299000 },
      enterprise: { name: "AXION VPS Enterprise", monthly: 59900, annual: 599000 }
    };

    const targetPlan = planPrices[planId?.toLowerCase()] || planPrices.beta;
    const isAnnual = billingCycle === "annual";
    const amount = isAnnual ? targetPlan.annual : targetPlan.monthly;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: { name: `${targetPlan.name} (${isAnnual ? "Plano Anual" : "Plano Mensal"})` },
            unit_amount: amount,
            recurring: { interval: isAnnual ? "year" : "month" }
          },
          quantity: 1
        }
      ],
      customer_email: customerEmail || undefined,
      success_url: `${req.headers.origin || "https://vps.axionenterprise.cloud"}?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin || "https://vps.axionenterprise.cloud"}?payment=cancel`
    });

    return res.status(200).json({ ok: true, url: session.url });
  } catch (error) {
    console.error("Stripe VPS Checkout Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
