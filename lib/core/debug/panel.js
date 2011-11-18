/**
 * Panel for containing and dislpaying debug information from the engine.
 * @class The debug panel class
 * @author PFP
 * @copyright 2011 Paranoid Ferret Productions
 */

pulse.debug.Panel = PClass.extend(
/** @lends pulse.debug.Panel.prototype */
{
  /** @constructs */
  init : function (params) {
    params = pulse.util.checkParams(params, {
      container : document.getElementsByTagName('body')[0],
      useDefault : true,
      fpsTimer : null,
      updateTimer : null,
      drawTimer : null,
      drawCounter : null,
      nodeCounter : null
    });

    var _self = this;

    // insert debug css
    // var head = document.getElementsByTagName("head")[0];         
    // var css = document.createElement('link');
    // css.type = 'text/css';
    // css.rel = 'stylesheet';
    // // Add the css directly
    // css.href = '../../lib/core/debug/debugpanel.css';
    // css.media = 'screen';
    // head.appendChild(css);
    
    /**
     * Panel container element.
     * @type {DOMElement}
     */
    this.panel = document.createElement('div');
    this.panel.id = 'pulse-debug-panel';
    params.container.appendChild(this.panel);

    /**
     * Panel top bar, holds title and minimize button.
     * @type {DOMElement}
     */
    this.topbar = document.createElement('div');
    this.topbar.className = 'debug-topbar';
    this.panel.appendChild(this.topbar);

    this.topbar.onmousedown = function(e) {
      var ec = {x : e.pageX, y : e.pageY};
      var mm = function(e){
        var d = {x : e.pageX - ec.x, y : e.pageY - ec.y};
        var top = parseInt(_self.panel.offsetTop);
        var left = parseInt(_self.panel.offsetLeft);
        _self.panel.style.left = (left + d.x) + "px";
        _self.panel.style.top = (top + d.y) + "px";
        ec = {x : e.pageX, y : e.pageY};
      };
      window.addEventListener('mousemove', mm, false);
      window.addEventListener('mouseup', function(){
        this.removeEventListener('mousemove', mm, false);
        this.removeEventListener('mouseup', arguments.callee, false);
      }, false);
    };

    var span = document.createElement('span');
    span.innerHTML = 'Pulse Debug';
    this.topbar.appendChild(span);

    /**
     * Panel tab bar, control holder for switching debugging tabs.
     * @type {DOMElement}
     */
    this.tabbar = document.createElement('div');
    this.tabbar.className = 'debug-tabbar';
    this.panel.appendChild(this.tabbar);

    /**
     * Panel tab holder, will contain all custom panels.
     * @type {DOMElement}
     */
    this.tabholder = document.createElement('div');
    this.tabholder.className = 'debug-tabholder';
    this.panel.appendChild(this.tabholder);

    /**
     * Panel status bar, holds a few stats for the debug panel.
     * @type {DOMElement}
     */
    this.statusbar = document.createElement('div');
    this.statusbar.className = 'debug-statusbar';
    this.panel.appendChild(this.statusbar);

    /**
     * Number of nodes in the current scene.
     * @type {DOMElement}
     */
    this.statusNodes = document.createElement('span');
    this.statusbar.appendChild(this.statusNodes);

    /**
     * Number of draws per frame status text.
     * @type {DOMElement}
     */
    this.statusDraws = document.createElement('span');
    this.statusbar.appendChild(this.statusDraws);

    /**
     * Frame per second status text.
     * @type {DOMElement}
     */
    this.statusFPS = document.createElement('span');
    this.statusbar.appendChild(this.statusFPS);

    /**
     * Frame time status text.
     * @type {DOMElement}
     */
    this.statusMS = document.createElement('span');
    this.statusbar.appendChild(this.statusMS);

    /**
     * Associative array (object) of the tabs in this panel.
     * @type {object}
     */
    this.tabs = {};

    /**
     * Associative array (object) of tab bar links.
     * @type {object}
     */
    this.tabbarLinks = {};

    /**
     * FPS timer for this debug panel.
     * @type {pulse.debug.FPS}
     */
    this.fpsTimer = params.fpsTimer;

    /**
     * Draw counter for this debug panel.
     * @type {pulse.debug.Counter}
     */
    this.drawCounter = params.drawCounter;

    /**
     * Node counter for this debug panel.
     * @type {pulse.debug.Counter}
     */
    this.nodeCounter = params.nodeCounter;

    if(params.useDefault) {
      var consoleTab = new pulse.debug.ConsoleTab({
        name : 'Console',
        id : 'console'
      });
      this.addTab(consoleTab);
      var perfTab = new pulse.debug.PerformanceTab({
        name : 'Performance',
        id : 'perf',
        fpsTimer : params.fpsTimer,
        updateTimer : params.updateTimer,
        drawTimer : params.drawTimer
      });
      this.addTab(perfTab);
    }
  },

  /**
   * Adds a tab to the panel.
   * @param {pulse.debug.DebugPanelTab} tab the tab to insert
   */
  addTab : function(tab) {
    this.tabs[tab.id] = tab;
    var _self = this;
    var link = document.createElement('a');
    link.href = '#';
    link.innerHTML = tab.name;
    link.onclick = function() {
      _self.showTab(tab.id);
      return false;
    };
    if(tab.icon != '') {
      link.style.backgroundImage = 'url(' + tab.icon + ')';
    }
    link.id = 'pulse-tab-link-' + tab.id;
    link.name = tab.name;
    if(pulse.util.getLength(this.tabs) == 1) {
      link.className = 'selected';
      tab.container.className = 'debug-tab selected';
    }
    this.tabbarLinks[tab.id] = link;
    this.tabbar.appendChild(link);
    this.tabholder.appendChild(tab.container);
  },

  /**
   * Removes a tab from the panel.
   * @param {string} id the id of the tab to remove
   */
  removeTab : function(id) {
    if(this.tabs[id]) {
      this.tabholder.removeChild(this.tabs[id]);
      this.tabbar.removeChild(this.tabbarLinks[id]);
      delete this.tabs[id];
      delete this.tabbarLinks[id]; 
    }
  },

  /**
   * Shows a tab which makes it visible and brings it to the front.
   * @param {string} id the id of the tab to display
   */
  showTab : function(id) {
    for(var tid in this.tabbarLinks) {
      if(this.tabbarLinks[tid].className != '') {
        this.tabbarLinks[tid].className = '';
        this.tabs[tid].container.className = 'debug-tab';
        this.tabs[tid].hide();
      }
    } 
    if(!this.tabs[id]) {
      return;
    }
    var tab = this.tabs[id];
    var link = this.tabbarLinks[id];
    link.className = 'selected';
    tab.container.className = 'debug-tab selected';
    tab.show();
  },

  /**
   * Adds log entry to the console.
   * @param {string} text the message text for the log entry
   * @param {string} type the type of the message
   */
  logMessage : function(text, type) {
    if(this.tabs['console']) {
      this.tabs['console'].logMessage(text, type);
    }
  },

  /**
   * Update function called on each loop in the engine
   * @param {number} elapsed the elapsed time since last call in 
   * milliseconds
   */
  update : function(elapsed) {
    for(var n in this.tabs) {
      this.tabs[n].update(elapsed);
    }

    // update status bar
    if(this.fpsTimer) {
      var e = Math.round(this.fpsTimer.markCurrent * 100) / 100;
      this.statusMS.innerHTML = e + "ms";
      this.statusFPS.innerHTML = "FPS: " + this.fpsTimer.fps;
    }
    if(this.drawCounter) {
      this.statusDraws.innerHTML = "Draws: " + this.drawCounter.count;
    }
    if(this.nodeCounter) {
      this.statusNodes.innerHTML = "Nodes: " + this.nodeCounter.count;
    }
  }
});

// Static index that's incremented whenever a tab is created.
// Used for uniquely naming panel tabs if a name is not specified.
pulse.debug.Panel.tabIdx = 0;