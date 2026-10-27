(()=>{
  // Track the public landing page only, never local Workrooms or previews.
  if(location.hostname!=='powerchords.lazo.tools'||location.protocol!=='https:')return;
  if(document.getElementById('pc-ga-tag'))return;

  const measurementId='G-B3WTD82CQ0';
  window.dataLayer=window.dataLayer||[];
  window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
  window.gtag('js',new Date());
  window.gtag('config',measurementId);

  const tag=document.createElement('script');
  tag.id='pc-ga-tag';
  tag.async=true;
  tag.src='https://www.googletagmanager.com/gtag/js?id='+measurementId;
  document.head.appendChild(tag);
})();
