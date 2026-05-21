document.addEventListener('DOMContentLoaded', function() {
  /* ===== FAQ Accordion ===== */
  function faqOpen(item) {
    const answer = item.querySelector('.faq-answer');
    item.classList.add('open');
    answer.style.maxHeight = answer.scrollHeight + 'px';
    item.querySelector('.faq-question').setAttribute('aria-expanded', 'true');
  }

  function faqClose(item) {
    const answer = item.querySelector('.faq-answer');
    item.classList.remove('open');
    answer.style.maxHeight = '0';
    item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
  }

  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      if (item.classList.contains('open')) {
        faqClose(item);
      } else {
        faqOpen(item);
      }
    });
  });

  const expandAll = document.getElementById('faqExpandAll');
  const collapseAll = document.getElementById('faqCollapseAll');
  if (expandAll) {
    expandAll.addEventListener('click', () => {
      document.querySelectorAll('.faq-item').forEach(item => faqOpen(item));
    });
  }
  if (collapseAll) {
    collapseAll.addEventListener('click', () => {
      document.querySelectorAll('.faq-item').forEach(item => faqClose(item));
    });
  }

  /* No auto-open, hidden by default */
});
