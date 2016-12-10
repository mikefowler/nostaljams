export default function removeLoginHash() {
  window.history.pushState(
    '',
    document.title,
    window.location.pathname + window.location.search,
  );
}
