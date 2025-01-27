<template>
  <div class="testing-page">
    <div class="container">
      <div class="page-header">
        <h1>Amateur Radio License Testing</h1>
        <p class="subtitle">
          Get your ham radio license or upgrade your existing license with the
          Nixa Amateur Radio Club
        </p>
      </div>

      <div class="content-sections">
        <!-- When and Where Section -->
        <section class="info-section">
          <h2><i class="fas fa-calendar-alt"></i> When & Where</h2>
          <div class="info-content">
            <p>
              Testing takes place at 4:30 PM prior to our
              <RouterLink to="/meetings" class="inline-link"
                >monthly club meeting</RouterLink
              >. The meeting is typically held on the second Saturday of each
              month - check our meetings page for the exact date and location of
              the next meeting.
            </p>
          </div>
        </section>

        <!-- What to Bring Section -->
        <section class="info-section">
          <h2><i class="fas fa-clipboard-list"></i> What to Bring</h2>
          <div class="info-content">
            <ul>
              <li>Valid government-issued photo ID</li>
              <li>
                If upgrading, bring your current original license and a
                photocopy
              </li>
              <li>$15 examination fee (cash preferred)</li>
              <li>Calculator (if desired) - memories must be cleared</li>
              <li>Pencils and scratch paper for notes</li>
            </ul>
          </div>
        </section>

        <!-- Preparation Section -->
        <section class="info-section">
          <h2><i class="fas fa-book-reader"></i> Preparation</h2>
          <div class="info-content">
            <p>
              We recommend the following resources to prepare for your exam:
            </p>
            <ul>
              <li>
                <a
                  href="https://hamstudy.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  HamStudy.org - Free practice tests and study materials
                </a>
              </li>
              <li>
                <a
                  href="http://www.arrl.org/getting-licensed"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ARRL - Official licensing information and study guides
                </a>
              </li>
            </ul>
          </div>
        </section>

        <!-- Additional Info Section -->
        <section class="info-section">
          <h2><i class="fas fa-info-circle"></i> Additional Information</h2>
          <div class="info-content">
            <ul>
              <li>Walk-ins are welcome - no pre-registration required</li>
              <li>
                Testing is available for all license classes (Technician,
                General, and Amateur Extra)
              </li>
              <li>
                Results are typically available immediately after the test
              </li>
              <li>
                Your FCC Registration Number (FRN) is required - we can help you
                obtain one if needed
              </li>
            </ul>
          </div>
        </section>

        <!-- Contact Section -->
        <section class="info-section">
          <h2><i class="fas fa-envelope"></i> Questions?</h2>
          <div class="info-content">
            <p>
              If you have any questions about testing, please contact our VE
              team at
              <a href="mailto:ve@nixahams.net">ve@nixahams.net</a>
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  document.body.scrollTop = 0;
});
</script>

<style scoped>
.testing-page {
  background-color: rgb(17, 17, 17);
  min-height: 100vh;
  padding: 2rem 0;
  color: rgb(208, 213, 239);
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #f58937;
  margin-bottom: 1rem;
}

.subtitle {
  color: #9ca3af;
  font-size: 1.1rem;
  line-height: 1.6;
}

.content-sections {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-section {
  background-color: #2c283b;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.info-section:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  border-color: rgba(245, 137, 55, 0.3);
}

.info-section h2 {
  color: #f58937;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info-section h2 i {
  font-size: 1.25rem;
}

.info-content {
  color: #e5e7eb;
  line-height: 1.6;
}

.info-content p {
  margin-bottom: 1rem;
}

.info-content ul {
  list-style-type: none;
  padding: 0;
}

.info-content li {
  margin-bottom: 0.75rem;
  padding-left: 1.5rem;
  position: relative;
}

.info-content li::before {
  content: "•";
  color: #f58937;
  position: absolute;
  left: 0;
}

.info-content a {
  color: #f58937;
  text-decoration: none;
  transition: color 0.2s;
}

.info-content a:hover {
  color: #d97706;
  text-decoration: underline;
}

.inline-link {
  color: #f58937;
  text-decoration: none;
  transition: color 0.2s;
}

.inline-link:hover {
  color: #d97706;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .testing-page {
    padding: 1rem 0;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .info-section {
    padding: 1.25rem;
  }

  .info-section h2 {
    font-size: 1.25rem;
  }
}
</style>
