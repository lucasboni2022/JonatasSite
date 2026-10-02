/**
 * JBA ENGENHARIA & CONSTRUTORA - JAVASCRIPT ENGINE
 * Foco em conversão para WhatsApp, calculadora dinâmica e interatividade fluida.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Constantes de Contato (Extraídas do Cartão CNPJ e Logo)
  const PHONE_DISPLAY = '(44) 98859-1769';
  const PHONE_RAW = '5544988591769';
  const CNPJ_RAW = '59.544.462/0001-12';

  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('span') || mobileToggle;
      icon.innerHTML = navMenu.classList.contains('active') ? '&times;' : '&#9776;';
    });

    // Fechar menu ao clicar em links
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.innerHTML = '&#9776;';
      });
    });
  }

  // 2. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Fecha outros itens
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 3. Filtro de Portfólio
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 4. Calculadora / Simulador de Orçamento para WhatsApp
  const calcTipo = document.getElementById('calcTipo');
  const calcArea = document.getElementById('calcArea');
  const calcFase = document.getElementById('calcFase');
  const calcBtn = document.getElementById('calcWhatsappBtn');
  const calcDescResult = document.getElementById('calcDescResult');
  const calcSubResult = document.getElementById('calcSubResult');

  function updateCalcSummary() {
    if (!calcTipo || !calcArea || !calcFase) return;

    const tipoText = calcTipo.options[calcTipo.selectedIndex]?.text || 'Projeto';
    const areaText = calcArea.options[calcArea.selectedIndex]?.text || '';
    const faseText = calcFase.options[calcFase.selectedIndex]?.text || '';

    if (calcDescResult) {
      calcDescResult.textContent = `${tipoText} • ${areaText}`;
    }
    if (calcSubResult) {
      calcSubResult.textContent = `Status: ${faseText}. Estimativa prévia e assessoria técnica sem compromisso.`;
    }
  }

  if (calcTipo && calcArea && calcFase) {
    calcTipo.addEventListener('change', updateCalcSummary);
    calcArea.addEventListener('change', updateCalcSummary);
    calcFase.addEventListener('change', updateCalcSummary);
    updateCalcSummary();
  }

  if (calcBtn) {
    calcBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const tipo = calcTipo ? calcTipo.value : 'Construção Geral';
      const area = calcArea ? calcArea.value : 'Não informado';
      const fase = calcFase ? calcFase.value : 'Ideia inicial';

      const message = `Olá, Engenheiro Jonatas! 👋\n\nEstive no site da *JBA Engenharia* e fiz uma simulação de projeto:\n` +
        `🏗️ *Tipo de Obra:* ${tipo}\n` +
        `📐 *Metragem aproximada:* ${area}\n` +
        `📌 *Fase atual:* ${fase}\n\n` +
        `Gostaria de saber mais detalhes e receber uma estimativa/proposta personalizada. Como podemos prosseguir?`;

      const encodedMsg = encodeURIComponent(message);
      window.open(`https://wa.me/${PHONE_RAW}?text=${encodedMsg}`, '_blank');
    });
  }

  // 5. Botões de Serviços rápidos para WhatsApp
  const serviceCtaBtns = document.querySelectorAll('.service-cta-btn');
  serviceCtaBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service') || 'Serviço de Engenharia';
      const message = `Olá, Engenheiro Jonatas! 👋\n\nVi no site o serviço de *${serviceName}* e gostaria de solicitar um orçamento e tirar algumas dúvidas. Pode me atender?`;
      const encodedMsg = encodeURIComponent(message);
      window.open(`https://wa.me/${PHONE_RAW}?text=${encodedMsg}`, '_blank');
    });
  });



  // 7. Botão Copiar CNPJ
  const copyCnpjBtn = document.getElementById('copyCnpjBtn');
  if (copyCnpjBtn) {
    copyCnpjBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(CNPJ_RAW).then(() => {
        showToast('✓ CNPJ copiado para a área de transferência!');
      }).catch(() => {
        showToast(`CNPJ: ${CNPJ_RAW}`);
      });
    });
  }

  // 8. Toast Helper
  function showToast(text) {
    let toast = document.getElementById('toastNotice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // 9. Contador Numérico Suave para Métricas (Scroll Spy)
  let counted = false;
  const metricsSection = document.querySelector('.metrics-section');
  if (metricsSection) {
    const handleScroll = () => {
      const rect = metricsSection.getBoundingClientRect();
      if (!counted && rect.top <= window.innerHeight * 0.85) {
        counted = true;
        document.querySelectorAll('.metric-number').forEach(el => {
          const target = parseInt(el.getAttribute('data-target') || '0', 10);
          const suffix = el.getAttribute('data-suffix') || '';
          if (target > 0) {
            let current = 0;
            const step = Math.ceil(target / 40);
            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              el.textContent = current + suffix;
            }, 30);
          }
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger inicial caso já esteja no viewport
  }
});
