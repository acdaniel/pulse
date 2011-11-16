/**
 * Debug manager handles logging and mark elapsed time for events. There should
 * only ever be one debug mananger.
 * @class The debug manager class
 * @author PFP
 * @copyright 2011 Paranoid Ferret Productions
 */

pulse.debug.DebugManager = PClass.extend(
/** @lends pulse.debug.DebugManager.prototype */
{
  /** @constructs */
  init : function () {

    /**
     * Associative array (object) of timers.
     * @type {array}
     */
    this.timers = {};

    /**
     * Associative array (object) of counters.
     * @type {array}
     */
    this.counters = {};

    /**
     * Frames per second associated with this manager.
     * @type {number}
     */
    this.fps = 0;

    /** 
     * @private
     * Private properties of the node. Should not need or use these.
     * @type {object}
     */
    this._private = { };

    /**
     * @private
     * The fps calculator for this manager.
     * @type {pulse.debug.FPS}
     */
    this._private.fpsTimer = new pulse.debug.FPS();
    this._private.fpsTimer.start();

    /**
     * @private
     * The udpate timer for this manager.
     * @type {pulse.debug.Timer}
     */
    this._private.updateTimer = new pulse.debug.Timer();

    /**
     * @private
     * The draw timer for this manager.
     * @type {pulse.debug.Timer}
     */
    this._private.drawTimer = new pulse.debug.Timer();

    /**
     * @private
     * The draw counter for this manager.
     * @type {pulse.debug.Counter}
     */
    this._private.drawCounter = new pulse.debug.Counter();


    /**
     * @private
     * The node counter for this manager.
     * @type {pulse.debug.Counter}
     */
    this._private.nodeCounter = new pulse.debug.Counter();

    /**
     * The debug panel for this manager.
     * @type {pulse.debug.Panel}
     */
    this.panel = null;

    // Setup the debug panel
    this.setupPanel();
  },

  logWarning : function() {
    
  },

  logDebug : function() {
    
  },

  logError : function() {
    
  },

  /**
   * Records a debugging event time. 
   * @param {string} timer the timer name to mark the event on
   */ 
  markTime : function(timer) {
    if(!this.timers[timer]) {
      this.timers[timer] = new pulse.debug.DebugTimer({name : timer});
      this.timers[timer].start();
    } else {
      this.timers[timer].mark();
    }
  },

  /**
   * Records a FPS update.
   */
  markFPS : function() {
    this._private.fpsTimer.mark();
    this.fps = this._private.fpsTimer.fps;
  },

  /**
   * Starts the update timer.
   */
  startUpdate : function() {
    this._private.updateTimer.start();
  },

  /**
   * Marks the update timer time.
   */
  stopUpdate : function() {
    this._private.updateTimer.mark();
  },

  /**
   * Starts the draw timer.
   */
  startDraw : function() {
    this._private.drawTimer.start();
  },

  /**
   * Marks the draw timer time.
   */
  stopDraw : function() {
    this._private.drawTimer.mark();
  },

  /**
   * Resets the draw counter.
   */
  resetDraws : function() {
    this._private.drawCounter.reset();
  },

  /**
   * Increment the number of draws.
   */
  incrementDraws : function() {
    this._private.drawCounter.increment();
  },

  /**
   * Resets the nodes counter.
   */
  resetNodes : function() {
    this._private.nodeCounter.reset();
  },

  /**
   * Increment the number of nodes.
   */
  incrementNodes : function() {
    this._private.nodeCounter.increment();
  },

  /**
   * Decrement the number of nodes.
   */
  decrementNodes : function() {
    this._private.nodeCounter.decrement();
  },

  /**
   * Sets up the debugging visual panel.
   */ 
  setupPanel : function() {
    this.panel = new pulse.debug.Panel({
      fpsTimer : this._private.fpsTimer,
      updateTimer : this._private.updateTimer,
      drawTimer : this._private.drawTimer,
      drawCounter : this._private.drawCounter,
      nodeCounter : this._private.nodeCounter
    });
  },

  /**
   * Update function called on each loop in the engine
   * @param {number} elapsed the elapsed time since last call in 
   * milliseconds
   */
  update : function(elapsed) {
    this.panel.update(elapsed);
  }
  
});