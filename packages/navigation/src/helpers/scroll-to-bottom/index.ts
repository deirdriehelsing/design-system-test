function scrollToBottom({ behavior = 'smooth' }: { behavior?: ScrollBehavior } = {}) {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior,
  });
}

export default scrollToBottom;
