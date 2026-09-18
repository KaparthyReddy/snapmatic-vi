function hasLeafText(root: HTMLElement, text: string): boolean {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
  let node = walker.currentNode as HTMLElement | null;
  while (node) {
    if (node.children.length === 0 && node.textContent?.trim() === text) {
      return true;
    }
    node = walker.nextNode() as HTMLElement | null;
  }
  return false;
}

export function isDrawPanelOpen(root: HTMLElement): boolean {
  return hasLeafText(root, 'Draw') && hasLeafText(root, 'Reset');
}