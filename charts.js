window.chartResults = [];
window.chartViews = {};
function palette() {
  const css = getComputedStyle(document.documentElement);
  const value = name => css.getPropertyValue(name).trim();
  return {ink:value('--ink'), muted:value('--muted'), grid:value('--grid'),
    colors:[1,2,3,4].map(i=>value('--point'+i))};
}
async function mountChart(element) {
  const source = element.dataset.spec;
  try {
    const response = await fetch(source + (source.includes('?') ? '&' : '?') + 'v=20261016-release');
    if (!response.ok) throw new Error(`Chart file returned ${response.status}`);
    const spec = await response.json();
    const theme = palette();
    if (element.dataset.preserveStyle !== 'true') {
      spec.background = 'transparent';
      if (element.dataset.responsive === 'true') {
        spec.width = 'container'; spec.autosize = {type:'fit',contains:'padding'};
      }
      spec.config = {...spec.config, title:{...spec.config?.title,color:theme.ink,subtitleColor:theme.muted},
        axis:{...spec.config?.axis,labelColor:theme.muted,titleColor:theme.ink,
          gridColor:theme.grid,domainColor:theme.grid,tickColor:theme.grid},
        legend:{...spec.config?.legend,labelColor:theme.muted,titleColor:theme.ink},
        range:{category:theme.colors}};
      if (spec.encoding?.color?.type === 'nominal' && spec.encoding?.color?.scale?.range) spec.encoding.color.scale.range = theme.colors;
      if (element.id.startsWith('cc6-')) {
        const areas = ['newport','cardiff','monmouthshire','wrexham','flintshire','torfaen'];
        const colors = document.documentElement.dataset.mode === 'light'
          ? ['#9f563a','#8a6a16','#526044','#895b8a','#43676b','#a25768']
          : ['#db8449','#d3a243','#b6c999','#c4a3bf','#80aba9','#e4ab9b'];
        if (element.id === 'cc6-comparison') {
          for (const layer of spec.layer ?? []) {
            if (layer.encoding?.color?.scale) layer.encoding.color.scale.range = colors;
          }
        } else {
          const color = colors[areas.indexOf(element.id.slice(4))] ?? theme.colors[0];
          spec.mark.color = color;
          spec.mark.point.color = color;
          element.closest('.wales-series')?.style.setProperty('--series-color',color);
        }
      }
      if (element.id.startsWith('cc7-')) {
        for (const layer of spec.layer ?? []) {
          if (layer.mark?.type === 'text') layer.mark.color = theme.ink;
        }
      }
      if (element.id === 'cc4-improved') {
        for (const layer of spec.layer ?? []) {
          if (layer.encoding?.color?.scale?.range) layer.encoding.color.scale.range = [theme.colors[1], theme.colors[0]];
        }
      }
      if (element.dataset.spec.includes('metr')) {
        spec.encoding.y.axis = {values:[0.01,0.1,1,10,60,240,960],grid:true,labelExpr:"datum.value < 1 ? format(datum.value * 60, '.1f') + ' sec' : datum.value < 60 ? format(datum.value, '.0f') + ' min' : format(datum.value / 60, '.0f') + ' hr'"};
        spec.encoding.y.title = 'Task length for a human (log scale)';
      }
    }
    const result = await vegaEmbed(element, spec, {renderer:'svg',actions:false});
    window.chartViews[element.id] = result.view;
    window.chartResults.push({id:element.id,source,rendered:true});
  } catch(error) {
    console.error(source,error); element.classList.add('chart-error');
    element.textContent = 'Chart unavailable. Open the JSON or source link to inspect the data.';
    window.chartResults.push({id:element.id,source,rendered:false,error:String(error)});
  }
}
async function renderAll() {
  for (const view of Object.values(window.chartViews)) view.finalize();
  window.chartViews = {}; window.chartResults = [];
  // CC6: one embedding call inside a loop, shared by the six dashboard charts.
  const pending = [];
  for (const element of document.querySelectorAll('[data-spec]')) {
    pending.push(mountChart(element));
  }
  await Promise.all(pending);
}
window.chartsReady = renderAll();
document.addEventListener('appearancechange', event => {
  if(['palette','mode'].includes(event.detail.kind)) window.chartsReady = window.chartsReady.then(renderAll);
});
