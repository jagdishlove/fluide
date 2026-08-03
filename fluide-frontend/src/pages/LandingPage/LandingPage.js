import React from "react";
import { Box, Typography, Container, Grid, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/button/Button";
import { style } from "./style";

import moduleIcon from "../../assets/icons/module.svg";
import lessonListIcon from "../../assets/icons/lessonListIcon.svg";
import quizIcon from "../../assets/icons/quizIcon.svg";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={style.root}>
      {/* Hero Section */}
      <Container maxWidth="lg">
        <Box sx={style.heroSection}>
          <Typography variant="h1" sx={style.heroTitle}>
            Master Any Topic with <span style={style.gradientText}>Fluide</span>
          </Typography>
          <Typography variant="h3" sx={style.heroSubTitle}>
            The AI-powered adaptive learning platform that generates
            personalized curriculums in seconds. Stop searching, start
            mastering.
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ mt: 4 }}
          >
            <ButtonComponent
              size="l"
              onClick={() => navigate("/signup")}
              sx={style.ctaBtn}
            >
              Get Started for Free
            </ButtonComponent>
          </Stack>
        </Box>
      </Container>

      {/* Benefits Section */}
      <Box sx={style.featuresSection}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 8, textAlign: "center" }}>
            <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>
              Why Choose Fluide?
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ maxWidth: "580px", margin: "0 auto" }}
            >
              Experience a smarter way to learn with tools designed for the
              modern age.
            </Typography>
          </Box>
          <Box sx={style.featureGrid}>
            <Box sx={style.featureCard}>
              <Box sx={style.iconWrapper}>
                <img
                  src={moduleIcon}
                  alt="Adaptive"
                  style={{ width: "52px" }}
                />
              </Box>
              <Typography sx={style.featureTitle}>Adaptive Learning</Typography>
              <Typography sx={style.featureDescription}>
                Our AI tailors every module to your specific knowledge level,
                ensuring you're always challenged but never overwhelmed.
              </Typography>
              <Typography
                sx={{
                  mt: 2,
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#6C8EA5",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                Learn more <span>→</span>
              </Typography>
            </Box>

            <Box sx={style.featureCard}>
              <Box sx={style.iconWrapper}>
                <img
                  src={lessonListIcon}
                  alt="Curriculum"
                  style={{ width: "52px" }}
                />
              </Box>
              <Typography sx={style.featureTitle}>
                Instant Curriculum
              </Typography>
              <Typography sx={style.featureDescription}>
                Enter any topic—from Quantum Physics to sourdough baking—and get
                a structured learning path instantly.
              </Typography>
              <Typography
                sx={{
                  mt: 2,
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#6C8EA5",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                Learn more <span>→</span>
              </Typography>
            </Box>

            <Box sx={style.featureCard}>
              <Box sx={style.iconWrapper}>
                <img
                  src={quizIcon}
                  alt="Multilingual"
                  style={{ width: "52px" }}
                />
              </Box>
              <Typography sx={style.featureTitle}>Smart Assessments</Typography>
              <Typography sx={style.featureDescription}>
                Validate your knowledge with AI-generated quizzes that identify
                your gaps and reinforce your strengths.
              </Typography>
              <Typography
                sx={{
                  mt: 2,
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#6C8EA5",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                Learn more <span>→</span>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* How it Works Section */}
      <Box sx={style.howItWorks}>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            textAlign="center"
            sx={{ mb: 8, fontWeight: 700 }}
          >
            How It Works
          </Typography>
          <Stack spacing={4}>
            <Box sx={style.stepBox}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, mb: 1, color: "#6C8EA5" }}
              >
                01. Enter a Topic
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Tell us what you want to learn. From complex academic subjects
                to creative hobbies—be as specific as you like.
              </Typography>
            </Box>
            <Box sx={style.stepBox}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, mb: 1, color: "#6C8EA5" }}
              >
                02. Select Your Level
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Choose from Beginner, Intermediate, or Advanced. Our AI adjusts
                the depth and complexity of the content to match your expertise.
              </Typography>
            </Box>
            <Box sx={style.stepBox}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, mb: 1, color: "#6C8EA5" }}
              >
                03. Generate & Learn
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Our AI builds your custom modules in seconds. Dive into
                structured lessons, examples, and quizzes designed just for you.
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Bottom CTA */}
      <Box sx={style.footerCta}>
        <Container maxWidth="md">
          <Box sx={style.footerCtaCard}>
            <Box sx={style.footerCtaContent}>
              <Typography sx={style.ctaEyebrow}>
                Start learning today
              </Typography>
              <Typography variant="h3" sx={style.ctaTitle}>
                Ready to accelerate your learning?
              </Typography>
              <Typography sx={style.ctaDescription}>
                Build a personalized curriculum, explore your topic at the right
                depth, and start making progress from the first lesson.
              </Typography>
              <Box sx={style.ctaButtonRow}>
                <ButtonComponent
                  size="l"
                  onClick={() => navigate("/signup")}
                  sx={style.ctaPrimaryBtn}
                >
                  Create Your First Module
                </ButtonComponent>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
