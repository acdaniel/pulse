/**
 * Base panel tab for the debugging panel. This should be extended when 
 * creating a custom debugging tab.
 * @class The debug panel class
 * @author PFP
 * @copyright 2011 Paranoid Ferret Productions
 */

pulse.debug.PanelTab = PClass.extend(
/** @lends pulse.debug.PanelTab.prototype */
{
  /** @constructs */
  init : function (params) {
    params = pulse.util.checkParams(params, {
      name : 'Tab' + pulse.debug.Panel.tabIdx++,
      icon : '',
      id : 'Tab' + (pulse.debug.Panel.tabIdx - 1)
    });

    /**
     * The name of the timer.
     * @type {string}
     */
    this.name = params.name;

    /**
     * Icon to use for the tab.
     * @type {string}
     */
    this.icon = params.icon;

    /**
     * Id for this tab, must be machine readable (no spaces).
     * @type {string}
     */
    this.id = params.id;

    /**
     * Tab container div, holds the tab information.
     * @type {DOMElement}
     */
    this.container = document.createElement('div');
    this.container.className = 'debug-tab';

    /**
     * Whether the tab is currently visible or not.
     * @type {boolean}
     */
    this.visible = false;
  },

  /**
   * Called when this tab is shown.
   */
  show : function () {
    this.visible = true;
  },

  /**
   * Called when this tab is hidden.
   */
  hide : function() {
    this.visible = false;
  },

  /**
   * Update function called on each loop in the engine
   * @param {number} elapsed the elapsed time since last call in 
   * milliseconds
   */
  update : function(elapsed) {
    // Nothing is updated by default
  }
});