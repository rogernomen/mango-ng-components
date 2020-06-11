import { Injectable } from '@angular/core';

declare let ga: Function;

@Injectable({
  providedIn: 'root'
})
export class NgsGaService {


  //Import in HTML
  /*
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  //fix error global variable for intl library
  var global = global || window;
  //--
</script>
  */
  constructor() { }

  create(UA_ID: string) {
    ga('create', UA_ID, 'auto');
  }

  page(page: string) {
    ga('set', 'page', page);
    ga('send', 'pageview');
  }

  event(eventCategory: string, eventAction: string, eventLabel?: string, eventValue?: number) {
    ga('send', 'event', eventCategory, eventAction, eventLabel, eventValue);
  }
}
