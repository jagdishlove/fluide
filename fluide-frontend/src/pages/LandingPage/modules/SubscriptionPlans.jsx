import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ButtonComponent from "../../../components/button/Button";
import { useNavigate } from "react-router-dom";
import { style } from "./subscriptionStyle";

const PLANS = [
  {
    name: "Free",
    tagline: "Dip your toes into adaptive learning.",
    price: { monthly: "$0", annual: "$0" },
    period: "forever",
    note: "No credit card required",
    popular: false,
    cta: "Get Started",
    features: [
      "5 module generations per day",
      "English language only",
      "Standard AI quizzes",
      "Basic learning paths",
    ],
  },
  {
    name: "Pro",
    tagline: "For serious self-learners who want more.",
    price: { monthly: "$12", annual: "$9" },
    period: "/month",
    note: "Billed annually at $108",
    popular: true,
    cta: "Upgrade to Pro",
    features: [
      "Unlimited module generations",
      "All 10 languages unlocked",
      "Advanced adaptive assessments",
      "Priority AI generation",
      "Save & organize curriculums",
    ],
  },
  {
    name: "Teams",
    tagline: "Learn together, grow together.",
    price: { monthly: "$29", annual: "$23" },
    period: "/month",
    note: "Billed annually at $276",
    popular: false,
    cta: "Start a Team",
    features: [
      "Everything in Pro",
      "Up to 20 members",
      "Shared team workspaces",
      "Progress analytics dashboard",
      "Priority support",
    ],
  },
];

const SubscriptionPlans = () => {
  const navigate = useNavigate();
  const [annual, setAnnual] = useState(false);

  const handleCta = (plan) => {
    navigate(plan.name === "Free" ? "/signup" : "/signup");
  };

  return (
    <Box sx={style.pricingSection}>
      <Container maxWidth="lg">
        <Box sx={style.header}>
          <Typography sx={style.eyebrow}>Pricing</Typography>
          <Typography variant="h2" sx={style.title}>
            Plans that grow with your curiosity
          </Typography>
          <Typography sx={style.subtitle}>
            Start free and upgrade whenever you're ready. Every plan is built to
            help you learn faster with fluide.
          </Typography>

          <Box sx={style.billingToggle}>
            <Typography
              sx={{
                ...style.billingLabel,
                ...(!annual && style.billingLabelActive),
              }}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </Typography>
            <Box
              role="switch"
              aria-checked={annual}
              onClick={() => setAnnual((prev) => !prev)}
              sx={{
                ...style.toggleTrack,
                ...(annual && style.toggleTrackActive),
              }}
            >
              <Box
                sx={{
                  ...style.toggleThumb,
                  ...(annual && style.toggleThumbActive),
                }}
              />
            </Box>
            <Typography
              sx={{
                ...style.billingLabel,
                ...(annual && style.billingLabelActive),
              }}
              onClick={() => setAnnual(true)}
            >
              Annual
              <Typography component="span" sx={style.saveBadge}>
                Save 25%
              </Typography>
            </Typography>
          </Box>
        </Box>

        <Box sx={style.grid}>
          {PLANS.map((plan) => (
            <Box
              key={plan.name}
              sx={{ ...style.card, ...(plan.popular && style.popularCard) }}
            >
              {plan.popular && (
                <Typography sx={style.popularBadge}>Most Popular</Typography>
              )}
              <Typography sx={style.planName}>{plan.name}</Typography>
              <Typography sx={style.planTagline}>{plan.tagline}</Typography>

              <Box sx={style.priceRow}>
                <Typography sx={style.price}>
                  {annual ? plan.price.annual : plan.price.monthly}
                </Typography>
                <Typography sx={style.pricePeriod}>{plan.period}</Typography>
              </Box>
              <Typography sx={style.priceNote}>{plan.note}</Typography>

              <Box sx={style.divider} />

              <Box component="ul" sx={style.featureList}>
                {plan.features.map((feature) => (
                  <Box component="li" key={feature} sx={style.featureItem}>
                    <CheckCircleIcon sx={style.featureIcon} />
                    <Typography component="span">{feature}</Typography>
                  </Box>
                ))}
              </Box>

              <ButtonComponent
                size="l"
                fullWidth
                variant={plan.popular ? "contained" : "outlined"}
                onClick={() => handleCta(plan)}
                hovercolor={plan.popular ? "#6C8EA5" : undefined}
                sx={style.ctaButton}
              >
                {plan.cta}
              </ButtonComponent>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default SubscriptionPlans;
