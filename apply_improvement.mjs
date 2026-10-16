import { readFileSync, writeFileSync } from 'node:fs';

let html = readFileSync('improved_restored.html', 'utf8');

// 1. Update root CSS variables to the tested palette
html = html.replace(/--bg:\s*#F7F5F0;/, '--bg: #F5F5F3;');
html = html.replace(/--surface-alt:\s*#EDEAE1;/, '--surface-alt: #EBEBE7;');
html = html.replace(/--muted:\s*#4F5E71;/, '--muted: #384656;');
html = html.replace(/--accent:\s*#8E6D38;/, '--accent: #765826;');
html = html.replace(/--accent-hover:\s*#75592B;/, '--accent-hover: #5F461D;');
html = html.replace(/--type-display:\s*clamp\(44px,\s*5\.6vw,\s*76px\);/, '--type-display: clamp(34px, 5.2vw, 76px);');
html = html.replace(/--type-h2:\s*clamp\(30px,\s*3\.6vw,\s*44px\);/, '--type-h2: clamp(28px, 3.2vw, 40px);');
html = html.replace(/--type-h3:\s*24px;/, '--type-h3: 22px;');
html = html.replace(/--type-lead:\s*20px;/, '--type-lead: 19px;');

// 2. Update .site-header to relative
html = html.replace(/\.site-header\s*\{[\s\S]*?transition:\s*background-color\s*200ms\s*var\(--ease\);[\s\S]*?\}/, '.site-header {\n  position: relative;\n  z-index: 100;\n  background-color: var(--bg);\n}');

// 3. Add .panel and .draw animations
const drawStyles = `
.panel {
  background: var(--navy);
  color: #FAF9F6;
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
  min-height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 36px;
}
.panel svg.blueprint-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.draw {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: draw 1.8s cubic-bezier(.3,.6,.2,1) .2s forwards;
}
.draw.d2 { animation-delay: .7s; }
.draw.d3 { animation-delay: 1.1s; }
@keyframes draw { to { stroke-dashoffset: 0; } }
`;
html = html.replace(/\.hero-card\s*\{[\s\S]*?padding:\s*44px;[\s\S]*?overflow:\s*hidden;\s*\}/, drawStyles);

// 4. Update .display-title styles
html = html.replace(/\.display-title\s*\{[\s\S]*?line-height:\s*1\.05;\s*\}/, '.display-title {\n  font-size: var(--type-display);\n  letter-spacing: -0.02em;\n  font-weight: 350;\n  line-height: 1.08;\n  max-width: 24ch;\n  margin-bottom: 36px;\n}');

// 5. Update footer-bottom styles with refined container disposition
const footerStyles = `
.footer-bottom {
  margin-top: 64px;
  background: rgba(255, 255, 255, 0.035);
  border-radius: var(--radius-md);
  padding: 32px 36px;
}
.footer-bottom-inner {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;
  align-items: flex-start;
}
@media (min-width: 960px) {
  .footer-bottom-inner {
    flex-direction: row;
    align-items: center;
    gap: 48px;
  }
}
.footer-legal-block {
  max-width: 58ch;
}
.compliance-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 10px;
}
.footer-compliance {
  color: #94A3B8;
  font-size: 14px;
  line-height: 1.65;
  margin: 0;
  text-wrap: pretty;
}
.footer-copy-block {
  flex-shrink: 0;
  text-align: left;
}
@media (min-width: 960px) {
  .footer-copy-block {
    text-align: right;
  }
}
.footer-copyright {
  color: #94A3B8;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}
`;
html = html.replace(/\.footer-bottom\s*\{[\s\S]*?\.footer-compliance\s*\{[\s\S]*?margin-bottom:\s*16px;\s*\}/, footerStyles);

// Remove .mobile-action-bar from CSS
html = html.replace(/\/\* Mobile Sticky Bar \*\/[\s\S]*?\.mobile-action-bar\s*\.btn\s*\{[\s\S]*?\}/, '/* Responsive Media Queries */');
html = html.replace(/\.mobile-action-bar\s*\{\s*display:\s*none;\s*\}/, '');

// Remove decorative numbering in areas
html = html.replace(/<div class="area-number">\d+<\/div>\s*/g, '');

// Add entrance animations and mobile queries
const motionAndMobile = `
/* Motion Layer (Emil Kowalski Animation Framework) */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}
.site-header { animation: fadeUp 380ms var(--ease) both; }
.display-title { animation: fadeUp 450ms var(--ease) both; }
.hero-content { animation: fadeUp 450ms var(--ease) 60ms both; }
.hero-actions .btn { animation: fadeUp 350ms var(--ease) 120ms both; }
.hero-trust-item { animation: fadeUp 350ms var(--ease) 180ms both; }
.panel { animation: fadeUp 480ms var(--ease) 80ms both; }
.about-image-wrap { animation: fadeUp 450ms var(--ease) 60ms both; }
.about-content { animation: fadeUp 450ms var(--ease) 100ms both; }
.lawyer-card { animation: fadeUp 450ms var(--ease) both; }
.area-card { animation: fadeUp 400ms var(--ease) both; }
.contact-card { animation: fadeUp 420ms var(--ease) both; }

@media (max-width: 600px) {
  .display-title {
    font-size: 30px;
    line-height: 1.15;
    margin-bottom: 24px;
  }
}
`;
html = html.replace(/\/\* Emil Kowalski Animation Framework & Reduced Motion \*\//, motionAndMobile + '\n/* Emil Kowalski Animation Framework & Reduced Motion */');

// 6. Update Hero HTML to full width display-title + animated blueprint panel
const heroStructure = `
  <!-- Hero Section -->
  <section class="hero-section" id="inicio">
    <div class="wrap">
      <h1 class="display-title">
        Advocacia com seriedade e clareza.
      </h1>

      <div class="hero-grid">
        <div class="hero-content">
          <p class="lead-text">
            Atendimento transparente e comprometido na defesa dos seus direitos. Conheça nossa equipe de advogados inscritos na OAB/RS em Alvorada e agende seu atendimento.
          </p>

          <div class="hero-actions">
            <a class="btn btn-whatsapp" href="https://wa.me/5551993533692?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20jur%C3%ADdica." target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.41 1.02 2.58.12.17 1.76 2.68 4.26 3.76.6.26 1.06.41 1.42.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.3"/></svg>
              Agendar pelo WhatsApp
            </a>
            <a class="btn btn-secondary" href="#profissionais">
              Conhecer os Advogados
            </a>
          </div>

          <div class="hero-trust">
            <div class="hero-trust-item">
              <strong>OAB/RS</strong>
              <span>Inscrição Regular</span>
            </div>
            <div class="hero-trust-item">
              <strong>Alvorada</strong>
              <span>Sede na Região</span>
            </div>
            <div class="hero-trust-item">
              <strong>Ética</strong>
              <span>Atendimento Direto</span>
            </div>
          </div>
        </div>

        <div class="hero-composition">
          <div class="panel" role="img" aria-label="Composição gráfica do monograma do escritório: uma haste compartilhada, braços diagonais e uma base horizontal">
            <svg class="blueprint-svg" viewBox="0 0 400 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <g stroke="var(--accent)" stroke-opacity=".2" stroke-width="1">
                <path d="M60 0V520M130 0V520M200 0V520M270 0V520M340 0V520"/>
              </g>
              <g fill="none" stroke="#FAF8F5" stroke-width="3" stroke-linejoin="miter">
                <path class="draw" pathLength="1" d="M130 70V470"/>
                <path class="draw d2" pathLength="1" d="M130 300L385 66"/>
                <path class="draw d3" pathLength="1" d="M239.8 199.6L372 470"/>
              </g>
              <path class="draw d3" pathLength="1" d="M130 470H420" fill="none" stroke="var(--accent)" stroke-width="3"/>
            </svg>
            <div style="position:relative;z-index:2;">
              <span style="display:inline-block;font-size:13px;letter-spacing:0.04em;color:var(--accent);font-weight:600;background:rgba(20,36,58,0.7);padding:4px 10px;border-radius:var(--radius-sm);">Monograma Institucional</span>
            </div>
            <div class="hero-card-meta" style="position:relative;z-index:2;background:rgba(20,36,58,0.92);border-radius:var(--radius-md);">
              <div class="hero-card-meta-col">
                <span style="color:#95A3B5;">Atendimento</span>
                <strong style="color:#FAF9F6;">Segunda a Sexta</strong>
              </div>
              <div class="hero-card-meta-col">
                <span style="color:#95A3B5;">Localização</span>
                <strong style="color:#FAF9F6;">Alvorada, RS</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
`;
html = html.replace(/<!-- Hero Section -->[\s\S]*?<\/section>/, heroStructure.trim());

// 7. Update footer bottom HTML with the improved layout
const footerBottomHtml = `
    <div class="footer-bottom">
      <div class="footer-bottom-inner">
        <div class="footer-legal-block">
          <span class="compliance-badge">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Informativo Institucional &bull; OAB/RS &bull; Provimento nº 205/2021
          </span>
          <p class="footer-compliance">
            Este site tem finalidade exclusivamente institucional e informativa, em estrita observância ao Código de Ética e Disciplina da OAB e ao Provimento nº 205/2021 do Conselho Federal da OAB. Não realiza captação indevida de clientela nem constitui consulta jurídica formal.
          </p>
        </div>
        <div class="footer-copy-block">
          <p class="footer-copyright">
            &copy; <span id="ano-atual">2026</span> Rosalinda Khal &amp; João Luiz Filho Advocacia.<br>Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
`;
html = html.replace(/<div class=\"footer-bottom\">[\s\S]*?<\/div>\s*<\/div>\s*<\/footer>/, footerBottomHtml.trim() + '\n  </div>\n</footer>');

// Remove .mobile-action-bar from HTML
html = html.replace(/<!-- Barra de Ação Mobile Fixa -->[\s\S]*?<\/div>/, '');

writeFileSync('Rosalinda Khal e João Luiz Filho — Advocacia _ Alvorada, RS.html', html);
writeFileSync('index.html', html);
console.log('Successfully updated HTML files with refined footer disposition and monogram!');
