/**
 * Console tab for debugging panel.
 * @class The debug console tab class
 * @param {object} [params] parameters that can be set as initialized options
 * on the performance tab
 * @config {string} [name] the name of the tab will be used for name of link
 * @config {string} [icon] the icon url to use as image for the tab, should be 
 * 45x90 with off state on top (45x45) and on state on bottom (45x45)
 * @config {string} [id] the machine readable id for the tab
 * @author PFP
 * @copyright 2011 Paranoid Ferret Productions
 */

pulse.debug.ConsoleTab = pulse.debug.PanelTab.extend(
/** @lends pulse.debug.ConsoleTab.prototype */
{
  /** @constructs */
  init : function(params) {
    this._super(params);

    var self = this;

    /**
     * The filter toolbar for this console tab.
     * @type {DOMElement}
     */
    this.toolbar = document.createElement('div');
    this.toolbar.className = 'debug-console-toolbar';
    this.container.appendChild(this.toolbar);

    this.allButton = this.addFilterButton('All', 'none');
    this.allButton.className = 'selected';
    this.errorsButton = this.addFilterButton('Errors', 'error');
    this.warningsButton = this.addFilterButton('Warnings', 'warning');
    this.infoButton = this.addFilterButton('Info', 'debug');

    /**
     * The logger for this console tab.
     * @type {pulse.debug.Logger}
     */
    this.logger = new pulse.debug.Logger();
    this.container.appendChild(this.logger.container);

    this._private.currentFilterLink = this.allButton;
  },

  addFilterButton : function(name, type) {
    var _self = this;
    var button = document.createElement('a');
    button.onclick = function() {
      if(_self._private.currentFilterLink) {
        _self._private.currentFilterLink.className = '';
      }
      _self._private.currentFilterLink = this;
      this.className = 'selected';
      if(type == 'none') {
        _self.clearFilter();
      } else {
        _self.filterLogs(type);
      }
      return false;
    };
    button.id = 'filter-' + type;
    button.href = '#';
    button.innerHTML = name;
    this.toolbar.appendChild(button);
    return button;
  },

  /**
   * Adds log entry to the console.
   * @param {string} text the message text for the log entry
   * @param {string} type the type of the message
   */
  logMessage : function(text, type) {
    this.logger.addMessage(text, type);
  },

  filterLogs : function(type) {
    this.logger.filterType(type);
  },

  clearFilter : function() {
    this.logger.clearFilter();
  }
});