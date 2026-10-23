const paths={
  compass:'<circle cx="12" cy="12" r="9"/><path d="m16 8-2.5 5.5L8 16l2.5-5.5L16 8Z"/>',
  grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  terminal:'<rect x="2" y="4" width="20" height="16" rx="3"/><path d="m6 9 3 3-3 3m6 0h5"/>',
  book:'<path d="M12 5v16M3 3c4-1 6 0 9 2 3-2 5-3 9-2v15c-4-1-6 0-9 3-3-3-5-4-9-3V3Z"/>',
  code:'<path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18"/>',
  cursor:'<path d="m5 3 14 10-7 1-3 7L5 3Z"/>',
  sparkle:'<path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z"/>',
  chat:'<path d="M21 12a9 9 0 0 1-9 9c-2 0-4-.5-5.5-1.5L3 21l1.5-3.5A9 9 0 1 1 21 12Z"/><path d="M8 9h8m-8 5h5"/>',
  layers:'<path d="m12 3 10 6-10 6L2 9l10-6Zm-9 11 9 5 9-5M3 18l9 5 9-5"/>',
  monitor:'<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 22h8m-4-5v5"/>',
  search:'<circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/>',
  document:'<path d="M14 2H5v20h14V7l-5-5Zm0 0v6h5M8 12h8m-8 4h8"/>',
  plug:'<path d="M8 2v5m8-5v5M5 7h14v3a7 7 0 0 1-14 0V7Zm7 10v5"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  rocket:'<path d="M14 3c3-1 5-1 7 0 1 2 1 4 0 7l-8 8-7-7 8-8ZM6 11l-3 1-1 6 6-2m5 2-1 4 6-1 1-6M5 19l-3 3"/><circle cx="16" cy="8" r="2"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  download:'<path d="M12 2v13m-5-5 5 5 5-5M3 16v6h18v-6"/>',
  shield:'<path d="m12 2 9 4v6c0 5-5 8-9 10-4-2-9-5-9-10V6l9-4Z"/><path d="m8 12 3 3 5-6"/>',
  cloud:'<path d="M6 19a5 5 0 0 1-1-10 7 7 0 0 1 13-2 6 6 0 0 1 0 12H6Z"/>',
  branch:'<circle cx="6" cy="4" r="2"/><circle cx="18" cy="4" r="2"/><circle cx="6" cy="20" r="2"/><path d="M6 6v12m12-12v2c0 5-12 3-12 8"/>',
  chart:'<path d="M3 3v18h18M7 17v-5m5 5V7m5 10V4"/>',
  palette:'<path d="M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1-4c-1-1 0-3 2-3h3a3 3 0 0 0 2-3 9 9 0 0 0-9-8Z"/><path d="M7 9h.01M10 6h.01M15 6h.01M18 9h.01"/>',
  audio:'<path d="M3 10v4m4-9v14m5-17v20m5-16v12m4-8v4"/>',
  globe:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
  briefcase:'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M8 7V3h8v4M2 12a22 22 0 0 0 20 0m-10-1v5"/>',
  people:'<circle cx="9" cy="7" r="4"/><path d="M2 22v-3a7 7 0 0 1 14 0v3M17 3a4 4 0 0 1 0 8m1 4a6 6 0 0 1 4 6"/>',
  map:'<path d="m2 5 7-3 6 3 7-3v17l-7 3-6-3-7 3V5Zm7-3v17m6-14v17"/>',
  copy:'<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V3H3v13h5"/>'
};
export function icon(name,className='icon'){
  if(!paths[name])throw new Error('Unknown landing icon: '+name);
  return `<svg class="${className}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name]}</svg>`;
}
export const familyIcons={
  'Research & Discovery':'search','Document Intelligence':'document','Product & Strategy':'target',
  'Engineering & Integration':'code','Design & Creation':'palette','Agentic Automation':'branch',
  'Data & Evaluation':'chart','Business & Operations':'briefcase','Voice & Media':'audio',
  'Marketing & Go-to-Market':'globe','Professional Enablement':'people','Spatial & Field Intelligence':'map'
};
