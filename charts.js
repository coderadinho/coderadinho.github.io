/* Shared chart loader. JSON and datasets remain inspectable local files. */
window.chartResults = [];
window.chartViews = {};
async function mountChart(element) {
  const source = element.dataset.spec;
  try {
    const response = await fetch(source);
    if (!response.ok) throw new Error(`Chart file returned ${response.status}`);
    const spec = await response.json();
    // Adapt the original Week 1 examples to the available screen width.
    if (element.dataset.responsive === 'true') {
      spec.width = 'container';
      spec.autosize = {type: 'fit', contains: 'padding'};
    }
    const result = await vegaEmbed(element, spec, {renderer: 'svg', actions: false});
    window.chartViews[element.id] = result.view;
    window.chartResults.push({id: element.id, source, rendered: true});
  } catch (error) {
    console.error(source, error);
    element.classList.add('chart-error');
    element.textContent = 'Chart unavailable. Open the JSON or source link to inspect the data.';
    window.chartResults.push({id: element.id, source, rendered: false, error: String(error)});
  }
}
window.chartsReady = Promise.all([...document.querySelectorAll('[data-spec]')].map(mountChart));
