function scrollToTop({ behavior = 'smooth' }: { behavior?: ScrollBehavior } = {}) {
  window.scrollTo({
    top: 0,
    behavior,
  });
}

export default scrollToTop;
