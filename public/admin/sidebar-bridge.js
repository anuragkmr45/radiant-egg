(function () {
  const ITEM_ID = "contact-submissions";
  const ITEM_HREF = "/admin/submissions";
  const BRIDGE_ATTR = "data-admin-bridge";

  let ensureQueued = false;

  function createIconWrapper() {
    const span = document.createElement("span");
    span.className = "e1jeq5dr0 css-5nxuzj-IconWrapper e1jeq5dr1";
    span.setAttribute("aria-hidden", "true");
    span.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 4.5h14A1.5 1.5 0 0 1 20.5 6v12a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 18V6A1.5 1.5 0 0 1 5 4.5Zm2 3a1 1 0 1 0 0 2h10a1 1 0 1 0 0-2H7Zm0 4a1 1 0 1 0 0 2h10a1 1 0 1 0 0-2H7Zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H7Z"></path></svg>';
    return span;
  }

  function buildAnchor(referenceLink) {
    const anchor = referenceLink.cloneNode(false);
    anchor.className = referenceLink.className;
    anchor.dataset.testid = ITEM_ID;
    anchor.setAttribute(BRIDGE_ATTR, ITEM_ID);
    anchor.href = ITEM_HREF;
    anchor.rel = "noopener";
    anchor.target = "_top";
    anchor.innerHTML = "";
    anchor.appendChild(createIconWrapper());
    anchor.appendChild(document.createTextNode("Contact Submissions"));
    anchor.addEventListener("click", (event) => {
      event.preventDefault();
      window.top.location.assign(ITEM_HREF);
    });
    return anchor;
  }

  function ensureSidebarItem() {
    const pagesLink = document.querySelector('a[data-testid="pages"]');
    const pagesItem = pagesLink?.closest("li");
    const list = pagesItem?.parentElement;

    if (!pagesLink || !pagesItem || !list) {
      return;
    }

    const existingItem = list.querySelector(`[${BRIDGE_ATTR}="${ITEM_ID}"]`)?.closest("li");

    if (existingItem) {
      const existingLink = existingItem.querySelector("a");
      if (existingLink) {
        existingLink.className = pagesLink.className;
        existingLink.href = ITEM_HREF;
        existingLink.target = "_top";
      }
      return;
    }

    const listItem = pagesItem.cloneNode(false);
    listItem.appendChild(buildAnchor(pagesLink));

    if (pagesItem.nextSibling) {
      list.insertBefore(listItem, pagesItem.nextSibling);
      return;
    }

    list.appendChild(listItem);
  }

  function queueEnsure() {
    if (ensureQueued) {
      return;
    }

    ensureQueued = true;
    window.requestAnimationFrame(() => {
      ensureQueued = false;
      ensureSidebarItem();
    });
  }

  function startBridge() {
    queueEnsure();

    const observer = new MutationObserver(() => {
      queueEnsure();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    window.addEventListener("hashchange", queueEnsure);
    window.addEventListener("focus", queueEnsure);
    window.setInterval(queueEnsure, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startBridge, { once: true });
  } else {
    startBridge();
  }
})();
